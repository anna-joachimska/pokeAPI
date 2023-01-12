const {DataTypes} = require("sequelize");
const sequelize = require("../../db")

const Type = sequelize.define("Type", {
        name: {type:DataTypes.STRING, allowNull:false},
    },
    {timestamps: false,
    tableName:"Types"}
);
sequelize.sync();

module.exports=Type;