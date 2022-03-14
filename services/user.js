const { User } = require('../models');

const registerUser = async (displayName, email, password, image) => (
  User.create({ displayName, email, password, image })
);

module.exports = {
  registerUser,
};
