<?php
/**
 * Comment specific functions
 * @author Randy Dustin <randydustin@gmail.com>
 * @version 1.0
 */
class CommentModel {

    /**
     * gets a comment based on comment id and user id
     * @param  int $id     the comment's id
     * @param  int $userId the user's id
     * @return object         Red Bean object with the comment data from the database
     * @throws ResourceNotFoundException If no comment is found with that comment id or user id
     */
    public function getComment( $id, $userId ) {
        $comment = R::findOne( 'comment', 'id = ? and user_id = ?', array( $id, $userId ) );
        if( $comment ) {
            return R::exportAll( $comment );
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * saves a comment to the database
     * @param array $input the post data comming from the client
     * @return  int the id that has been assigned to the comment
     */
    public function addComment( $input ) {
        $comment = R::dispense( 'comment' );
        $comment->comment = filter_var( $input->comment, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $comment->user_id = filter_var( $input->user_id, FILTER_SANITIZE_NUMBER_INT );
        $comment->discussion_id = filter_var( $input->discussion_id, FILTER_SANITIZE_NUMBER_INT );
        $comment->creation_date = date( "Y-m-d H:i:s", time() );
        $comment->modified_date = date( "Y-m-d H:i:s", time() );
        $id = R::store( $comment );
        return $id;
    }

    /**
     * sends email notification to all users who are associated with the discussion
     * @param  int $creatorId the id of the user who created the comment
     * @param  int $commentId the comment id
     * @return void
     */
    public function notifyUsers( $creatorId, $commentId ) {
        $emails = $this->getUserEmailsByCommentId( $commentId, $creatorId );
        $comment = $this->getComment( $commentId, $creatorId );
        $discussion = R::findOne( 'discussion', 'id = ?', array( $comment[0]["discussion_id"] ) );
        $project = R::findOne( 'project', 'id = ?', array( $discussion->project_id ) );
        $commentCreator = R::findOne( 'user', 'id = ?', array( $creatorId ) );
        if( !empty( $emails && !empty( $comment ) ) ) {
            $parsedown = new Parsedown();
            $headers = "From: nobody@project-dashboard.dev" . PHP_EOL;
            $headers .= "MIME-Version: 1.0" . PHP_EOL;
            $headers .= "Content-Type: text/html; charset=ISO-8859-1" . PHP_EOL;
            $subject = "[" . $project->name . "] " . $discussion->title;
            $message = '<html><body>';
            $message .= '<p>' . $commentCreator->first_name . " made the following comment: " . $parsedown->text( $comment[0]["comment"] ) . '</p>';
            $message .= '<p><a href="https://project-dashboard.dev/#projects/' . $project->id . '/discussions/' . $discussion->id . '">View the message in the dashboard.</a></p>';
            $message .= '</body></html>';
            foreach( $emails as $email ) {
                mail( $email , $subject, $message, $headers );
            }
        }
    }

    /**
     * gets the email addresses of all users associated with the discussion
     * @param  int $commentId the comment's id
     * @param  int $creatorId the user who created the comment
     * @return array
     */
    public function getUserEmailsByCommentId( $commentId, $creatorId) {
        $userEmails = R::getCol(
            'select
                user.email from user, project_user, comment, discussion
             where
                user.id = project_user.user_id
            and project_user.project_id = discussion.project_id
            and discussion.id = comment.discussion_id
            and comment.id = ?
            and user.id not in (?)'
        , array( $commentId, $creatorId ) );
        return $userEmails;
    }
}