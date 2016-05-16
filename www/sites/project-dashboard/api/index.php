<?php
/**
 * Router for "Project Dashboard" project management RESTful web service
 *
 * This file defines and hangles all of the routes available for consumption via authorized web clients
 *
 * @author Randy Dustin <randydustin@gmail.com>
 * @version 1.0
 */

header( 'Access-Control-Allow-Origin: https://project-dashboard.dev' );
header( 'Access-Control-Allow-Headers: origin, x-requested-with, Content-Type' );
header( 'Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS' );

require 'vendor/autoload.php';
require 'vendor/league/flysystem/src/Filesystem.php';
require 'vendor/Redbean/rb.php';
require 'vendor/erusev/parsedown/Parsedown.php';
require 'includes/ResourceNotFoundException.php';
require 'includes/UserExistsException.php';
require 'models/User.php';
require 'models/Project.php';
require 'models/Discussion.php';
require 'models/Comment.php';
require 'models/File.php';
require 'includes/Authorization.php';
require 'includes/PasswordGenerator.php';

use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as Adapter;

\Slim\Slim::registerAutoLoader();
//db setup
require '/var/www/api-config/db.php';
$userModel = new UserModel();
$projectModel = new ProjectModel();
$discussionModel = new DiscussionModel();
$commentModel = new CommentModel();
$fileModel = new FileModel();
$flysystem = new Filesystem( new Adapter( '/var/www/pd-attachments' ));

$app = new \Slim\Slim(
    array(
        'debug' => false,
    )
);

/*
 * set authorization class as middleware to check for authorization on routes
 */
$app->add( new \Authorization( $userModel, array( 'login', 'logout', 'filedownload' ) ) );

/*
 * GET route for all users
 * A valid Authorization header must be passed from the calling application
 * outputs json object of all users or header response of 400 Bad Request
 */
