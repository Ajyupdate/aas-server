const { DataTypes } = require('sequelize');
const sequelize = require('../src/connection/db'); // Adjust the path accordingly

const Post = sequelize.define('posts', {
  post_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  student_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  last_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category: {
    type: DataTypes.STRING(50),
  },
  attachment_url: {
    type: DataTypes.STRING,
  },
});

Post.belongsTo(require('./Students'), {
  foreignKey: 'student_id',
  targetKey: 'student_id',
  as: 'student', // alias to use when querying
});


module.exports = Post;
