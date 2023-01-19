const Sequelize = require('sequelize');

const { DB_HOST, DB_NAME, DB_USER_NAME, DB_USER} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, '', {
    host: DB_HOST,
    dialect: DB_USER
});

async function connDb() {
    try {
        await sequelize.authenticate();
        return {
            message: 'Connection has been established successfully'
        };
    } catch(err) {
        return {
            message: 'Unable to connecto to the database',
            error: err
        };
    }
}

module.exports = {connDb, sequelize}