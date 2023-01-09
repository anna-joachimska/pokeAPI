// const pool = require("../db")
// const typeQueries = require("../queries/typeQueries")
// const sequelize = require("../db");
// const {DataTypes} = require("sequelize");
const Pokemon = require('../models/Pokemon');
const {DataTypes} = require("sequelize");
const sequelize = require("../db")
// // function Type ({
// //                       name}) {
// //     this.name = name;
// // };
// //
// // Type.prototype.createType = async function() {
// //     try {
// //         const { rows } = await pool.query(typeQueries.createType, [this.name]);
// //         return rows;
// //     } catch (error) {
// //         throw error;
// //     }
// // };
// const Type = sequelize.define('Type', {
//     id: {allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
//     name: {type:DataTypes.STRING, allowNull:false},
//     });
//
// Type.belongsToMany(Pokemon);
//
// module.exports = Type;

// 'use strict';
// const {Model} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//     class Type extends Model {
//         static associate({Pokemon}) {
//             // define association here
//             this.belongsTo(Pokemon, {foreignKey: 'pokemonId', as: 'pokemons' })
//         }
//     };
//     Type.init({
//         id: {
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//             type: DataTypes.INTEGER
//         },
//         pokemonId: {
//             allowNull: false,
//             type: DataTypes.INTEGER
//         },
//         name: {
//             allowNull: false,
//             type: DataTypes.STRING
//         },
//     },{
//         sequelize,
//         //define table name
//         tableName: 'types',
//         modelName: 'Type',
//     });
//     return Type;
// };



const Type = sequelize.define("Type", {
        name: {type:DataTypes.STRING, allowNull:false},
    });
sequelize.sync();

module.exports=Type