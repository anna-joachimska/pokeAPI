const Type = require("./Type");
const Pokemon = require("./Pokemon");
const PokemonsTypes = require("./Pokemons_Types")
Pokemon.belongsToMany(Type, {through: PokemonsTypes});
Type.belongsToMany(Pokemon, {through: PokemonsTypes});

module.exports = {Pokemon, Type}