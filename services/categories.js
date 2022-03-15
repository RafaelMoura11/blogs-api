const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });

const getCategoryByName = (name) => Category.findOne({ where: { name } });

const getAllCategories = () => Category.findAll();

module.exports = {
  createCategory,
  getCategoryByName,
  getAllCategories,
};
