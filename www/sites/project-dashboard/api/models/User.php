<?php
class UserModel {

    function __construct() {

    }

    public function getAllUsers( $role, $userId = 0, $notAllowed = array( 'hashit', 'api_key' ) ) {
        if( strtolower( $role ) == 'administrator' ) {
            $users = R::find( 'user' );
        } else {
            $users = R::find( 'user', 'id=?', array( $userId ) );
        }
        $allUsers = R::exportAll( $users );
        $result = array();
        foreach( $allUsers as $user ) {
            $result[] = $this->_removeSensitiveData( $user, $notAllowed );
        }

        return $result;
    }

    public function getUser( $id, $type = 'id', $notAllowed = array( 'hashit', 'api_key' ) ) {
        switch ( $type ) {
            case 'api_key':
                $user = R::findOne( 'user', 'api_key=?', array( $id ) );
                break;
            case 'email':
                $user = R::findOne( 'user', 'email=?', array( $id ) );
                break;
            case 'id':
            default:
                $user = R::findOne( 'user', 'id=?', array( $id ) );
                break;
        }
        if( $user ) {
            $result = $this->_removeSensitiveData(R::exportAll( $user ), $notAllowed );
            return $result[0];
        } else {
            throw new ResourceNotFoundException();
        }
    }

    public function getName( $id, $format = 'fl' ) {
        $user = R::findOne( 'user', 'id=?', array( $id ) );
        switch ( trim( $format ) ) {
            case 'f':
                $name = $user->first_name;
                break;
            case 'l':
                $name = $user->last_name;
                break;
            case 'fl':
            default:
                $name = $user->first_name . ' ' . $user->last_name;
                break;
        }

        return $name;
    }

    public function getEmail( $id ) {
        $user = R::findOne( 'user', 'id=?', array( $id ) );

        return $user->email;
    }

    public function checkLogin( $password, $email ) {
        try {
            $user = $this->getUser( $email, 'email', array() );
            if( true === $this->_isValidPassword( $user['hashit'], $password ) ) {
                $userData = new stdClass();
                $userData->api_key = $this->_generateApiKey( $user['email'] . $user['role'] . gmdate("Y-m-d\TH:i:s\Z"), $user['email'] . $user['hashit'] );
                $user = $this->updateUser( $user['id'], $userData );
                return $user;
            } else {
                return false;
            }
        } catch( ResourceNotFoundException $e ) {
            return false;
        } catch( Exception $e ) {
            return false;
        }
    }

    public function addUser( $input, $password ) {
        $user = R::dispense( 'user' );
        $user->email = filter_var( $input->email, FILTER_SANITIZE_EMAIL );
        try {
            $checkEmail = $this->getUser( $user->email, 'email' );
            throw new UserExistsException();
        } catch( ResourceNotFoundException $e ) {
            $user->first_name = filter_var( $input->first_name, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
            $user->last_name = filter_var( $input->last_name, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
            $user->role = filter_var( $input->role, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
            $user->hashit = crypt( $password, '$6$' . $this->_generateSalt() . '$' );
            $user->creation_date = date( "Y-m-d H:i:s", time() );
            $user->modified_date = date( "Y-m-d H:i:s", time() );

            $id = R::store( $user );
            return array( 'id' => $id, 'email' => $user->email );
        }


    }

    public function updateUser( $id, $input ) {
        $user = R::findOne( 'user', 'id=?', array( $id ) );
        if( $user ) {
            foreach ($input as $key => $value) {
                if( !is_array( $value ) && !is_object( $value ) && !in_array( $key, array( 'password', 'api_key', 'username', 'password2', 'projectIds' ) ) ) {
                    $user->$key = filter_var( $value, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
                } elseif( !is_array( $value ) && !is_object( $value ) && $key == 'password' ) {
                    $user->hashit = crypt( filter_var( $input->password, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES ), '$6$' . $this->_generateSalt() . '$' );
                } elseif( !is_array( $value ) && !is_object( $value ) && $key == 'api_key' ) {
                    $user->api_key = $input->api_key;
                }
            }
            $user->modified_date = date( "Y-m-d H:i:s", time() );
            $updatedId = R::store( $user );
            return $user;
        } else {
            throw new ResourceNotFoundException();
        }
    }

    public function setProject( $userId, $projectId ) {
        $project = R::findOne( 'project', 'id=?', array( $projectId ) );
        $user = R::findOne( 'user', 'id=?', array( $userId ) );

        if( $user && $project ) {
            $user->sharedProject[] = $project;
            $id = R::store( $user );
            return $id;
        } else {
            throw new ResourceNotFoundException();
        }
    }

    public function removeProject( $userId, $projectId ) {
        R::exec( 'delete from project_user where project_id = :project_id and user_id = :user_id', array( ':project_id'=>$projectId, ':user_id'=>$userId ) );
    }

    public function getAllProjectUsers( $projectId ) {
        $result = array();
        $userIds = $this->getAllProjectUserIds( $projectId );
        if( !empty( $userIds ) ) {
            $users = R::find( 'user', ' id IN (' . R::genSlots( $userIds ) . ')', $userIds );
            $allUsers = R::exportAll( $users );
            foreach( $allUsers as $user ) {
                $result[] = $this->_removeSensitiveData( $user, array( 'hashit', 'api_key' ) );
            }
        }

        return $result;
    }

    public function getAllProjectUserIds( $projectId ) {
        $userIds = R::getCol( 'select user_id from project_user where project_id = ?', array( $projectId ) );
        return $userIds;
    }

    public function isValidApiKey( $api_key ) {
        $result = false;
        if( trim( $api_key ) != '' ) {
            $user = R::findOne( 'user', 'api_key=?', array( $api_key ) );
            if( $user ) {
                $result = $user;
            }
        }

        return $result;
    }

    public function invalidateApiKey( $userId ) {
        $userData = new stdClass();
        $userData->api_key = "";
        $user = $this->updateUser( $userId, $userData );
        return $user;
    }

    private function _removeSensitiveData( $records, $notAllowed ) {
        $result = array();
        $records = (array) $records;
        foreach( $records as $key => $record ) {
            if( is_array( $record ) ) {
                $result[$key] = $this->_removeSensitiveData( $record, $notAllowed );
            } else {
                if( !in_array( $key, $notAllowed ) ) {
                    $result[$key] = $record;
                }
            }
        }
        return $result;
    }

    private function _isValidPassword( $hash, $password ) {
        $salt = substr( $hash, 0, 20 );
        $new_hash = crypt( $password, $salt );
        if($hash == $new_hash) {
            return true;
        } else {
            return false;
        }
    }

    private function _generateSalt() {
        $salt = substr( sha1( mt_rand() ), 0, 22 );
        return $salt;
    }

    private function _generateApiKey( $data, $key ) {
        $api_key = hash_hmac( 'sha256', $data, $key );//(string)md5( uniqid( mt_rand(), true ) );
        return $api_key;
    }
}
