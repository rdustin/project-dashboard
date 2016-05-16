<?php
/**
 * File specific functions
 * @author Randy Dustin <randydustin@gmail.com>
 * @version 1.0
 */
class FileModel {

    /**
     * gets file by file id
     * @param  int $id file id
     * @return object     Red Bean object from database
     * @throws ResouceNotFoundException If no file is found
     */
    public function getFile( $id ) {
        $file = R::findOne( 'file', 'id=?', array( $id ) );
        if( $file ) {
            return R::exportAll( $file );
        } else {
            throw new ResourceNotFoundException();
        }
    }

    /**
     * saves file data to database
     * @param object $input form input data
     * @return int the id of the file
     */
    public function addFile( $input ) {
        $file = R::dispense( 'file' );
        $file->name = filter_var( $input['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $file->original_name = filter_var( $input['original_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES );
        $file->mime_type = $input['mime_type'];
        $file->upload_date = date( "Y-m-d H:i:s", time() );
        $file->discussion_id = filter_var( $input['discussion_id'], FILTER_SANITIZE_NUMBER_INT );
        $file->user_id = filter_var( $input['user_id'], FILTER_SANITIZE_NUMBER_INT );
        $file->project_id = filter_var( $input['project_id'], FILTER_SANITIZE_NUMBER_INT );
        $id = R::store( $file );
        return $id;
    }

    /**
     * sends email notification to all users who are associated with the discussion
     * @param  int $creatorId the id of the user who created the discussion
     * @param  int $fileId the file id
     * @return void
     */
    public function notifyUsers( $creatorId, $fileId ) {
        $emails = $this->getUserEmailsByFileId( $fileId, $creatorId );
        $file = $this->getFile( $fileId, $creatorId );
        $discussion = R::findOne( 'discussion', 'id = ?', array( $file[0]["discussion_id"] ) );
        $project = R::findOne( 'project', 'id = ?', array( $discussion->project_id ) );
        $fileCreator = R::findOne( 'user', 'id = ?', array( $creatorId ) );
        if( !empty( $emails && !empty( $file ) ) ) {
            $parsedown = new Parsedown();
            $headers = "From: nobody@project-dashboard.dev" . PHP_EOL;
            $headers .= "MIME-Version: 1.0" . PHP_EOL;
            $headers .= "Content-Type: text/html; charset=ISO-8859-1" . PHP_EOL;
            $subject = "[" . $project->name . "] " . $discussion->title;
            $message = '<html><body>';
            $message .= '<p>' . $fileCreator->first_name . " added a new file named : " . $file[0]["original_name"] . '</p>';
            $message .= '</body></html>';
            foreach( $emails as $email ) {
                mail( $email , $subject, $message, $headers );
            }
        }
    }

    /**
     * gets the email addresses of all users associated with the discussion
     * @param  int $fileId the files's id
     * @param  int $creatorId the user who uploaded the file
     * @return array
     */
    public function getUserEmailsByFileId( $fileId, $creatorId) {
        $userEmails = R::getCol(
            'select
                user.email from user, project_user, file, discussion
             where
                user.id = project_user.user_id
            and project_user.project_id = discussion.project_id
            and discussion.id = file.discussion_id
            and file.id = ?
            and user.id not in (?)'
        , array( $fileId, $creatorId ) );
        return $userEmails;
    }
}