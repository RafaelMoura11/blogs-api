const service = require('../services/categories');

const createCategory = async (req, res) => {
  const { name } = req.body;
  await service.createCategory(name);
  const createdCategory = await service.getCategoryByName(name);
  return res.status(201).json(createdCategory);
};

module.exports = {
  createCategory,
};
