const { DataTypes } = require('sequelize');
const sequelize = require('../src/connection/db'); 

const SchoolInfo = sequelize.define('school_info', {
  matric_no: {
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

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  school:{
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  outstanding_fee: {
    type: DataTypes.JSONB, 
    allowNull: true, 
  },
  
},{
    freezeTableName: true, // Prevent automatic pluralization of the table name
  });

SchoolInfo.belongsTo(require('./Students'), {
  foreignKey: 'matric_no',
  targetKey: 'matric_no',
  as: 'student', // alias to use when querying
});


module.exports = SchoolInfo;
