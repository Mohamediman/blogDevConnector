const express = require('express');
const authControllers = require('../controllers/authControllers');
const postControllers = require('../controllers/postsControllers');

const router = express.Router();

//Get a post by Id and Delete post 
router
    .route('/:postID')
    .get(postControllers.getPost)
    .delete(postControllers.deletePost);

//====Like posts
router.put('/like/:postID', authControllers.auth, postControllers.likePost)

//==== Unlike post
router.put('/unlike/:postID', authControllers.auth, postControllers.unLikePost)

//===== Leave Comment on a post
router.post('/comment/:postID', authControllers.auth, postControllers.addComment)

//==== Delete Comment
router.delete('/comment/:postID/:commentId', authControllers.auth, postControllers.deleteComment)

router
    .route('/')
    .post(authControllers.auth, postControllers.addPost)
    .get(postControllers.getAllPosts);



module.exports = router;