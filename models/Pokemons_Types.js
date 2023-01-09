
const {DataTypes } = require('sequelize');
const sequelize = require("../db")
const Type = require("../models/Type");
const Pokemon = require("../models/Pokemon");

const PokemonsTypes = sequelize.define('Pokemons_Types', {
    PokemonId: {
        type: DataTypes.INTEGER,
        references: {
            model: Pokemon,
            key: 'id'
        }
    },
    TypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Type,
            key: 'id'
        }
    }
});

module.exports=PokemonsTypes