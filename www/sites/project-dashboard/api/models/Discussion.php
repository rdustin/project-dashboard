<?php
/**
 * Discussion specific functions
 * @author Randy Dustin <randydustin@gmail.com>
 * @version 1.0
 */
class DiscussionModel {

    /**
     * gets all discussions that are associated with the given array of project ids
     * @param  array $usersProjects an array of ids
     * @return [type]                a Reb Bean object of the discussion from the database
     * @throws ResourceNotFoundException If no discussions are found
     */
    public function getAllDiscussions( $usersProjects ) {
        $discussions = R::find( 'discussion', ' project_id IN (' . R::genSlots( $usersProjects ) . ')', $usersProjects );
        $allDiscussions = R::exportAll( $discussions );
        if( $allDiscussions ) {
            return $allDiscussions;
        } else {
            throw new ResourceNotFoundException();
        }

    }

    /**
     * gets the discussion from the database based on discussion id and user id
     * @param  int $id     the discussion id
     * @param  int $userId the user id
     * @return object         a Red Bean object of the discussion from the database
     * @throws ResourceNotFoundException If no discussions are found
     */
    public function getDiscussion( $id, $userId ) {
        $discussion = R::findOne( 'discussion', 'id = ? and user_id = ?', array( $id, $userId ) );
        if( $discussion ) {
            return R::exportAll( $discussion );
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * gets the discussion based on discussion id and project id
     * @param  int $id        the discussion id
     * @param  int $projectId the project id
     * @return object            Red Bean object of the discussion from the database
     * @throws ResourceNotFoundException If no discussions are found
     */
    public function getDiscussionByProject( $id, $projectId ) {
        $discussion = R::findOne( 'discussion', 'id = ? and project_id = ?', array( $id, $projectId ) );
        if( $discussion ) {
            return R::exportAll( $discussion );
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * save discussion based on form input
     * @param object $input the formm input data in object form
     * @return int the discussion id
     */
    public function addDiscussion( $input ) {
        $discussion = R::dispense( 'discussion' );
        $discussion->title = filter_var( $input->title, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $discussion->message = filter_var( $input->message, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $discussion->user_id = filter_var( $input->user_id, FILTER_SANITIZE_NUMBER_INT );
        $discussion->project_id = filter_var( $input->project_id, FILTER_SANITIZE_NUMBER_INT );
        $discussion->creation_date = date( "Y-m-d H:i:s", time() );
        $discussion->modified_date = date( "Y-m-d H:i:s", time() );
        $id = R::store( $discussion );
        return $id;
    }

     /**
     * sends email notification to all users who are associated with the discussion
     * @param  int $creatorId the id of the user who created the discussion
     * @param  int $discussionId the discussion id
     * @return void
     */
    public function notifyUsers( $creatorId, $discussionId ) {
        $emails = $this->getUserEmailsByDiscussionId( $discussionId, $creatorId );
        $discussion = $this->getDiscussion( $discussionId, $creatorId );
        $project = R::findOne( 'project', 'id = ?', array( $discussion[0]["project_id"] ) );
        if( !empty( $emails && !empty( $discussion ) ) ) {
            $parsedown = new Parsedown();
            $headers = "From: nobody@project-dashboard.dev" . PHP_EOL;
            $headers .= "MIME-Version: 1.0" . PHP_EOL;
            $headers .= "Content-Type: text/html; charset=ISO-8859-1" . PHP_EOL;
            $subject = "[" . $project->name . "] " . $discussion[0]["title"];
            $message = '<html><body>';
            $message .= $parsedown->text( $discussion[0]["message"] );
            $message .= '<p><a href="https://project-dashboard.dev/#projects/' . $project->id . '/discussions/' . $discussionId . '">View the message in the dashboard.</a></p>';
            $message .= '</body></html>';
            foreach( $emails as $email ) {
                mail( $email , $subject, $message, $headers );
            }
        }
    }

    /**
     * gets the email addresses of all users associated with the discussion
     * @param  int $discussionId the discussion's id
     * @param  int $creatorId the user who created the discussion
     * @return array
     */
    public function getUserEmailsByDiscussionId( $discussionId, $creatorId) {
        $userEmails = R::getCol(
            'select
                user.email from user, project_user, discussion
             where
                user.id = project_user.user_id
            and project_user.project_id = discussion.project_id
            and discussion.id = ?
            and user.id not in (?)'
        , array( $discussionId, $creatorId ) );
        return $userEmails;
    }
}