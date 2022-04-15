// const service = require('../services/login');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ data: { email } }, process.env.SECRET, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
