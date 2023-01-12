const {DataTypes } = require('sequelize');
const sequelize = require("../../db")
const Type = require("./Type");
const Pokemon = require("./Pokemon");

const PokemonsTypes = sequelize.define('PokemonsTypes', {
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
},
    {timestamps: false,tableName:"pokemons_types"}
    );

sequelize.sync();

module.exports=PokemonsTypes