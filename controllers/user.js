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

const getById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return next({ status: 404, message: 'User does not exist' });
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { data: { email } } = req.user;
  const { dataValues: { id } } = await service.findUserByEmail(email);
  await service.deleteUser(id);
  return res.status(204).end();
};

module.exports = {
  registerUser,
  getAll,
  getById,
  deleteUser,
};
