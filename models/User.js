const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now')
    },
  }, {
    indexes: [{
        unique: true,
        fields: ['email']
    }]
  });

  User.sync({ alter: true });
  module.exports = { User };