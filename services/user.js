const { User } = require('../models');

const registerUser = async (displayName, email, password, image) => (
  User.create({ displayName, email, password, image })
);

const findUserByEmail = async (email) => (
  User.findOne({ where: { email } })
);

module.exports = {
  registerUser,
  findUserByEmail,
};
