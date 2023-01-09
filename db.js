const Sequelize = require("sequelize");
// const Pool = require("pg").Pool;
require('dotenv').config();
// //
// const pool = new Pool({
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE,
//     client : null,
// });
//
// module.exports = pool;
//
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {host: 'localhost', dialect: 'postgres', logging: (...msg) => console.log(msg)});
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

module.exports = sequelize;