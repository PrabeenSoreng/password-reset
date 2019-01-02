const express = require('express');
const forgotPwdController = require('../controllers/forgot-password');
const resetPwdController = require('../controllers/reset-password');
const loginController = require('../controllers/login');

const router = express.Router();

router.post('/forgot-password', forgotPwdController.forgotPassword);

router.post('/reset-password/:token', resetPwdController.resetPassword);

router.post('/login', loginController.login);

module.exports = router;