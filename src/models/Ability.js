const {DataTypes} = require("sequelize");
const sequelize = require("../../db")


const Ability = sequelize.define("Ability", {
        name: {type:DataTypes.STRING, allowNull:false},
    },
    {timestamps: false,
        tableName:"abilities"}
);
sequelize.sync();

module.exports=Ability;