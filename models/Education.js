const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const Education = sequelize.define('education', {
    school: {
      type: DataTypes.STRING,
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fieldofstudy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to: {
      type: DataTypes.DATE
    },
    current: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING
    },
    profileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profile',
        key: 'id'
      }
    }
  });

  Education.sync({ alter: true });
  module.exports = { Education };