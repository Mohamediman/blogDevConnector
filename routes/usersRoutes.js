const express = require('express');
const authControllers = require('./../controllers/authControllers');

const router = express.Router();

//router.post('/signup', authControllers.signup);

//===> signup router 
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);




module.exports = router;





