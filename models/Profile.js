const { sequelize } = require('../database/conn');
const { DataTypes} = require('sequelize');

const Profile = sequelize.define('profiles', {
    user: {
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
        allowNull: false,
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    bio: {
        type: DataTypes.STRING
    },
    githubusername: {
        type: DataTypes.STRING
    },
    experience: [
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING
            },
            from: {
                type: DataTypes.DATE,
                allowNull: false,
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
            }
        }
    ],
    education: [
        {
            school: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            degree: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fieldofstudy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            from: {
                type: DataTypes.DATE,
                allowNull: false,
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
            }
        }
    ],
    social: {
        youtube: {
            type: DataTypes.STRING,
        },
        twitter: {
            type: DataTypes.STRING,
        },
        facebook: {
            type: DataTypes.STRING,
        },
        linkedin: {
            type: DataTypes.STRING,
        },
        instagram: {
            type: DataTypes.STRING,
        }
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now')
    }
});

Profile.sync({ alter: true });

module.exports = { Profile };