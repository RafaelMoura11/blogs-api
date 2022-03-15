const jwt = require('jsonwebtoken');
const service = require('../services/user');
const { User } = require('../models');

const secret = 'meusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const registerUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await service.registerUser(displayName, email, password, image);

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);

  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const allUsers = await User.findAll();
  return res.status(200).json(allUsers);
};

module.exports = {
  registerUser,
  getAll,
};
