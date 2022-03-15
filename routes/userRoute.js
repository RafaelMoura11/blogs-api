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

userRouter.get('/:id', auth.validateJWT, controller.getById);
userRouter.get('/', auth.validateJWT, controller.getAll);

userRouter.delete('/me', auth.validateJWT, controller.deleteUser);

module.exports = userRouter;
