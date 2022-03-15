const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/posts');

const postsRouter = express.Router();

postsRouter.post('/',
  auth.validateJWT,
  auth.titleValidation,
  auth.contentValidation,
  auth.categoryIdsValidation,
  auth.checkIfCategoriesExist,
  controller.createPost);

postsRouter.get('/', auth.validateJWT, controller.getAllPosts);

module.exports = postsRouter;
