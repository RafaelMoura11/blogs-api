// regex retirado do site: https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const postService = require('../services/posts');
require('dotenv').config();

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const { User, Category } = require('../models');

const displayNameValidation = async (req, _res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return next(
    { status: 400, message: '"displayName" length must be at least 8 characters long' },
    ); 
  }
  next();
};

const emailValidation = async (req, _res, next) => {
  const { email } = req.body;

  if (typeof (email) !== 'string') return next({ status: 400, message: '"email" is required' });

  if (!email.length) return next({ status: 400, message: '"email" is not allowed to be empty' });

  if (!emailRegex.test(email)) {
    return next({ status: 400, message: '"email" must be a valid email' });
  }
  
  next();
};

const checkIfUserAlreadyExists = async (req, _res, next) => {
  const { email } = req.body;
  const isUserAlreadyRegistered = await User.findOne({ where: { email } });

  if (isUserAlreadyRegistered) return next({ status: 409, message: 'User already registered' });
  next();
};

const passwordValidation = async (req, _res, next) => {
  const { password } = req.body;

  if (typeof (password) !== 'string') {
    return next({ status: 400, message: '"password" is required' });
  }

  if (!password.length) {
    return next({ status: 400, message: '"password" is not allowed to be empty' });
  }

  if (password.length !== 6) {
    return next({ status: 400, message: '"password" length must be 6 characters long' });
  }
  next();
};

const checkLoginData = async (req, _res, next) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ where: { email, password } });
  if (!userExists) return next({ status: 400, message: 'Invalid fields' });
  return next();
};

const validateJWT = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ status: 401, message: 'Token not found' });
  try {
    const userEmail = jwt.verify(token, process.env.SECRET);
    req.user = userEmail;
    return next();
  } catch (e) {
    return next({ status: 401, message: 'Expired or invalid token' });
  }
};

const checkIfUserHasAuth = async (req, _res, next) => {
  const { id } = req.params;
  const { data: { email } } = req.user;
  const { dataValues: { id: userIdInTheRequest } } = await userService.findUserByEmail(email);
  const [post] = await postService.getPostById(id);
  if (!post) return next({ status: 404, message: 'Post does not exist' });
  if (post.dataValues.userId !== userIdInTheRequest) {
    return next({ status: 401, message: 'Unauthorized user' });
  }
  next();
};

const nameValidation = async (req, _res, next) => {
  const { name } = req.body;
  if (!name) return next({ status: 400, message: '"name" is required' });
  return next();
};

const titleValidation = async (req, _res, next) => {
  const { title } = req.body;
  if (!title) return next({ status: 400, message: '"title" is required' });
  return next();
};

const contentValidation = async (req, _res, next) => {
  const { content } = req.body;
  if (!content) return next({ status: 400, message: '"content" is required' });
  return next();
};

const categoryIdsValidation = async (req, _res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return next({ status: 400, message: '"categoryIds" is required' });
  return next();
};

const checkIfCategoriesExist = async (req, _res, next) => {
  const { categoryIds } = req.body;
    const promises = categoryIds.map((id) => Category.findOne({ where: { id } }));
    return Promise.all(promises)
    .then((arrayOfResponses) => (
      arrayOfResponses.includes(null)
      ? next({ status: 400, message: '"categoryIds" not found' }) : next()));
};

const checkIfCategoriesFieldIsEmpty = async (req, _res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) return next({ status: 400, message: 'Categories cannot be edited' });
  return next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  checkIfUserAlreadyExists,
  checkLoginData,
  validateJWT,
  nameValidation,
  titleValidation,
  contentValidation,
  categoryIdsValidation,
  checkIfCategoriesExist,
  checkIfUserHasAuth,
  checkIfCategoriesFieldIsEmpty,
};