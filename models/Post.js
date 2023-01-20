const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');
const {Comment} = require('./Comment')
const {Like} = require('./Like')

const Post = sequelize.define('post', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    avatar: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now')
    },
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    as: 'comment'
});

Post.hasMany(Like, {
    foreignKey: 'postId',
    as: 'like'
});

Post.sync({ alter: true });
module.exports = { Post };

