const mongoose = require('mongoose');
// const User = require('./UsersModel');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
       required: [true, 'A Profile must belong to a user']
    },
    company: String,
    website: String,
    location: String,
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: String,
    githubUsername: String,
    experience: [
        {
         title: {
            type: String,
            required: true
        },
         company: {
             type: String,
             required: true
         },
         location: String,
         from: Date,
         to: Date,
         current: {
             type: Boolean,
             default: false
         },
         description: String
        }
    ],
    education: [{
        school: {
            type: String,
            requied: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldOfStudy: {
            type: String,
            required: true
        },
        from: Date,
        to: Date,
        current: {
            type: Boolean,
            default: false
        },
        description: String
    }],
    social: {
        youtube: String,
        twitter: String,
        facebook: String,
        instagram: String,
        linkedIn: String
    },
    date: {
        type: String,
        default: Date.now
    }

});


const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
