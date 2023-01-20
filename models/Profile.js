const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');
const {Experience} = require('./Experience')
const {Education} = require('./Education')
const {Social} = require('./Social')
const {User} = require('./User')

const Profile = sequelize.define('profile', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  company: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.STRING
  },
  githubusername: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('now')
  },
});

Profile.hasMany(User, {
  foreignKey: 'id',
  as: 'user'
});

Profile.hasMany(Experience, {
  foreignKey: 'profileId',
  as: 'experience'
});

Profile.hasMany(Education, {
  foreignKey: 'profileId',
  as: 'education'
});

Profile.hasMany(Social, {
  foreignKey: 'profileId',
  as: 'social'
});

Profile.sync({ alter: true });

module.exports = {Profile};