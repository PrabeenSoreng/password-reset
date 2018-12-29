const express = require('express');
const forgotPwdController = require('../controllers/forgot-password');
const resetPwdController = require('../controllers/reset-password');

const router = express.Router();

router.post('/forgot-password', forgotPwdController.forgotPassword);

router.post('/reset-password', resetPwdController.resetPassword);

module.exports = router;