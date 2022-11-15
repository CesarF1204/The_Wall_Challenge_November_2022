const express = require('express');
const CommentRoute = express.Router();
const CommentController = require('../controllers/comments.controller');

/* comment */
CommentRoute.post('/comment_process', CommentController.commentProcess);

/* delete comment */
CommentRoute.post('/delete_comment_process', CommentController.deleteCommentProcess);

/* edit comment */
CommentRoute.get('/edit_comment/:comment_id', CommentController.editCommentForm);
CommentRoute.post('/update_comment', CommentController.updateCommentProcess);

module.exports = CommentRoute;