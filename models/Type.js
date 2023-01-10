const {DataTypes} = require("sequelize");
const sequelize = require("../db")
const PokemonsTypes = require("./Pokemons_Types");
const Pokemon = require("./Pokemon");

const Type = sequelize.define("Type", {
        name: {type:DataTypes.STRING, allowNull:false},
    },
    {timestamps: false,
    tableName:"Types"}
);
sequelize.sync();

module.exports=Type