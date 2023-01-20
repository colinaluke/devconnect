const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const Like = sequelize.define('like', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        }
    }
});

Like.sync({ alter: true });
module.exports = { Like };

