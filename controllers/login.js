// const service = require('../services/login');
const jwt = require('jsonwebtoken');

const secret = 'meusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
