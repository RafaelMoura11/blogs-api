const optionalParams = {
  timestamps: false,
  tableName: 'PostsCategories',
};

const categoryObject = (UserBook) => (
  {
    as: 'categories',
    through: UserBook,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  }
);

const postObject = (UserBook) => (
  {
    as: 'blogposts',
    through: UserBook,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  }
);

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
  }, optionalParams);

  // Associação inspirada no repositório do Caio Lima

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, postObject(PostCategory));

    models.Category.belongsToMany(models.BlogPost, categoryObject(PostCategory));
  };

  return PostCategory;
};