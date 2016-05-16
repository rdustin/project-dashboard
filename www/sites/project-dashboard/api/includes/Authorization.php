<?php
/**
 * All logic associated with user authorization to api data
 *
 * This is built as Middleware for the Slim PHP micro-framework
 *
 * PHP version 5.3+
 *
 * @author Randy Dustin <randydustin@gmail.com>
 * @version 1.0
 */
class Authorization extends \Slim\Middleware {

    /**
     * Provides the definition of roles (Admin, Developer, Client, Guest) and their capabilities
     * @var array
     */
    private $rolesArray = array(
				'administrator' => array(
					'view_all_users',
					'edit_all_users',
					'deactivate_all_users',
					'create_new_users',
					'edit_own_users',
					'view_own_users',
					'view_all_projects',
					'edit_all_projects',
					'deactivate_all_projects',
					'create_new_projects',
					'edit_assigned_projects',
					'view_assigned_projects',
					'view_attached_discussions',
          'view_all_discussions',
          'view_own_discussions',
          'create_new_discussions',
          'create_new_comments',
          'edit_own_discussions',
          'edit_all_discussions',
					'view_attached_files',
					'create_new_files',
				),
				'developer' => array(
					'edit_own_users',
					'view_own_users',
					'edit_assigned_projects',
					'view_assigned_projects',
          'view_own_discussions',
					'view_attached_discussions',
          'create_new_discussions',
          'create_new_comments',
          'edit_own_discussions',
					'view_attached_files',
					'create_new_files',
				),
				'client' => array(
					'edit_own_users',
					'view_own_users',
					'edit_assigned_projects',
					'view_assigned_projects',
          'view_own_discussions',
					'view_attached_discussions',
          'create_new_discussions',
          'create_new_comments',
          'edit_own_discussions',
					'view_attached_files',
					'create_new_files',
				),
				'guest' => array(),
	   );

    /**
     * holds any excluded routes
     * @var array
     */
	protected $excludedRoutes;

    /**
     * user model class
     * @var object
     */
	private $userModel;

    /**
     * constructor for class sets the property values
     * @param object $userModel      a reference to the user model instance defined in the router
     * @param array  $excludedRoutes any routes that do not require authorization (i.e. login)
     */
	public function __construct( &$userModel, $excludedRoutes = array() ) {
		$this->userModel = $userModel;
		$this->excludedRoutes = $excludedRoutes;
	}

    /**
     * function that overrides the Slim middleware class
     * @return http header and json object provides http header and json object information back to router
     */
	public function call() {
        // Get reference to application
        $app = $this->app;
        $headers = apache_request_headers();

        if( !empty( $this->excludedRoutes ) ) {
        	foreach ( $this->excludedRoutes as $route ) {
        		if( strpos( $this->app->request()->getPathInfo(), $route ) !== false ) {
        			$this->next->call();
        			return;
        		}
        	}
        }
        if ( isset( $headers['Authorization'] ) ) {
        	if ( false === $this->userModel->isValidApiKey( $headers['Authorization'] ) ) {
        		$response["error"] = true;
	            $response["message"] = "Access Denied. Invalid Api key";
	            $app->status( 401 );
	            $app->contentType( 'application/json' );
	            echo json_encode( $response );
	            return;
        	} else {
	            try {
	            	//get user info - we need their role
					$user = $this->userModel->getUser( $headers['Authorization'], 'api_key', array( 'hashit' ) );
				} catch( ResourceNotFoundException $e ) {
					$response["error"] = true;
		            $response["message"] = "Access Denied. Invalid User";
		            $app->status( 401 );
		            $app->contentType( 'application/json' );
		            echo json_encode( $response );
		            return;
				} catch( Exception $e ) {
					$response["error"] = true;
		            $response["message"] = "Access Denied. Invalid User";
		            $app->status(401);
		            $app->contentType( 'application/json' );
		            echo json_encode( $response );
		            return;
				}
        		//check current request against roles and create appropriate response
        		$userCan = $this->_userCan( $this->app->request()->getPathInfo(), $this->app->request()->getMethod(), $user );
                if( false === $userCan ) {
                    $response["error"] = true;
                    $response["message"] = "Access Denied.";
                    $app->status( 403 );
                    $app->contentType( 'application/json' );
                    echo json_encode( $response );
                    return;
                }
        	}
        } else {
            $response["error"] = true;
            $response["message"] = "Access Denied. Invalid User";
            $app->status( 401 );
            $app->contentType( 'application/json' );
            echo json_encode( $response );
            return;
        }



        // Run inner middleware and application
        $this->next->call();

        $res = $app->response;
        $body = $res->getBody();
    }

