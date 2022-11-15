const DatabaseModel = require('./database/database.model');
const mysql = require('mysql');

class PostsModel extends DatabaseModel {
    constructor(){
        super();
    }

    /* fetch post */
    fetchPost = async (select_fields, post_id) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            if(post_id){
                let fetch_post_query = mysql.format(`
                    SELECT 
                        ${select_fields || '*'} FROM posts 
                    INNER JOIN users ON users.id = posts.user_id
                    WHERE posts.id IN (?);
                `, post_id);
                let fetch_post_result = await this.query(fetch_post_query);

                response_data.result = fetch_post_result;
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to fetch post."
        }

        return response_data;
    }

    /* insert a new post */
    insertNewPost = async (params) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let { user_id, post } = params;

            let post_data = {
                user_id,
                post
            }

            let insert_user_post_query = mysql.format(`INSERT INTO posts SET ?, created_at = NOW()`, post_data);
            let insert_user_post_result = await this.query(insert_user_post_query);

            if(insert_user_post_result.affectedRows > 0){
                let {result: [new_post_data]} = await this.fetchPost('posts.post, CONCAT(users.first_name, " ", users.last_name) as posted_by, DATE_FORMAT(posts.created_at, "%M %D %Y - %h:%m %p") as posted_at', insert_user_post_result.insertId)

                response_data.result = {
                    id: insert_user_post_result.insertId,
                    post,
                    posted_by: new_post_data.posted_by,
                    posted_at: new_post_data.posted_at
                }
                response_data.status = insert_user_post_result.affectedRows > 0;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to insert a new post."
        }

        return response_data;
    }

    /* fetch posts and comments */
    fetchPostComments = async () => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let fetch_post_comment_query = mysql.format(`
                SELECT 
                    posts.id, posts.user_id as post_user_id, posts.post, CONCAT(users.first_name, " ", users.last_name) as posted_by, DATE_FORMAT(posts.created_at, '%M %D %Y - %h:%m %p') as posted_at,
                        (
                            SELECT 
                                JSON_OBJECTAGG(comments.id, JSON_OBJECT("comment_id", comments.id, "comment_user_id", comments.user_id, "comment", comments.comment, "commented_by", CONCAT(users.first_name, " ", users.last_name), "commented_at", DATE_FORMAT(comments.created_at, '%M %D %Y - %h:%m %p')))
                            FROM comments
                            INNER JOIN users ON users.id = comments.user_id
                            WHERE comments.post_id = posts.id
                        ) as comments
                    FROM posts
                INNER JOIN users ON users.id = posts.user_id;`);
            let fetch_post_comment_result = await this.query(fetch_post_comment_query);

            response_data.result = fetch_post_comment_result;
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to fetch posts and comments."
        }

        return response_data;
    }

    /* delete post */
    deletePost = async (post_id) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            if(post_id){
                let delete_post_comment_query = mysql.format(`DELETE FROM posts WHERE id = ?;`, post_id);
                let delete_post_comment_result = await this.query(delete_post_comment_query);
    
                response_data.result = delete_post_comment_result;
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to delete a post."
        }

        return response_data;
    }

    /* update post */
    updatePost = async (params) => {
        let response_data = { status: false, result: {}, error: null};

        try{
            let { edited_post, post_id } = params;

            if(post_id){
                let update_post_query = mysql.format(`UPDATE posts SET post = ?, updated_at = NOW() WHERE id = ?;`, [edited_post, post_id]);
                let update_post_result = await this.query(update_post_query);
    
                response_data.result = update_post_result;
                response_data.status = true;
            }
        }
        catch(error){
            response_data.error = error;
            response_data.message = "Failed to update a post."
        }

        return response_data;
    }
}

module.exports = new PostsModel;