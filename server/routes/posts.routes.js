const express = require('express');
const PostRoute = express.Router();
const PostController = require('../controllers/posts.controller');

/* post */
PostRoute.post('/post_process', PostController.postProcess);

/* delete post */
PostRoute.post('/delete_post_process', PostController.deletePostProcess);

/* edit post */
PostRoute.get('/edit_post/:post_id', PostController.editPostForm);
PostRoute.post('/update_post', PostController.updatePostProcess);

module.exports = PostRoute;