const PostsModel = require('../models/posts.model');

class DashboardController {
    constructor(){
    }

    index = async function(req, res){
        let response_data = {status: false, error: null, message: ""}

        try{
            let fetch_posts_comments = await PostsModel.fetchPostComments();
            let user_id = req.session.user_id;

            response_data.result = {
                post_data: fetch_posts_comments.result
            }
            
            res.render('../../views/dashboard/index', {fetchPostsComments: fetch_posts_comments.result, session_user_id: user_id});
        }
        catch(error){
            response_data.error = error;
        }
        
        res.json(response_data);
    }
    
}

module.exports = new DashboardController;