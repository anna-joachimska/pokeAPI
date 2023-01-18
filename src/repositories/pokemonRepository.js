const {Pokemon, Type, Ability} = require("../models");
const PokemonsTypes = require("../models/Pokemons_Types");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const {NotFoundError, ValidationError} = require("../errors/customError");

const getPokemonDetails = async (id) => {
    const data = await Pokemon.findOne({
        where:{id:id},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],
        })
    return data
}
const getAllPokemons = async (page, size, sortBy, direction) => {
    const data = await Pokemon.findAll({
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],
        order:[[sortBy || 'id', direction || 'ASC']],
        limit:size,
        offset:page})
    return data
}
const createPokemon = async (pokemonData) => {
    const pokemon = await Pokemon.create({
        name: pokemonData.name,
        hp: pokemonData.hp,
        attack: pokemonData.attack,
        defense: pokemonData.defense,
        generation: pokemonData.generation,
    });
    const firstType = await Type.findOne({where: {id: pokemonData.types[0]}});
    const firstAbility = await Ability.findOne({where:{id:pokemonData.abilities[0]}});
    const secondTypeId = pokemonData.types[1]
    const secondAbilityId = pokemonData.abilities[1]
    const thirdAbilityId = pokemonData.abilities[2]
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: pokemonData.types[1]}});
        await pokemon.addType(secondType);
    }
    if(secondAbilityId) {
        const secondAbility = await Ability.findOne({where:{id:pokemonData.abilities[1]}});
        await pokemon.addAbility(secondAbility);
    }
    if (thirdAbilityId){
        const thirdAbility = await Ability.findOne({where:{id:pokemonData.abilities[2]}});
        await pokemon.addAbility(thirdAbility);
    }
    await pokemon.addType(firstType);
    await pokemon.addAbility(firstAbility);
    const data = await Pokemon.findOne({
        where:{id:pokemon.id},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],})
    return data
}

const updatePokemon = async (id, pokemon, pokemonData) => {
    const data = await pokemon.update({
            name:pokemonData.name,
            hp:pokemonData.hp,
            attack:pokemonData.attack,
            defense:pokemonData.defense,
            generation:pokemonData.generation},
        {where:{id:id}})
    const updatedPokemon = await Pokemon.findOne({
        where:{id:id},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],})
    return {pokemon, updatedPokemon}
}

const deletePokemon = async (pokemon) => {
    await pokemon.destroy();
}

const addTypeToPokemon=async (pokemonId, pokemon,types) => {
    const secondTypeId = types[1];
    const firstType = await Type.findOne({where:{id:types[0]}});
    await pokemon.addType(firstType)
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: types[1]}});
        await pokemon.addType(secondType)
    }
    const updatedPokemon = await Pokemon.findOne({
        where:{id:pokemonId},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],})
    return updatedPokemon
}
const addAbilityToPokemon=async (pokemonId,pokemon, abilities) => {
    const secondAbilityId = abilities[1];
    const thirdAbilityId = abilities[2];
    const firstAbility = await Ability.findOne({where:{id:abilities[0]}});
    await pokemon.addAbility(firstAbility)
    if (secondAbilityId) {
        const secondAbility = await Ability.findOne({where: {id: abilities[1]}});
        await pokemon.addAbility(secondAbility)
    }
    if (thirdAbilityId) {
        const thirdAbility = await Ability.findOne({where: {id: abilities[2]}});
        await pokemon.addAbility(thirdAbility)
    }
    const updatedPokemon = await Pokemon.findOne({
        where:{id:pokemonId},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],})
    return updatedPokemon
}
const deleteTypeFromPokemon = async (pokemonId, types) => {
    const firstTypeId = types[0];
    const secondTypeId = types[1];
    await PokemonsTypes.destroy({where:{TypeId:firstTypeId, PokemonId:pokemonId}})
    if (secondTypeId) {
        await PokemonsTypes.destroy({where:{TypeId:secondTypeId, PokemonId:pokemonId}})
    }
    const updatedPokemon = await Pokemon.findOne({
        where:{id:pokemonId},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],})
    return updatedPokemon
}

const deleteAbilityFromPokemon = async (pokemonId, abilities) => {
    const firstAbilityId = abilities[0];
    const secondAbilityId = abilities[1];
    const thirdAbilityId = abilities[2];
    await PokemonsAbilities.destroy({where:{AbilityId:firstAbilityId, PokemonId:pokemonId}})
    if (secondAbilityId) {
        await PokemonsAbilities.destroy({where:{AbilityId:secondAbilityId, PokemonId:pokemonId}})
    }
    if (thirdAbilityId) {
        await PokemonsAbilities.destroy({where:{AbilityId:thirdAbilityId, PokemonId:pokemonId}})
    }
    const updatedPokemon = await Pokemon.findOne({
        where:{id:pokemonId},
        include: [
            {
                model: Type,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
            {
                model: Ability,
                attributes: ['id','name'],
                through: {
                    attributes: []
                }
            },
        ],})
    return updatedPokemon
}
module.exports={
    getPokemonDetails,
    getAllPokemons,
    createPokemon,
    updatePokemon,
    deletePokemon,
    addTypeToPokemon,
    deleteTypeFromPokemon,
    addAbilityToPokemon,
    deleteAbilityFromPokemon,
    }