const pool = require("../db")
const typeQueries = require("../queries/typeQueries")

function Type ({
                      name}) {
    this.name = name;
};

Type.prototype.createType = async function() {
    try {
        const { rows } = await pool.query(typeQueries.createType, [this.name]);
        return rows;
    } catch (error) {
        throw error;
    }
};
module.exports = Type;