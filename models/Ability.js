const pool = require("../db")
const abilityQueries = require("../queries/abilityQueries")

function Ability ({
                   name}) {
    this.name = name;
};

Ability.prototype.createAbility = async function() {
    try {
        const { rows } = await pool.query(abilityQueries.createAbility, [this.name]);
        return rows;
    } catch (error) {
        throw error;
    }
};
module.exports = Ability;