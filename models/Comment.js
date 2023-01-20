const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const Comment = sequelize.define('comment', {
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
    postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
    }
});

Comment.sync({ alter: true });
module.exports = { Comment };

