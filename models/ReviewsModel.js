const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },

    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    },

    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 4.0
    },
    name: String,
    avatar: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Reviews = mongoose.model('Reviews', CommentSchema);

module.exports = Reviews;