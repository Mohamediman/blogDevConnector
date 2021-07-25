const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    name: String,
    avatar: String,
    likes: [
        {
            user: { 
                type: mongoose.Schema.ObjectId,
                ref: 'user'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//===== Virtual Populate to get the Reviews from the Review (Child referencing)
PostSchema.virtual('reviews', {
    ref: 'Reviews',
    foreignField: 'post', //===The name in the Child Model
    localField: '_id' //==== The name in this Model (parent)
});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
