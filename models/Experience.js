const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const Experience = sequelize.define('experience', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
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

  Experience.sync({ alter: true });
  module.exports = { Experience };