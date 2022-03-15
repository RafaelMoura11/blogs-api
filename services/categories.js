const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });

const getCategoryByName = (name) => Category.findOne({ where: { name } });

module.exports = {
  createCategory,
  getCategoryByName,
};
