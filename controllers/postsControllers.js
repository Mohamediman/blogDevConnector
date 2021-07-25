const Post = require('./../models/PostsModel');
const Review = require('./../models/ReviewsModel');


//====Create Posts
exports.addPost = async (req, res) => {
    try {
        const post = await Post.create({
            user: req.user.id,
            text: req.body.text
        });

        res.status(201).json({
            status: 'Success',
            data: {
                post
            }
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            msg: "internal Server Error"
        })
    }

}

//==== Get all the posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            status: 'Success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            msg: "internal Server Error"
        })
    }
}

//===== GET a post by the ID => GET api/v1/post/:PostID
exports.getPost = async (req, res) => {
    const id = req.params.postID
    try {
        //const post = await Post.findById(id);

        const post = await Post.findById(id).populate({ path: 'reviews'});

        if(!post) throw new Error("NO Post found with that id");

        res.status(200).json({
            status: 'Success',
            data: {
                post
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: "internal Server Error"
        })
    }
}

//==== Delete Post by ID
exports.deletePost = async (req, res) => {
    const id = req.params.postID
    try {
        await Post.findByIdAndRemove(id);

        res.status(204).json({
            status: 'Success'
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: "internal Server Error"
        })
    }
}

//===== Like Post
exports.likePost = async (req, res) => {
    try {
        //==== Get the post first
        const post = await Post.findById(req.params.postID);

        if(!post){
            return res.status(404).json({ msg: "No Post found for that Id"})
        }

        //=== check if the user already liked the post or not
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(304).json({
                status: 'Failed',
                msg: "You already liked this post and can't like multiple times for the same Post"
            })
         };
        
        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.status(200).json({
            status: 'Success',
            data: {
                data: post.likes
                }
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: "internal Server Error"
        })
    }
}

//===== UnLike Post
exports.unLikePost = async (req, res) => {
    try {
        //==== Get the post first
        const post = await Post.findById(req.params.postID);

        if(!post){
            return res.status(404).json({ msg: "No Post found for that Id"})
        }
        //=== check if the user already liked the post or not
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(304).json({
                status: 'Failed',
                msg: "You have not liked this post yet"
            })
         };
        
        //=== Get the index of the like to be removed
        const indexToRemove = post.likes.map(like => like.user.toString() === req.user.id);

        //== Remove the like from the post
        post.likes.splice(indexToRemove, 1);

        await post.save();

        res.status(200).json({
            status: 'Success',
            data: {
                data: post.likes
                }
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: "internal Server Error"
        })
    }
}

//=== Add comment on a post
exports.addComment = async (req, res) => {
    try {
        //====== get the post first
        const newComment = await Review.create({
            user: req.user,
            post: req.params.postID,
            text: req.body.text,
            rating: req.body.rating,
            name: req.body.name,
            avatar: req.body.avatar
        });

        res.status(201).json({
            status: 'Success',
            data: {
                newComment
            }
        })

        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                msg: "internal Server Error"
        })
    }
}

//==== Delete Comment
exports.deleteComment = async (req, res) => {
    try {
        //=== get the post
        const post = await Post.findById(req.params.postID);
        if(!post){
            return res.status(404).json({ msg: "No Post found for that Id"})
        }

        //=== Get the comment to be deleted
         await Review.findByIdAndRemove(req.params.commentId);

        await post.save();

         res.status(200).json({
             status: 'Success',
             data: {
                 post: post.reviews
             }
         })

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: "internal Server Error"
      })
    }
}