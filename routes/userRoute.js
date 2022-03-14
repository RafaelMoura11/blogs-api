const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/',
  auth.displayNameValidation,
  auth.emailValidation,
  auth.checkIfUserAlreadyExists,
  auth.passwordValidation,
  controller.registerUser);

module.exports = userRouter;
