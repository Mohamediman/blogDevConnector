const express = require('express');
const authControllers = require('./../controllers/authControllers');

const router = express.Router();

router.get('/auth', authControllers.auth, authControllers.getLoginUser);

//===> signup router 
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);




module.exports = router;





