const pokemonRepository = require("../repositories/pokemonRepository");
const {ValidationError} = require("../errors/customError");

const getPokemonDetails = (id) => {
    if (!id) {
        throw new ValidationError("not valid id provided")
    }
    return pokemonRepository.getPokemonDetails(id);
}

const getAllPokemons = (page, size, sortBy, direction) => pokemonRepository.getAllPokemons(page, size, sortBy, direction);

const createPokemon = async (body) => {
    if (!body.name || !body.hp || !body.attack || !body.defense || !body.generation || !body.types || !body.abilities){
        throw new ValidationError('Missing data to create pokemon')
    }
    if(body.name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    if(body.types.length>2){
        throw new ValidationError("Pokemon may have max 2 types")
    }
    if(body.abilities.length>3){
        throw new ValidationError("Pokemon may have max 3 abilities")
    }
    const firstTypeId = body.types[0]
    const firstAbilityId = body.abilities[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    return pokemonRepository.createPokemon(body);
    };

const updatePokemon = (id, body) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    if(body.name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    return pokemonRepository.updatePokemon(id, body);
    };

const deletePokemon = (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    return pokemonRepository.deletePokemon(id);
}

const addTypeToPokemon = (pokemonId,body) => {
    const firstTypeId = body.types[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    if(body.types.length>2){
        throw new ValidationError("Pokemon may have max 2 types")
    }
    return pokemonRepository.addTypeToPokemon(pokemonId,body);
}

const addAbilityToPokemon = (pokemonId,body) => {
    const firstAbilityId = body.abilities[0];
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    if(body.abilities.length>3){
        throw new ValidationError("Pokemon may have max 2 abilities")
    }
    return pokemonRepository.addAbilityToPokemon(pokemonId,body);
}

const deleteTypeFromPokemon = (pokemonId,body) =>{
    const firstTypeId = body.types[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    return pokemonRepository.deleteTypeFromPokemon(pokemonId,body);
}

const deleteAbilityFromPokemon = (pokemonId,body) =>{
    const firstAbilityId = body.abilities[0];
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    return pokemonRepository.deleteAbilityFromPokemon(pokemonId,body);
}

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