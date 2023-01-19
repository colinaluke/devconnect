const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequalize');

const User = sequelize.define('users', {
    name: {
        type: DataTypes.String,
        allowNull: false,
    },
    email: {
        type: DataTypes.String,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.String,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.String,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }
});

await User.sync({ alter: true });

module.exports = { User };