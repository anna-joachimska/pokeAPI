const pokemonRepository = require("../repositories/pokemonRepository");

const getPokemonDetails = (id) => pokemonRepository.getPokemonDetails(id);

const getAllPokemons = (page, size) => pokemonRepository.getAllPokemons(page, size);

const getAllPokemonsSortedByIdASC = (page, size) => pokemonRepository.getAllPokemonsSortedByIdASC(page, size);

const getAllPokemonsSortedByIdDESC = (page, size) => pokemonRepository.getAllPokemonsSortedByIdDESC(page, size);

const getAllPokemonsSortedByName = (page, size) => pokemonRepository.getAllPokemonsSortedByName(page, size);

const getAllPokemonsWithTypes = (page, size) => pokemonRepository.getAllPokemonsWithTypes(page, size);

const getAllPokemonsWithAbilities = (page, size) => pokemonRepository.getAllPokemonsWithAbilities(page,size);

const getAllPokemonsSortedByHpASC = (page, size) => pokemonRepository.getAllPokemonsSortedByHpASC(page, size);

const getAllPokemonsSortedByHpDESC = (page, size) => pokemonRepository.getAllPokemonsSortedByHpDESC(page, size);

const getAllPokemonsSortedByAttackASC = (page, size) => pokemonRepository.getAllPokemonsSortedByAttackASC(page, size);

const getAllPokemonsSortedByAttackDESC = (page, size) => pokemonRepository.getAllPokemonsSortedByAttackDESC(page, size);

const getAllPokemonsSortedByDefenseASC = (page, size) => pokemonRepository.getAllPokemonsSortedByDefenseASC(page, size);

const getAllPokemonsSortedByDefenseDESC = (page, size) => pokemonRepository.getAllPokemonsSortedByDefenseDESC(page, size);

const getAllPokemonsSortedByGenerationASC = (page, size) => pokemonRepository.getAllPokemonsSortedByGenerationASC(page, size);

const getAllPokemonsSortedByGenerationDESC = (page, size) => pokemonRepository.getAllPokemonsSortedByGenerationDESC(page, size);

const createPokemon = async (body, res) => {
    return pokemonRepository.createPokemon(body, res);
    };
//
const updatePokemon = (id, body, res) => {
    return pokemonRepository.updatePokemon(id, body, res);
    };

const deletePokemon = (id,res) => pokemonRepository.deletePokemon(id,res);

const addTypeToPokemon = (pokemonId,body,res) => pokemonRepository.addTypeToPokemon(pokemonId,body,res);

const addAbilityToPokemon = (pokemonId,body,res) => pokemonRepository.addAbilityToPokemon(pokemonId,body,res);

const deleteTypeFromPokemon = (pokemonId,body,res) =>pokemonRepository.deleteTypeFromPokemon(pokemonId,body,res);

const deleteAbilityFromPokemon = (pokemonId,body,res) =>pokemonRepository.deleteAbilityFromPokemon(pokemonId,body,res);

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