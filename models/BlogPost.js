const optionalParams = {
  timestamps: false,
  tableName: 'BlogPosts',
};

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: { type: sequelize.fn('now') },
    updated: { type: sequelize.fn('now') },
  }, optionalParams);

  BlogPost.associate = (models) => {
    BlogPost.hasMany(models.PostCategory, { foreignKey: 'postId', as: 'postscategories' });
  };

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', through: BlogPost, as: 'user' });
  };

  return BlogPost;
};