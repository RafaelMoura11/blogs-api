const service = require('../services/posts');

const createPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const { data: { email } } = req.user;
  const postedPost = await service.createPost(title, categoryIds, content, email);
  return res.status(201).json(postedPost);
};

const getAllPosts = async (_req, res) => {
  const result = await service.getAllPosts();
  return res.status(200).json(result);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.getPostById(id);
  if (!result.length) return next({ status: 404, message: 'Post does not exist' });
  return res.status(200).json(result[0]);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await service.updatePost(id, title, content);
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await service.deletePost(id);
  return res.status(204).end();
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
