const DatabaseModel = require('./database/database.model');
const mysql = require('mysql');

class CommentsModel extends DatabaseModel {
    constructor(){
        super();
    }

    /* fetch comment */
    fetchComment = async (select_fields, comment_id) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            if(comment_id){
                let fetch_comment_query = mysql.format(`
                    SELECT 
                        ${select_fields || '*'} FROM comments 
                    INNER JOIN users ON users.id = comments.user_id
                    WHERE comments.id IN (?);
                `, comment_id);
                let fetch_comment_result = await this.query(fetch_comment_query);

                response_data.result = fetch_comment_result;
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to fetch comment."
        }

        return response_data;
    }
    
    /* insert a new comment */
    insertNewComment = async (params) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let { user_id, post_id, comment } = params;

            let comment_data = {
                post_id,
                user_id,
                comment
            }

            let insert_comment_query = mysql.format(`INSERT INTO comments SET ?, created_at = NOW()`, comment_data);
            let insert_comment_result = await this.query(insert_comment_query);

            if(insert_comment_result.affectedRows > 0 ){
                let {result: [new_comment_data]}  = await this.fetchComment('comments.comment, CONCAT(users.first_name, " ", users.last_name) as commented_by, DATE_FORMAT(comments.created_at, "%M %D %Y - %h:%m %p") as commented_at', insert_comment_result.insertId)
                
                response_data.result = {
                    id: insert_comment_result.insertId,
                    post_id,
                    comment,
                    commented_by: new_comment_data.commented_by,
                    commented_at: new_comment_data.commented_at,
                }
                response_data.status = insert_comment_result.affectedRows > 0;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to insert a new comment."
        }

        return response_data;
    }

    /* delete comment */
    deleteComment = async (comment_id) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            if(comment_id){
                let delete_comment_query = mysql.format(`DELETE FROM comments WHERE id = ?;`, comment_id);
                let delete_comment_result = await this.query(delete_comment_query);
    
                response_data.result = delete_comment_result;
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to delete a comment."
        }

        return response_data;
    }

    /* update comment */
    updateComment = async (params) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let { edited_comment, comment_id } = params;

            if(comment_id){
                let update_comment_query = mysql.format(`UPDATE comments SET comment = ?, updated_at = NOW() WHERE id = ?;`, [edited_comment, comment_id]);
                let update_comment_result = await this.query(update_comment_query);
    
                response_data.result = update_comment_result;
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to update a comment."
        }

        return response_data;
    }
}

module.exports = new CommentsModel;