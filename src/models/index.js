const Type = require("./Type");
const Pokemon = require("./Pokemon");
const PokemonsTypes = require("./Pokemons_Types");
const Ability = require("./Ability");
const PokemonsAbilities = require("./Pokemons_Abilities");

Pokemon.belongsToMany(Type, {through: PokemonsTypes});
Type.belongsToMany(Pokemon, {through: PokemonsTypes});

Pokemon.belongsToMany(Ability, {through: PokemonsAbilities});
Ability.belongsToMany(Pokemon, {through: PokemonsAbilities});

module.exports = {Pokemon, Type, Ability}