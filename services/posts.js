const { BlogPost } = require('../models');

const currentDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const postPost = async (title, categoryIds, content) => {
  await BlogPost.create({ title,
    content,
    userId: 1,
    published: currentDate(),
    updated: currentDate() });

  const { id } = await BlogPost.findOne({ where: { title,
    content,
    userId: 1,
    published: currentDate(),
    updated: currentDate() } });
  
  return {
    id,
    userId: 1,
    title,
    content,
  };
};

module.exports = {
  postPost,
};
