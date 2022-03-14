const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/login');

const loginRouter = express.Router();

loginRouter.post('/',
auth.emailValidation, auth.passwordValidation, auth.checkLoginData, controller.login);

module.exports = loginRouter;
