const { BlogPost, PostCategory, User, Category } = require('../models');
const service = require('./user');

const currentDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const createPostCategory = async (categoryIds, postId) => {
  const promises = categoryIds.map((categoryId) => PostCategory.create({ postId, categoryId }));
  return Promise.all(promises);
};

const createPost = async (title, categoryIds, content, email) => {
  const { dataValues: { id: userId } } = await service.findUserByEmail(email);
  await BlogPost.create({ title,
    content,
    userId,
    published: currentDate(),
    updated: currentDate() });

  const { id } = await BlogPost.findOne({ where: { title,
    content,
    userId,
    published: currentDate(),
    updated: currentDate() } });

  await createPostCategory(categoryIds, id);
  
  return {
    id,
    userId,
    title,
    content,
  };
};

const getAllPosts = async () => {
  const post = await BlogPost.findAll({
    include: [
    { model: User, as: 'user' },

    { model: Category,
      as: 'categories',
    through: PostCategory,
    attributes: { exclude: ['PostCategory'] } },
  ],
    attributes: { exclude: ['UserId'] },
  });
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
};