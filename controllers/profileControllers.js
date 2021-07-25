const { body, validationResult } = require('express-validator');
const { findOneAndUpdate } = require('./../models/ProfileModel');
const Profile = require('./../models/ProfileModel');
const User = require('./../models/UsersModel');

//==== Get the current Login User =====
exports.getMe = async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            if(!profile) throw new Error('No Profile for this User');

            res.status(200).json({
                status: 'Success',
                data: {
                    profile
                }
            })

        } catch (err) {
            console.error(err);
            res.status(500).json({
                msg: "Internal Server Error"
            })
        }
}

//===Create a new profile or update if it already exists
exports.createProfile = async (req, res) => {
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubUsername,
        youtube,
        twitter,
        facebook,
        instagram,
        linkedIn
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubUsername) profileFields.githubUsername = githubUsername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    
    try {
        let profile = await Profile.findOne({ user: req.user.id })

    if(profile){
        //====if the profile already exists, update it
        profile = await Profile.findOneAndUpdate({user: req.user.id }, 
                                        {$set: profileFields }, 
                                        { new: true });
        return res.status(200).json({
            status: 'Success',
            data: {
                profile
            }
        })
    };
    ///==== If not found, create a new profile for the user
    profile = new Profile(profileFields);
    await profile.save();

    res.status(201).json({
        status: 'success',
        data: {
            profile
        }
    })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "internal server Error"
        })
    }
}

//====Get all the profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        if(!profiles) throw new Erorr();
        res.status(200).json({
            status: 'success',
            results: profiles.length,
            data: {
                profiles
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'internal Server Error))'
        })
    }

}

//===Get profile by UserId
exports.getProfileByUserId = async(req, res) => {
    const userId = req.params.userId;
    try {
        const profile = await Profile.findOne({ user: userId });

    if(!profile) throw new Error('No user found')

    res.status(200).json({
        status: 'success',
        data: {
            profile
        }
    })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal server Error'
        })
    }
}

//Delete User and his/her Profile
exports.deleteUserAndProfile = async(req, res) => {
    try {
       await Profile.findOneAndRemove({user: req.user.id})
       await User.findOneAndRemove({ _id: req.user.id});

       res.status(204).json({
           status: 'Success',
           msg: "content Removed"
       })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

//===Add profile Experiences PUT request @ api/v1/profile/experience 
exports.addExperience = async (req, res) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newEx =  {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id })

        profile.experience.unshift(newEx);
        await profile.save();

        res.status(202).json({
            status: 'Success',
            data: {
                profile
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "internal server Error"
        })
    }
}

//======= Remove experience 
exports.removeExperience = async (req, res) => {
    try {
        //==Get the profile
        const profile = await Profile.findOne({ user: req.user.id });
        if(!profile) throw new Error("No profile for this User")

        //===Check the experience to be removed
        const indexOfRemoveExp = profile.experience.map(exp => exp.id).indexOf(req.params.expID);

        //===splice the index to be removed
        profile.experience.splice(indexOfRemoveExp, 1);

        //===Save the profile after removing the experience
        await profile.save();

        res.status(200).json({
            status: 'success',
            data: {
                profile
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}

//===Add Education to profile POST api/v1/profile/education
exports.addEducation = async (req, res) => {
    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = req.body;
    
    //=== Build the education obj
    const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    };

    try {
        //===Get the profile to be update
        const profile = await Profile.findOne({ user: req.user.id })

        if(!profile) throw new Error('No profile found for this user');

        //==== add the education to the profile
        profile.education.unshift(newEdu);

        //=== Save the profile after adding the education
        await profile.save();

        res.status(200).json({
            status: 'success',
            data: {
                profile
            }
        })
        
    } catch (err) {
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }

}

///===Remove Education from profile => delete api/v1/profile/education/:eduID
exports.removeEducation = async (req, res) => {
    try {
        //==Get the profile
        const profile = await Profile.findOne({ user: req.user.id });
        if(!profile) throw new Error("No profile for this User")

        //===Check the experience to be removed
        const indexToRemoveEd = profile.education.map(edu => edu.id).indexOf(req.params.eduID);

        //===splice the index to be removed
        profile.education.splice(indexToRemoveEd, 1);

        //===Save the profile after removing the experience
        await profile.save();

        res.status(200).json({
            status: 'success',
            data: {
                profile
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
}