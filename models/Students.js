// models/Student.js

const { DataTypes } = require('sequelize');
const sequelize = require('../src/connection/db');

const student = sequelize.define('students', {
  student_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
        isIn: [['male', 'female']]
    }
},
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_picture_url: {
    type: DataTypes.STRING,
  },
  faculty: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  saved_posts:{
    type: DataTypes.ARRAY(DataTypes.CHAR),
    defaultValue: [],
  },
  school:{
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  matric_no:{
    type: DataTypes.BIGINT(255)
  }
});

module.exports = student;
