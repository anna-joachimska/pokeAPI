
const {DataTypes } = require('sequelize');
const sequelize = require("../db")
//
const Type = require("../models/Type");
// const Ability = require("../models/Ability");

// wersja 1
// const Pokemon = sequelize.define('Pokemon', {
//     name: {type:DataTypes.STRING, allowNull:false},
// //     // types : [],
// //     // abilities: [{Ability.belongsToMany(Pokemon, { through: 'Pokemons_Abilities' })}],
//     hp : {type: DataTypes.INTEGER, allowNull: false},
//     attack: {type: DataTypes.INTEGER, allowNull:false},
//     defense: {type: DataTypes.INTEGER, allowNull: false},
//     generation: {type: DataTypes.STRING, allowNull: false}
// });
// Pokemon.hasMany(Type);
//
// // // Pokemon.types = Pokemon.hasMany(Type);
// //
// module.exports = Pokemon;

// wersja 2
// const pool = require("../db")
// const pokemonQueries = require("../queries/pokemonQueries")
//
// function Pokemon ({
//                       name,
//                       types,
//                       hp,
//                       attack,
//                       defense,
//                       generation}) {
//     this.name = name;
//     this.types = types;
//     this.hp = hp;
//     this.attack = attack;
//     this.defense = defense;
//     this.generation = generation;
// };
//
// Pokemon.prototype.createPokemon = async function() {
//     try {
//         const { rows } = await pool.query(pokemonQueries.createPokemon, [this.name, this.types, this.hp, this.attack, this.defense, this.generation]);
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// };
// module.exports = Pokemon;

//wersja 3
// 'use strict';
// const {Model} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//     class Pokemon extends Model {
//         static associate({Type}) {
//             // define association here
//             this.hasMany(Type, {foreignKey: 'typeId',  as: 'types' })
//         }
//     };
//     Pokemon.init({
//             id: {
//                 allowNull: false,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 type: DataTypes.INTEGER
//             },
//             name:{
//                 type:DataTypes.STRING,
//                 allowNull: false,
//                 validate:{
//                     notNull: {msg: "Name is required"},
//                     notEmpty: {msg: "Name cannot be empty"},
//                 }
//             },
//             hp:{
//                 type:DataTypes.INTEGER,
//                 allowNull: false,
//                 unique: true,
//             },
//             attack:{
//                 type:DataTypes.INTEGER,
//                 allowNull: false,
//             },
//             defense:{
//                 type:DataTypes.INTEGER,
//                 allowNull: false,
//             },
//             generation:{
//                 type:DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             sequelize,
//             //define table name
//             tableName: 'pokemons',
//             modelName: 'Pokemon',
//         });
//     return Pokemon;
// };

//wersja 4

module.exports = (sequelize) => {
    const Pokemon = sequelize.define("Pokemon", {
        name: {type:DataTypes.STRING, allowNull:false},
        types: [{
                type: DataTypes.INTEGER,
                references: {
                    model: "types",
                    key: "id"
                }}],
        hp : {type: DataTypes.INTEGER, allowNull: false},
        attack: {type: DataTypes.INTEGER, allowNull:false},
        defense: {type: DataTypes.INTEGER, allowNull: false},
        generation: {type: DataTypes.STRING, allowNull: false}
    });
    Pokemon.hasMany(Type);
    sequelize.sync();
}