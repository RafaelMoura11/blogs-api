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

postsRouter.get('/:id', auth.validateJWT, controller.getPostById);
  
postsRouter.get('/', auth.validateJWT, controller.getAllPosts);

postsRouter.put('/:id',
  auth.validateJWT,
  auth.checkIfUserHasAuth,
  auth.checkIfCategoriesFieldIsEmpty,
  auth.titleValidation,
  auth.contentValidation,
  controller.updatePost);

postsRouter.delete('/:id', auth.validateJWT, auth.checkIfUserHasAuth, controller.deletePost);
  
module.exports = postsRouter;
