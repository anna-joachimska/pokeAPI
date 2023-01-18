const pokemonRepository = require("../repositories/pokemonRepository");
const {ValidationError, NotFoundError} = require("../errors/customError");
const {Pokemon, Type, Ability} = require("../models");

const getPokemonDetails = async (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    const data = await pokemonRepository.getPokemonDetails(id);
    if (!data) {
        throw new ValidationError('Pokemon not found');
    }
    return data
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
    const checkIfExists = await Pokemon.findOne({where:{name:pokemonData.name}})
    if (checkIfExists) {
        throw new ValidationError("Pokemon already exists in database")
    }
    const firstType = await Type.findOne({where: {id: pokemonData.types[0]}});
    if (!firstType) {
        throw new NotFoundError("Type not found");
    }
    const firstAbility = await Ability.findOne({where:{id:pokemonData.abilities[0]}});
    if (!firstAbility) {
        throw new NotFoundError("Ability not found");
    }
    const secondTypeId = pokemonData.types[1]
    const secondAbilityId = pokemonData.abilities[1]
    const thirdAbilityId = pokemonData.abilities[2]
    if (secondTypeId){
        const secondType = await Type.findOne({where: {id: pokemonData.types[1]}});
        if (!secondType) {
            throw new ValidationError("Second type not found")
        }
    }
    if(secondAbilityId) {
        const secondAbility = await Ability.findOne({where:{id:pokemonData.abilities[1]}});
        if (!secondAbility) {
            throw new ValidationError("Second ability not found")
        }
    }
    if(thirdAbilityId) {
        const thirdAbility = await Ability.findOne({where:{id:pokemonData.abilities[2]}});
        if (!thirdAbility) {
            throw new ValidationError("Third ability not found")
        }
    }
    return pokemonRepository.createPokemon(pokemonData);
    };

const updatePokemon = async (id, body) => {
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
    const pokemon = await Pokemon.findOne({where:{id:id}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found");
    };
    return pokemonRepository.updatePokemon(id, pokemon, pokemonData);
    };

const deletePokemon = async (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    const pokemon = await Pokemon.findOne({where:{id:id}})
    if (!pokemon) {
        throw new NotFoundError('Pokemon not found');
    }
    return pokemonRepository.deletePokemon(pokemon);
}

const addTypeToPokemon = async (pokemonId,body) => {
    const types = body.types
    const firstTypeId = types[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    if(types.length>2){
        throw new ValidationError("Pokemon may have max 2 types")
    }
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found");
    }
    const firstType = await Type.findOne({where:{id:types[0]}});
    if (!firstType) {
        throw new NotFoundError("Type not found");
    }
    const secondTypeId = types[1];
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: types[1]}});
        if (!secondType) {
            throw new NotFoundError("Second type not found");
        }
    }
    return pokemonRepository.addTypeToPokemon(pokemonId, pokemon,types);
}

const addAbilityToPokemon = async (pokemonId,body) => {
    const abilities = body.abilities
    const firstAbilityId = abilities[0];
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    if(abilities.length>3){
        throw new ValidationError("Pokemon may have max 2 abilities")
    }
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found")
    }
    const secondAbilityId = abilities[1];
    const thirdAbilityId = abilities[2];
    const firstAbility = await Ability.findOne({where:{id:abilities[0]}});
    if (!firstAbility) {
        throw new NotFoundError("Ability not found")
    }
    if (secondAbilityId) {
        const secondAbility = await Ability.findOne({where: {id: abilities[1]}});
        if (!secondAbility) {
            throw new NotFoundError("Second ability not found")
        }
    }
    if (thirdAbilityId) {
        const thirdAbility = await Ability.findOne({where: {id: abilities[2]}});
        if (!thirdAbility) {
            throw new NotFoundError("Third ability not found")
        }
    }
    return pokemonRepository.addAbilityToPokemon(pokemonId,pokemon,abilities);
}

const deleteTypeFromPokemon = async (pokemonId,body) =>{
    const types = body.types
    const firstTypeId = types[0];
    if (!firstTypeId) {
        throw new ValidationError("You must pass pokemon type")
    }
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found")
    }
    return pokemonRepository.deleteTypeFromPokemon(pokemonId,types);
}

const deleteAbilityFromPokemon = async (pokemonId,body) =>{
    const abilities = body.abilities
    const firstAbilityId = abilities[0];
    if (!firstAbilityId) {
        throw new ValidationError("You must pass pokemon ability")
    }
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError('Pokemon not found');
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