$app->get( '/users', function () use ( $app, $userModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $allUsers = $userModel->getAllUsers( $user->role, $user->id );
        if( !empty( $allUsers ) ) {
            foreach( $allUsers as $key => $value ) {
                if( $value['id'] == $user->id ) {
                    $allUsers[$key]['isLoggedIn'] = true;
                } else {
                    $allUsers[$key]['isLoggedIn'] = false;
                }
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $allUsers );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * GET route for a single user
 * A valid Authorization header must be passed from the calling application
 * outputs json object of requested user along with any projects, discussions, comments, and files associated with them
 * may return header response of 400 Bad Request or 404 not found if the requested user doesn't exist in the system
 */
$app->get( '/users/:id', function ( $id ) use ( $app, $userModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $currentUser = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $user = $userModel->getUser( $id, $currentUser->id );
        if( empty( $user['sharedProject'] ) ) {
            $user['sharedProject'] = array();
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $user );
    } catch ( ResourceNotFoundException $e ) {
        $app->response()->status( 404 );
    } catch (Exception $e) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for adding a user
 * A valid Authorization header must be passed from the calling application
 * generates password for user, saves user to database and send email to user with password
 * outputs json object with user's id or may return header response of 409 Conflict if user already exists or 400 Bad Request for other errors
 */
$app->post( '/users', function () use ( $app, $userModel ) {
    try {
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $request->params('data') );
        $password = PasswordGenerator::getAlphaNumericPassword(12);
        $addResult = $userModel->addUser( $input, $password );
        $id = $addResult['id'];
        if( !empty( $input->projectIds ) ) {
            $projectIds = (array)$input->projectIds;
            foreach( $projectIds as $projectId ) {
                $userModel->setProject( $id, $projectId );
            }
        }
        $headers = "From: nobody@project-dashboard.dev" . PHP_EOL;
        $headers .= "MIME-Version: 1.0" . PHP_EOL;
        $headers .= "Content-Type: text/html; charset=ISO-8859-1" . PHP_EOL;
        $message = '<html><body>';
        $message .= "<p>Your initial password is: " . $password . ". Please sign in at: <a href='https://project-dashboard.dev'>project-dashboard.dev</a></p>";
        $message .= '</body></html>';
        mail( $addResult['email'], "Your account has been created for the Project Dashboard!",
        $message, $headers ); //NOTE: this will get replaced with 3rd party api in future

        file_put_contents('/var/www/html/project-dashboard/users.txt', $message);
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $id ) );
    } catch ( UserExistsException $e ) {
        $app->response()->status( 409 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * PUT route for updating a user
 * A valid Authorization header must be passed from the calling application
 * updates user details including which projects the user has access to
 * outputs json object of user's id or may return header response of 400 Bad Request for errors
 */
$app->put( '/users/:id', function( $id ) use ( $app, $userModel ) {
    try {
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        $user = $userModel->updateUser( $input->id, $input );
        if( !empty( $input->projectIds ) ) {
            $projectIds = (array)$input->projectIds;
            foreach( $projectIds as $projectId ) {
                $userModel->setProject( $user->id, $projectId );
            }
            if(strtolower($user->role) != 'administrator') {
                foreach( $user->sharedProject as $currentProject) {
                    if( !in_array( $currentProject->id, $projectIds ) ) {
                        $userModel->removeProject( $user->id, $currentProject->id );
                    }
                }
            }
        } else {
            if(strtolower($user->role) != 'administrator') {
                $user = $userModel->getUser( $input->id );
                if( !empty ( $user['sharedProject'] ) ) {
                    foreach( $user['sharedProject'] as $currentProject) {
                        $userModel->removeProject( $user['id'], $currentProject['id'] );
                    }
                }
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $user['id'] ) );
    } catch (Exception $e) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * PUT route for updating a user's profile
 * A valid Authorization header must be passed from the calling application
 * updates user details including the user's password
 * outputs json object of user's id or may return header response of 400 Bad Request for errors
 */
$app->put( '/users/profile/:id', function( $id ) use ( $app, $userModel ) {
    try {
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        $user = $userModel->updateUser( $input->id, $input );
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $user['id'] ) );
    } catch (Exception $e) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for authentication
 * validates the user's username and password
 * outputs json object of user's id, name, role, and api key
 * may return header response of 401 Unauthorized if creditials are wrong or 400 Bad Request for errors
 */
$app->post( '/login', function () use ( $app, $userModel ) {
    try {
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        $user = $userModel->checkLogin( $input->password, $input->email );
        if( $user ) {
            echo json_encode( array( 'status'=>true, 'message'=>"login successful!", 'id'=>$user['id'], 'api_key'=>$user['api_key'], 'role'=>$user['role'], 'first_name'=>$user['first_name'], 'last_name'=>$user['last_name'] ) );
        } else {
            $app->response()->status( 401 );
            echo json_encode( array( 'status'=>false, 'message' => "invalid login credentials", 'auth' => "NOK" ) );
        }
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for logging out
 * A valid Authorization header must be passed from the calling application
 * removes the api key from the user's account
 * outputs json object of logout message or may return header response of 400 Bad Request for errors
 */
$app->post( '/logout', function () use ( $app, $userModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        if( $user ) {
            $userModel->invalidateApiKey( $user->id );
            $app->response()->header( 'Content-Type', 'application/json' );
            echo json_encode( array( 'status' =>  "You have been logged out successfully!" ) );
        }
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
});

/*
 * GET route for getting all active projects the calling user has access to
 * A valid Authorization header must be passed from the calling application
 * gets project id, name, status, and modified date
 * outputs json object of projects or may return header response of 400 Bad Request for errors
 */
$app->get( '/projects', function() use ( $app, $projectModel, $userModel, $discussionModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $allProjects = $projectModel->getAllProjects( $user->id, array( 'id', 'name', 'status', 'modified_date' ), array( 'active' ) );
        if( !empty( $allProjects ) ) {
            foreach( $allProjects as $row => $project ) {
                $projectOwner = $projectModel->getProjectOwner( $project['id'] );
                $allProjects[$row]['user_name'] = $userModel->getName( $projectOwner['user_id'] );
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $allProjects );
    } catch( ResourceNotFoundException $e ) {
        $app->response()->status( 204 );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * GET route for getting all inactive projects the calling user has access to
 * A valid Authorization header must be passed from the calling application
 * gets project id, name, status, and modified date
 * outputs json object of projects or may return header response of 204 No Content if no projects are available or 400 Bad Request for errors
 */
$app->get( '/projects/inactive', function() use ( $app, $projectModel, $userModel, $discussionModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $allProjects = $projectModel->getAllProjects( $user->id, array( 'id', 'name', 'status', 'modified_date' ), array( 'inactive' ) );
        if( !empty( $allProjects ) ) {
            foreach( $allProjects as $row => $project ) {
                $projectOwner = $projectModel->getProjectOwner( $project['id'] );
                $allProjects[$row]['user_name'] = $userModel->getName( $projectOwner['user_id'] );
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $allProjects );
    } catch( ResourceNotFoundException $e ) {
        $app->response()->status( 204 );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * GET route for getting a single project the calling user has access to
 * A valid Authorization header must be passed from the calling application
 * gets project id, name, status, and modified date
 * outputs json object of projects or may return header response of 204 No Content if no projects are available or 400 Bad Request for errors
 */
$app->get( '/projects/:id', function( $id ) use ( $app, $projectModel, $userModel ) {
    try {
        $project = $projectModel->getProject( $id );
        if( !empty( $project[0] ) ) {
            $project = $project[0];
            $projectOwner = $projectModel->getProjectOwner( $project['id'] );
            $project['user_name'] = $userModel->getName( $projectOwner['user_id'] );
            if( !empty( $project['ownDiscussion'] ) ) {
                foreach( $project['ownDiscussion'] as $discussionRow => $discussion ) {
                    $project['ownDiscussion'][$discussionRow]['user_name'] = $userModel->getName( $discussion['user_id'] );
                }
            }
            $users = $userModel->getAllProjectUsers( $project['id'] );
            if( !empty( $users ) ) {
                foreach( $users as $userRow => $user ) {
                    $project['ownUser'][$userRow]['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
                    $project['ownUser'][$userRow]['id'] = $user['id'];
                }
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $project );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for creating a new project
 * A valid Authorization header must be passed from the calling application
 * saves project to database and sends email notification to all users (except the user who created the project) who have given access to the project
 * outputs json object of project id or may return header response of 400 Bad Request for errors
 */
$app->post( '/projects', function () use ( $app, $projectModel, $userModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $id = $projectModel->addProject( $input );
        if( !empty( $input->userIds ) ) {
            $userIds = (array)$input->userIds;
            foreach( $userIds as $userId ) {
                $projectModel->setUser( $userId, $id );
                if( $userId != $user->id ) {
                    $headers = "From: nobody@project-dashboard.dev" . PHP_EOL;
                    $headers .= "MIME-Version: 1.0" . PHP_EOL;
                    $headers .= "Content-Type: text/html; charset=ISO-8859-1" . PHP_EOL;
                    $message = '<html><body>';
                    $message .= '<p>You have been added to a new project called: ' . $projectModel->getName( $id ) . '</p>';
                    $message .= '<p>You can view the project in the <a href="https://project-dashboard.dev/#projects/' . $id . '">Project Dashboard</a></p>';
                    $message .= '</body></html>';
                    mail( $userModel->getEmail( $userId ), "A new project [" . $projectModel->getName( $id ) . "] has been created!", $message, $headers ); //NOTE: this will get replaced by 3rd party app in future
                }
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $id ) );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * PUT route for updating a project
 * A valid Authorization header must be passed from the calling application
 * updates project details and sends email notification to all users who have just now been given access to the project
 * outputs json object of project id or may return header response of 400 Bad Request for errors
 */
$app->put( '/projects/:id', function( $id ) use ( $app, $projectModel, $userModel ) {
    try {
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        if( !empty( $input->userIds ) ) {
            $userIds = (array)$input->userIds;
            $currentProjectUserIds = $userModel->getAllProjectUserIds( $id );
            $userIdsToRemove = array_merge( array_diff( $currentProjectUserIds, $userIds ), array_diff( $userIds, $currentProjectUserIds ) );
            if( !empty( $userIdsToRemove ) ) {
                foreach( $userIdsToRemove as $userIdToRemove ) {
                    $projectModel->removeUser( $userIdToRemove, $id );
                }
            }
            foreach( $userIds as $userId ) {
                $projectModel->setUser( $userId, $id );
                if( !in_array( $userId, $currentProjectUserIds ) ) {
                    $headers = "From: nobody@project-dashboard.dev" . PHP_EOL;
                    $headers .= "MIME-Version: 1.0" . PHP_EOL;
                    $headers .= "Content-Type: text/html; charset=ISO-8859-1" . PHP_EOL;
                    $message = '<html><body>';
                    $message .= '<p>You have been added to a new project called: ' . $projectModel->getName( $id ) . '</p>';
                    $message .= '<p>You can view the project in the <a href="https://project-dashboard.dev/#projects/' . $id . '">Project Dashboard</a></p>';
                    $message .= '</body></html>';
                    mail( $userModel->getEmail( $userId ), "You have been added to a project[" . $projectModel->getName( $id ) . "]!", $message, $headers );
                }
            }
        }

        $id = $projectModel->updateProject( $id, $input );
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $id ) );
    } catch (Exception $e) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * GET route for getting all discussions the calling user has access to
 * A valid Authorization header must be passed from the calling application
 * gets all discussion details as well as discussion owner and any comments
 * outputs json object of discussion or may return header response of 400 Bad Request for errors
 */
/* Begin Discussions */
$app->get( '/discussions', function() use ( $app, $discussionModel, $userModel, $projectModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $usersProjects = $projectModel->getAllProjectIds( $user->id );
        $allDiscussions = $discussionModel->getAllDiscussions( $usersProjects );
        if( !empty( $allDiscussions ) ) {
            foreach( $allDiscussions as $row => $discussion ) {
                $allDiscussions[$row]['project_name'] = $projectModel->getName( $discussion['project_id'] );
                $allDiscussions[$row]['user_name'] = $userModel->getName( $discussion['user_id'] );
                if( !empty( $discussion['ownComment'] ) ) {
                    foreach ($discussion['ownComment'] as $commentRow => $comment) {
                        $allDiscussions[$row]['ownComment'][$commentRow]['user_name'] = $userModel->getName( $comment['user_id'] );
                    }
                }
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $allDiscussions );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * GET route for getting a single discussion the calling user has access to
 * A valid Authorization header must be passed from the calling application
 * gets all discussion details as well as discussion owner and any comments
 * outputs json object of discussion or may return header response of 400 Bad Request for errors
 */
$app->get( '/discussions/:project_id/:discussion_id', function( $project_id, $discussion_id ) use ( $app, $discussionModel, $userModel, $projectModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $discussion = $discussionModel->getDiscussionByProject( $discussion_id, $project_id );
        if( !empty( $discussion[0] ) ) {
            $discussion = $discussion[0];
            $discussion['project_name'] = $projectModel->getName( $discussion['project_id'] );
            $discussion['user_name'] = $userModel->getName( $discussion['user_id'] );
            if( !empty( $discussion['ownComment'] ) ) {
                foreach ($discussion['ownComment'] as $commentRow => $comment) {
                    $discussion['ownComment'][$commentRow]['user_name'] = $userModel->getName( $comment['user_id'] );
                }
            }
        }
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( $discussion );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for adding a new discussion
 * A valid Authorization header must be passed from the calling application
 * saves discussion details to database and sends email notification to all users associated with the discussion
 * outputs json object of discussion id or may return header response of 400 Bad Request for errors
 */
$app->post( '/discussions', function () use ( $app, $discussionModel, $userModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $input->user_id = $user->id;
        $id = $discussionModel->addDiscussion( $input );
        $discussionModel->notifyUsers( $user->id, $id );
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $id ) );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for adding a new comment
 * A valid Authorization header must be passed from the calling application
 * saves comment details to database
 * outputs json object of comment id or may return header response of 400 Bad Request for errors
 */
$app->post( '/comments', function () use ( $app, $commentModel, $userModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $request = $app->request();
        $body = $request->getBody();
        $input = json_decode( $body );
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        $input->user_id = $user->id;
        $id = $commentModel->addComment( $input );
        $commentModel->notifyUsers( $user->id, $id );
        $app->response()->header( 'Content-Type', 'application/json' );
        echo json_encode( array( 'id' => $id ) );
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * POST route for adding a new file
 * A valid Authorization header must be passed from the calling application
 * saves file details to database and uploads file to server as well as sends email notificatio to all users associated with the discussion
 * outputs json object of file id and file name or may return header response of 400 Bad Request for errors
 */
$app->post( '/files/:project_id/:discussion_id', function ( $projectId, $discussionId ) use ( $app, $flysystem, $userModel, $fileModel ) {
    try {
        $apacheHeaders = apache_request_headers();
        $request = $app->request();
        $user = $userModel->isValidApiKey( $apacheHeaders['Authorization'] );
        if( !empty( $user ) ) {
            if( !empty( $_FILES ) ) {
                foreach ( $_FILES as $key => $file ) {
                    $upload = new \Upload\File( $key, $flysystem );
                    $upload->setName( $user->first_name . $user->last_name . uniqid() . '.' . $discussionId . '.' . $user->id . '.' . $projectId );
                    $upload->addValidations( array(
                        new \Upload\Validation\Mimetype( array(
                            'image/svg+xml',
                            'image/png',
                            'application/msword',
                            'application/excel',
                            'application/pdf',
                            'application/octet-stream',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        ) ),
                    ) );

                    try {
                        $file['name'] = preg_replace("/[^a-zA-Z0-9\.]/", "", $file['name']);
                        $upload->upload();
                        $id = $fileModel->addFile( array(
                            'name' => $upload->getNameWithExtension(),
                            'mime_type' => $upload->getMimetype(),
                            'original_name' => $file['name'],
                            'discussion_id' => $discussionId,
                            'user_id' => $user->id,
                            'project_id' => $projectId,
                        ) );
                        $app->response()->header( 'Content-Type', 'application/json' );
                        $fileModel->notifyUsers( $user->id, $id );
                        echo json_encode( array( 'id' => $id, 'name' => $file['name'] ) );
                    } catch( RuntimeException $e) {
                        $app->response()->status( 400 );
                        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
                    } catch( InvalidArgumentException $e) {
                        $app->response()->status( 400 );
                        $app->response()->header( 'X-Status-Reason', "Unable to upload file" );
                    } catch (Exception $e) {
                        $app->response()->status( 400 );
                        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
                    }
                }
            }
        }
    } catch ( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
} );

/*
 * GET route for downloading a file
 * A valid Authorization header must be passed from the calling application
 * gets file and streams it to browser
 * may return header response of 400 Bad Request for errors
 */
$app->get( '/filedownload/:file_id/:authorization', function ( $fileId, $auth_token ) use ( $app, $userModel, $fileModel, $flysystem ) {
    try {
        $user = $userModel->isValidApiKey( $auth_token );
        if( !empty( $user ) ) {
            $fileData = $fileModel->getFile( $fileId );
            if( !empty( $fileData[0] ) ) {
                $fileData = $fileData[0];
                $file = '/srv/snp-attachments/' . $fileData['name'];
                $app->response()->header( 'Content-Description', "File Transfer" );
                $app->response()->header( 'Content-Type', 'octet-stream' );
                $app->response()->header( 'Content-Disposition', "attachment; filename=" . $fileData['original_name'] );
                $app->response()->header( 'Cache-Control', "must-revalidate" );
                $app->response()->header( 'Content-Length', $flysystem->getSize( $fileData['name'] ) );
                echo $flysystem->read( $fileData['name'] );
            }
        }
    } catch( Exception $e ) {
        $app->response()->status( 400 );
        $app->response()->header( 'X-Status-Reason', $e->getMessage() );
    }
});


$app->run();
