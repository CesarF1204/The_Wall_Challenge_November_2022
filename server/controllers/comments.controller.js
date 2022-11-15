const CommentsModel = require('../models/comments.model');
const GlobalHelper = require('../helpers/global.helper')


class CommentsController {
    constructor(){
    }

    /* insert comment process */
    commentProcess = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(['post_id', 'comment'], [], req);

            if(validate_fields.status){
                let user_id = req.session.user_id;
                let {post_id, comment} = validate_fields.result.sanitized_data;

                response_data = await CommentsModel.insertNewComment({user_id, post_id, comment});
            }
            else{
                response_data = validate_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    }

    /* delete comment process */
    deleteCommentProcess = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(['comment_id'], [], req);

            if(validate_fields.status){
                let {comment_id} = validate_fields.result.sanitized_data;

                response_data = await CommentsModel.deleteComment(comment_id);
            }
            else{
                response_data = validate_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    } 
    
    /* edit comment form */
    editCommentForm(req, res){
        let url = req.url;
        let comment_id = url.substring(url.lastIndexOf('/') + 1);

        res.render('../../views/dashboard/edit_comment', {comment_id})
    }

    /* update comment process */
    updateCommentProcess = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(['edited_comment', 'comment_id'], [], req);

            if(validate_fields.status){
                let {edited_comment, comment_id} = validate_fields.result.sanitized_data;

                response_data = await CommentsModel.updateComment({edited_comment, comment_id});
            }
            else{
                response_data = validate_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        res.json(response_data);
    } 
}

module.exports = new CommentsController;