    /**
     * checks user's capabilities against the current request
     * @param  array $requestedPath  an array of the path that has been requested
     * @param  string $method        GET, POST, PUT
     * @param  array $user           requesting user's details from the database
     * @return boolean               true if they are authorized, false otherwise
     */
    private function _userCan( $requestedPath, $method, $user ) {
        $role = $user['role'];
    	$possibleCapabilities = $this->_mapRequestToCapabilities( $requestedPath, $method );
    	if ( !empty( $possibleCapabilities ) ) {
    		foreach ( $possibleCapabilities as $possibleCapability ) {
                if ( in_array( $possibleCapability, $this->rolesArray[$role] ) ) {
    				$functionName = '_' . lcfirst( str_replace( ' ', '', ucwords( str_replace( '_', ' ', $possibleCapability ) ) ) );
    				return method_exists( $this, $functionName ) ? $this->{$functionName}( $user, $requestedPath ) : false;
    			}
    		}
            return false;
    	} else {
    		return false;
    	}
    }

    /**
     * given the path and the method what possible capabilities do we need to check
     * @param  array $requestedPath  an array of the path that has been requested
     * @param  string $method        GET, POST, PUT
     * @return array                 all possible capabilities for this request
     */
    private function _mapRequestToCapabilities( $requestedPath, $method ) {
    	$possibleCapabilities = array();
    	$capabilityActions = array();
    	switch ( strtolower( $method ) ) {
    		case 'get':
    			$capabilityActions[] = 'view_all';
    			$capabilityActions[] = 'view_own';
    			$capabilityActions[] = 'view_assigned';
    			$capabilityActions[] = 'view_attached';
    			break;
    		case 'post':
    			$capabilityActions[] = 'create_new';
    			break;
    		case 'put':
    			$capabilityActions[] = 'edit_all';
    			$capabilityActions[] = 'edit_own';
    			$capabilityActions[] = 'edit_assigned';
    			break;
    		case 'delete':
    			$capabilityActions[] = 'deactivate_all';
    			break;
    	}
    	$requestPieces = $this->_pathValues( $requestedPath );
    	if( !empty( $capabilityActions ) ) {
    		foreach ( $capabilityActions as $action ) {
    			$possibleCapabilities[] = $action . '_' . $requestPieces['model'];
    		}
    	}
    	return $possibleCapabilities;
    }

    /**
     * breaks down the request path into model, id, child model, and child model id
     * @param  array $requestedPath an array of the path that has been requested
     * @return array
     */
    private function _pathValues( $requestedPath ) {
    	$pathValues = array( 'model', 'id' );
    	$requestPieces = explode( '/', $requestedPath );
    	$pathValues['model'] = $requestPieces[1]; // i.e. "projects"
    	$pathValues['id'] = isset( $requestPieces[2] ) && trim( $requestPieces[2] ) != '' ? trim( $requestPieces[2] ) : '';
        $pathValues['subModel'] = isset( $requestPieces[3]) && trim( $requestPieces[3] ) != '' ? trim( $requestPieces[3] ) : '';
        $pathValues['subModel_id'] = isset( $requestPieces[4]) && trim( $requestPieces[4] ) != '' ? trim( $requestPieces[4] ) : '';

    	return $pathValues;
    }

    /* specific capability check functions - called by _userCan method */

