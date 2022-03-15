const service = require('../services/posts');

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { data: { email } } = req.user;
  const postedPost = await service.createPost(title, categoryIds, content, email);
  return res.status(201).json(postedPost);
};

const getAllPosts = async (req, res) => {
  const result = await service.getAllPosts();
  return res.status(200).json(result);
};

module.exports = {
  createPost,
  getAllPosts,
};
