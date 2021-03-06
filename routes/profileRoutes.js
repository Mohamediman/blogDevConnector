const express = require('express');


const profileControllers = require('../controllers/profileControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

//====Get the login user's profile
router.get('/me', authControllers.auth, profileControllers.getMe)

//====Get the user's github profile
router.get('/github/:username', profileControllers.getGithubRepos)

// Get the profile by the provided userId
router.get('/user/:userId', profileControllers.getProfileByUserId);

//Add Experiences
router.put('/experience', authControllers.auth, profileControllers.addExperience)

//Delete Experience
router.delete('/experience/:expID', authControllers.auth, profileControllers.removeExperience)

//====Add Education
router.put('/education', authControllers.auth, profileControllers.addEducation)

//Delete Education
router.delete('/education/:eduID', authControllers.auth, profileControllers.removeEducation)

router
    .route('/')
    .post(authControllers.auth, profileControllers.createProfile)
    .get(profileControllers.getAllProfiles)
    .delete(authControllers.auth, profileControllers.deleteUserAndProfile);


module.exports = router;