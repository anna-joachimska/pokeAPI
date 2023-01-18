const pokemonRepository = require("../repositories/pokemonRepository");
const {ValidationError} = require("../errors/customError");

const getPokemonDetails = (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    return pokemonRepository.getPokemonDetails(id);
}

const getAllPokemons = (page, size, sortBy, direction) => pokemonRepository.getAllPokemons(page, size, sortBy, direction);

const createPokemon = async (body) => {
    const pokemonData = {
        name: body.name,
        hp: body.hp,
        attack: body.attack,
        defense: body.defense,
        generation: body.generation,
        types: body.types,
        abilities: body.abilities
    }
    if (!pokemonData.name || !pokemonData.hp || !pokemonData.attack || !pokemonData.defense
        || !pokemonData.generation || !pokemonData.types || !pokemonData.abilities){
        throw new ValidationError('Missing data to create pokemon')
    }
    if(pokemonData.name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    if(pokemonData.types.length>2){
        throw new ValidationError("Pokemon may have max 2 types")
    }
    if(pokemonData.abilities.length>3){
        throw new ValidationError("Pokemon may have max 3 abilities")
    }
    const firstTypeId = pokemonData.types[0]
    const firstAbilityId = pokemonData.abilities[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    return pokemonRepository.createPokemon(pokemonData);
    };

const updatePokemon = (id, body) => {
    const pokemonData = {
        name:body.name,
        hp: body.hp,
        attack: body.attack,
        defense: body.defense,
        generation: body.generation
    }
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    if(pokemonData.name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    return pokemonRepository.updatePokemon(pokemonData);
    };

const deletePokemon = (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    return pokemonRepository.deletePokemon(id);
}

const addTypeToPokemon = (pokemonId,body) => {
    const types = body.types
    const firstTypeId = types[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    if(types.length>2){
        throw new ValidationError("Pokemon may have max 2 types")
    }
    return pokemonRepository.addTypeToPokemon(pokemonId,types);
}

const addAbilityToPokemon = (pokemonId,body) => {
    const abilities = body.abilities
    const firstAbilityId = abilities[0];
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    if(abilities.length>3){
        throw new ValidationError("Pokemon may have max 2 abilities")
    }
    return pokemonRepository.addAbilityToPokemon(pokemonId,abilities);
}

const deleteTypeFromPokemon = (pokemonId,body) =>{
    const types = body.types
    const firstTypeId = types[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    return pokemonRepository.deleteTypeFromPokemon(pokemonId,types);
}

const deleteAbilityFromPokemon = (pokemonId,body) =>{
    const abilities = body.abilities
    const firstAbilityId = abilities[0];
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    return pokemonRepository.deleteAbilityFromPokemon(pokemonId,abilities);
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