const pokemonDal = require("../dataAccessLayer/pokemonDal");

const getPokemonDetails = (id) => pokemonDal.getPokemonDetails(id);

const getAllPokemons = (page, size) => pokemonDal.getAllPokemons(page, size);

const getAllPokemonsSortedByIdASC = (page, size) => pokemonDal.getAllPokemonsSortedByIdASC(page, size);

const getAllPokemonsSortedByIdDESC = (page, size) => pokemonDal.getAllPokemonsSortedByIdDESC(page, size);

const getAllPokemonsSortedByName = (page, size) => pokemonDal.getAllPokemonsSortedByName(page, size);

const getAllPokemonsWithTypes = (page, size) => pokemonDal.getAllPokemonsWithTypes(page, size);

const getAllPokemonsWithAbilities = (page, size) => pokemonDal.getAllPokemonsWithAbilities(page,size);

const getAllPokemonsSortedByHpASC = (page, size) => pokemonDal.getAllPokemonsSortedByHpASC(page, size);

const getAllPokemonsSortedByHpDESC = (page, size) => pokemonDal.getAllPokemonsSortedByHpDESC(page, size);

const getAllPokemonsSortedByAttackASC = (page, size) => pokemonDal.getAllPokemonsSortedByAttackASC(page, size);

const getAllPokemonsSortedByAttackDESC = (page, size) => pokemonDal.getAllPokemonsSortedByAttackDESC(page, size);

const getAllPokemonsSortedByDefenseASC = (page, size) => pokemonDal.getAllPokemonsSortedByDefenseASC(page, size);

const getAllPokemonsSortedByDefenseDESC = (page, size) => pokemonDal.getAllPokemonsSortedByDefenseDESC(page, size);

const getAllPokemonsSortedByGenerationASC = (page, size) => pokemonDal.getAllPokemonsSortedByGenerationASC(page, size);

const getAllPokemonsSortedByGenerationDESC = (page, size) => pokemonDal.getAllPokemonsSortedByGenerationDESC(page, size);

const createPokemon = async (body) => {
    return pokemonDal.createPokemon(body);
    };
//
const updatePokemon = (id, body, res) => {
    return pokemonDal.updatePokemon(id, body, res);
    };

const deletePokemon = (id,res) => pokemonDal.deletePokemon(id,res);

const addTypeToPokemon = (pokemonId,body,res) => pokemonDal.addTypeToPokemon(pokemonId,body,res);

const addAbilityToPokemon = (pokemonId,body,res) => pokemonDal.addAbilityToPokemon(pokemonId,body,res);

const deleteTypeFromPokemon = (pokemonId,body,res) =>pokemonDal.deleteTypeFromPokemon(pokemonId,body,res);

const deleteAbilityFromPokemon = (pokemonId,body,res) =>pokemonDal.deleteAbilityFromPokemon(pokemonId,body,res);

module.exports = {
    getPokemonDetails,
    getAllPokemons,
    getAllPokemonsSortedByIdASC,
    getAllPokemonsSortedByIdDESC,
    getAllPokemonsSortedByName,
    getAllPokemonsWithTypes,
    getAllPokemonsWithAbilities,
    getAllPokemonsSortedByHpASC,
    getAllPokemonsSortedByHpDESC,
    getAllPokemonsSortedByAttackASC,
    getAllPokemonsSortedByAttackDESC,
    getAllPokemonsSortedByDefenseASC,
    getAllPokemonsSortedByDefenseDESC,
    getAllPokemonsSortedByGenerationASC,
    getAllPokemonsSortedByGenerationDESC,
    createPokemon,
    updatePokemon,
    deletePokemon,
    addTypeToPokemon,
    addAbilityToPokemon,
    deleteTypeFromPokemon,
    deleteAbilityFromPokemon,
};