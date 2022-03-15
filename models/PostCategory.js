const optionalParams = {
  timestamps: false,
  tableName: 'PostsCategories',
};

const categoryObject = (PostCategory) => (
  {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  }
);

const postObject = (PostCategory) => (
  {
    as: 'categories',
    through: PostCategory,
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