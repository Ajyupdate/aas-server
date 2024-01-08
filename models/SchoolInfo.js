const { DataTypes } = require('sequelize');
const sequelize = require('../src/connection/db'); 
const {Student} = require('./Students')
const SchoolInfo = sequelize.define('school_info', {
    student_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    matric_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    
    // defaultValue: DataTypes.UUIDV4,
    
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
  foreignKey: 'student_id',
  targetKey: 'student_id',
  as: 'student', // alias to use when querying
});


module.exports = SchoolInfo;
