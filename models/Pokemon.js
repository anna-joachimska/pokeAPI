const pool = require("../db")
const pokemonQueries = require("../queries/pokemonQueries")

function Pokemon ({
                   name,
                   hp,
                   attack,
                   defense,
                   generation}) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.generation = generation;
};

Pokemon.prototype.createPokemon = async function() {
    try {
        const { rows } = await pool.query(pokemonQueries.createPokemon, [this.name, this.hp, this.attack, this.defense, this.generation]);
        return rows;
    } catch (error) {
        throw error;
    }
};
module.exports = Pokemon;