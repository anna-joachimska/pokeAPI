const pokemonRepository = require("../repositories/pokemonRepository");

const getPokemonDetails = (id) => pokemonRepository.getPokemonDetails(id);

const getAllPokemons = (page, size, sortBy, direction) => pokemonRepository.getAllPokemons(page, size, sortBy, direction);

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
    createPokemon,
    updatePokemon,
    deletePokemon,
    addTypeToPokemon,
    addAbilityToPokemon,
    deleteTypeFromPokemon,
    deleteAbilityFromPokemon,
};