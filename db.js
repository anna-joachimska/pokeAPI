const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "mietek97",
    database:"pokemonsDB"
});

module.exports = pool;