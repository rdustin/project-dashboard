<?php
/**
 * Project specific functions
 * @author Randy Dustin <randydustin@gmail.com>
 * @version 1.0
 */
class ProjectModel {

    /**
     * gets all projects the specified user has access to
     * @param  int $userId the user's id
     * @param  array  $fields fields to return
     * @param  array  $status project status type
     * @return array         the project data
     * @throws ResouceNotFoundException If no projects are found
     */
    public function getAllProjects( $userId, $fields = array(), $status = array( 'active', 'inactive' ) ) {
        if( !empty( $fields ) ) {
            $returnColumns = 'project.' . implode( ', project.', $fields );
        } else {
            $returnColumns = 'project.*';
        }

        if( empty( $status ) ) {
            $status = array( 'active', 'inactive' );
        }
        $allProjects = R::getAll(
            'select ' . $returnColumns . ' from project, project_user where project.id = project_user.project_id and project_user.user_id = ? and status in (' . R::genSlots( $status ) . ') order by modified_date desc',
            array_merge( array( $userId ), $status )
        );
        if( !empty( $allProjects ) ) {
            return $allProjects;
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * gets just project ids the specified user has access to
     * @param  int $userId the user's id
     * @return array         the project ids
     * @throws ResouceNotFoundException If no projects are found
     */
    public function getAllProjectIds( $userId ) {
        $allProjects = R::getCol( 'select project.id from project, project_user where project.id = project_user.project_id and project_user.user_id = ?', array( $userId ) );
        if( !empty( $allProjects ) ) {
            return $allProjects;
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * gets a projects data based on the given id
     * @param  int $id project id
     * @return object     Red Bean database object
     * @throws ResouceNotFoundException If no project is found
     */
    public function getProject( $id ) {
        $project = R::findOne( 'project', 'id=?', array( $id ) );
        if( $project ) {
            return R::exportAll( $project );
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * gets the project's name based on given id
     * @param  int $id project id
     * @return string     the project's name
     */
    public function getName( $id ) {
        $project = R::findOne( 'project', 'id=?', array( $id ) );

        return $project->name;
    }

    /**
     * gets the who created the project
     * @param  int $id project id
     * @return int     the user id of the project owner
     */
    public function getProjectOwner( $id ) {
        $userId = R::getRow( 'select min(user_id) as user_id from project_user where project_id = :project_id', array(":project_id" => $id ) );
        return $userId;
    }

    /**
     * saves the project details to the database
     * @param object $input the form data object to be saved
     * @return int the id of the project
     */
    public function addProject( $input ) {
        $project = R::dispense( 'project' );
        $project->name = filter_var( $input->name, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $project->status = filter_var( $input->status, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $project->creation_date = date( "Y-m-d H:i:s", time() );
        $project->modified_date = date( "Y-m-d H:i:s", time() );
        $id = R::store( $project );
        return $id;
    }

    /**
     * updates the project details in the database
     * @param  int $id    project id
     * @param  object $input the form data object to be saved
     * @return int        project id
     * @throws ResouceNotFoundException If no project is found
     */
    public function updateProject( $id, $input ) {
        $project = R::findOne( 'project', 'id=?', array( $id ) );
        if( $project ) {
            $project->name = filter_var( $input->name, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
            $project->status = filter_var( $input->status, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
            $project->modified_date = date( "Y-m-d H:i:s", time() );
            $id = R::store( $project );
            return $id;
        } else {
            throw new ResourceNotFoundException();

        }
    }

    /**
     * adds a user to the project
     * @param int $userId    user id
     * @param int $projectId project id
     * @return int user id
     * @throws ResouceNotFoundException If either the project or user is not found
     */
    public function setUser( $userId, $projectId ) {
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

    /**
     * removes use from project
     * @param  int $userId    user id
     * @param  int $projectId project id
     * @return void
     */
    public function removeUser( $userId, $projectId ) {
        R::exec( 'delete from project_user where project_id = :project_id and user_id = :user_id', array( ':project_id'=>$projectId, ':user_id'=>$userId ) );
    }
}