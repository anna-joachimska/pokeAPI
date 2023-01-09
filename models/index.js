const Type = require("./Type");
const Pokemon = require("./Pokemon");

Pokemon.belongsToMany(Type, {through: 'pokemons_types'});
Type.belongsToMany(Pokemon, {through: 'pokemons_types'});

