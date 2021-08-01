const mongoose = require('mongoose');
// const User = require('./UsersModel');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
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

},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


//===== Virtual Populate to get the Reviews from the Review (Child referencing)
// ProfileSchema.virtual('user', {
//     ref: 'User',
//     foreignField: '_id', //===The name in the Child Model
//     localField: 'user' //==== The name in this Model (parent)
// });

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
