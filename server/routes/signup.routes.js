const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup.controller');

router.get('/', signupController.getSignup);
router.post('/', signupController.submit);

module.exports = router;