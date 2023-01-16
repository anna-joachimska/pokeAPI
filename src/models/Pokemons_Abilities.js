const {DataTypes } = require('sequelize');
const sequelize = require("../../db")
const Ability = require("./Ability");
const Pokemon = require("./Pokemon");

const PokemonsAbilities = sequelize.define('PokemonsAbilities', {
        PokemonId: {
            type: DataTypes.INTEGER,
            references: {
                model: Pokemon,
                key: 'id'
            }
        },
        AbilityId: {
            type: DataTypes.INTEGER,
            references: {
                model: Ability,
                key: 'id'
            }
        }
    },
    {timestamps: false,tableName:"pokemons_abilities"}
);

sequelize.sync();

module.exports=PokemonsAbilities;