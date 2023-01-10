const pokemonQueries = require("../queries/pokemonQueries")
const {DataTypes } = require('sequelize');
const sequelize = require("../db")
const Type = require("../models/Type");
const PokemonsTypes = require("./Pokemons_Types");

const Pokemon = sequelize.define("Pokemon", {
        name: {type:DataTypes.STRING, allowNull:false, unique:true},
        hp : {type: DataTypes.INTEGER, allowNull: false},
        attack: {type: DataTypes.INTEGER, allowNull:false},
        defense: {type: DataTypes.INTEGER, allowNull: false},
        generation: {type: DataTypes.STRING, allowNull: false}
    },
    { timestamps: false,
    tableName: "pokemons"});

sequelize.sync();


module.exports=Pokemon
