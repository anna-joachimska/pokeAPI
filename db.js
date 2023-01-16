const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {host: 'localhost', dialect: 'postgres', logging: (...msg) => console.log(msg)});
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

module.exports = sequelize;