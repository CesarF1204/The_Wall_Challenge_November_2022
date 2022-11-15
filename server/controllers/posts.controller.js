const PostsModel = require('../models/posts.model');
const GlobalHelper = require('../helpers/global.helper')

class PostsController {
    constructor(){
    }

    /* insert post process */
    postProcess = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(['post'], [], req);

            if(validate_fields.status){
                let user_id = req.session.user_id;
                let {post} = validate_fields.result.sanitized_data;

                response_data = await PostsModel.insertNewPost({user_id, post});
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

    /* delete post process */
    deletePostProcess = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(['post_id'], [], req);

            if(validate_fields.status){
                let {post_id} = validate_fields.result.sanitized_data;

                response_data = await PostsModel.deletePost(post_id);
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

    /* edit post form */
    editPostForm(req, res){
        let url = req.url;
        let post_id = url.substring(url.lastIndexOf('/') + 1);

        res.render('../../views/dashboard/edit_post', {post_id})
    }

    /* update post process */
    updatePostProcess = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let globalHelper = new GlobalHelper();
            let validate_fields = globalHelper.validateFields(['edited_post', 'post_id'], [], req);

            if(validate_fields.status){
                let {edited_post, post_id} = validate_fields.result.sanitized_data;

                response_data = await PostsModel.updatePost({edited_post, post_id});
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

module.exports = new PostsController;