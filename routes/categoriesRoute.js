const express = require('express');
const auth = require('../middleware/auth');
const controller = require('../controllers/categories');

const categoriesRouter = express.Router();

categoriesRouter.post('/', auth.validateJWT, auth.nameValidation, controller.createCategory);
categoriesRouter.get('/', auth.validateJWT, controller.getAllCategories);

module.exports = categoriesRouter;
