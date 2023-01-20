const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const Social = sequelize.define('social', {
    youtube: {
      type: DataTypes.STRING
    },
    twitter: {
      type: DataTypes.STRING
    },
    facebook: {
      type: DataTypes.STRING
    },
    linkedin: {
      type: DataTypes.STRING
    },
    instagram: {
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

  Social.sync({ alter: true });
  module.exports = { Social };