    /**
     * can the user view all projects in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewAllProjects( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'projects' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator', 'developer', 'client' ) ) ) {
                $isValidRequest = true;
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user view all projects in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _editAllProjects( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAllProjects( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user deactivate all projects in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _deactivateAllProjects( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAllProjects( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user create new projects in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _createNewProjects( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAllProjects( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user assign users to projects in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewAssignedProjects( $user, $requestedPath ) {
    	$isValidRequest = false;
    	$requestPieces = $this->_pathValues( $requestedPath );
    	if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'projects' ) ) {
            $isValidRequest = true;
        }

    	return $isValidRequest;
    }

    /**
     * can the user edit projects in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _editAssignedProjects( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAssignedProjects( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user view all users in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewAllUsers( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'users' ) ) {
            if( isset( $user['role'] ) && trim( $user['role'] ) == 'administrator' ) {
                $isValidRequest = true;
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user edit all users in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _editAllUsers( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAllUsers( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user deactivate all users in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _deactivateAllUsers( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAllUsers( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user create new users in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _createNewUsers( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewAllUsers( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user view themselves in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewOwnUsers( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'users' ) ) {
            if( isset( $requestPieces['id'] ) && is_numeric( $requestPieces['id'] ) ) {
                if( $requestPieces['id'] == $user['id'] ) {
                    $isValidRequest = true;
                }
            } else if( isset( $requestPieces['id'] ) && strtolower( $requestPieces['id'] ) == 'profile') {
                if( $requestPieces['subModel'] == $user['id'] ) {
                    $isValidRequest = true;
                }
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user edit themselves in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _editOwnUsers( $user, $requestedPath ) {
        $isValidRequest = false;

        return $this->_viewOwnUsers( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user view all discussions in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewAllDiscussions( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'discussions' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator' ) ) ) {
                $isValidRequest = true;
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user view their own discussions in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewOwnDiscussions( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'discussions' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator', 'developer', 'client' ) ) ) {
                $isValidRequest = true;
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user create new discussions for this project
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _createNewDiscussions( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'discussions' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator', 'developer', 'client' ) ) ) {
                if( !empty( $user['sharedProject'] ) ) {
                    $isValidRequest = true;
                }
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user view discussions in this project
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _viewAttachedDiscussions( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'discussions' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator', 'developer', 'client' ) ) ) {
                if ( !empty( $requestPieces['id'] ) ) {
                    if( !empty( $user['ownDiscussion'] ) ) {
                        foreach ( $user['ownDiscussion'] as $discussion ) {
                            if( $discussion['id'] == $requestPieces['id'] ) {
                                $isValidRequest = true;
                            }
                        }
                    }
                }
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user edit the requested discussion
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _editOwnDiscussions( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'discussions' ) ) {
            if ( !empty( $requestPieces['id'] ) ) {
                if( !empty( $user['ownDiscussion'] ) ) {
                    foreach ( $user['ownDiscussion'] as $discussion ) {
                        if( $discussion['id'] == $requestPieces['id'] ) {
                            $isValidRequest = true;
                        }
                    }
                }
            }
        }

        return $isValidRequest;

    }

    /**
     * can the user edit all discussions in the system
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _editAllDiscussions( $user, $requestedPath ) {
        $isValidRequest = false;
        return $this->_viewAllProjects( $user, $requestedPath ); //NOTE: this may have its own logic later
    }

    /**
     * can the user create new comments for the current discussion
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _createNewComments( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'comments' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator', 'developer', 'client' ) ) ) {
                if( !empty( $user['sharedProject'] ) ) {
                    $isValidRequest = true;
                }
            }
        }
        return $isValidRequest;
    }

    /**
     * can the user upload a file to the current discussion
     * @param  array $user          the current user's details
     * @param  array $requestedPath an array of the path that has been requested
     * @return bool                true if authorized false if not
     */
    private function _createNewFiles( $user, $requestedPath ) {
        $isValidRequest = false;
        $requestPieces = $this->_pathValues( $requestedPath );
        if( isset( $requestPieces['model'] ) && trim( $requestPieces['model'] == 'files' ) ) {
            if( isset( $user['role'] ) && in_array( trim( $user['role'] ) , array( 'administrator', 'developer', 'client' ) ) ) {
                if( !empty( $user['sharedProject'] ) ) {
                    $isValidRequest = true;
                }
            }
        }
        return $isValidRequest;
    }
}
