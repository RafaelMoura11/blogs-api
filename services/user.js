const { User } = require('../models');

const registerUser = async (displayName, email, password, image) => (
  User.create({ displayName, email, password, image })
);

const findUserByEmail = async (email) => (
  User.findOne({ where: { email } })
);

const deleteUser = async (id) => (
  User.destroy({ where: { id } })
);

module.exports = {
  registerUser,
  findUserByEmail,
  deleteUser,
};
