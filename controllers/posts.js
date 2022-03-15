const service = require('../services/posts');

const postPost = async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const postedPost = await service.postPost(title, categoryIds, content);
  return res.status(201).json(postedPost);
};

module.exports = {
  postPost,
};
