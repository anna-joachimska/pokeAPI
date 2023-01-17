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
    if (!data) return res.status(404).json('Pokemon not found');
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
const createPokemon = async (name, hp, attack, defense, generation, types, abilities ) => {
    const checkIfExists = await Pokemon.findOne({where:{name:name}})
    if (checkIfExists) {
        throw new ValidationError("Pokemon already exists in database")
    }
    const firstType = await Type.findOne({where: {id: types[0]}});
    if (!firstType) {
        throw new NotFoundError("Type not found");
    }
    const firstAbility = await Ability.findOne({where:{id:abilities[0]}});
    if (!firstAbility) {
        throw new NotFoundError("Ability not found");
    }
    const pokemon = await Pokemon.create({
        name: name,
        hp: hp,
        attack: attack,
        defense: defense,
        generation: generation,
    });
    const secondTypeId = types[1]
    const secondAbilityId = abilities[1]
    const thirdAbilityId = abilities[2]
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: types[1]}});
        if (!secondType) {
            throw new NotFoundError("Type not found");
        }
        await pokemon.addType(secondType);
    }
    if(secondAbilityId) {
        const secondAbility = await Ability.findOne({where:{id:abilities[1]}});
        if (!secondAbility) {
            throw new NotFoundError("Ability not found");
        }
        await pokemon.addAbility(secondAbility);
    }
    if (thirdAbilityId){
        const thirdAbility = await Ability.findOne({where:{id:abilities[2]}});
        if (!thirdAbility) {
            throw new NotFoundError("Ability not found");
        }
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

const updatePokemon = async (id, name, hp, attack, defense, generation) => {
    const pokemon = await Pokemon.findOne({where:{id:id}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found");
    };
    const data = await pokemon.update({
            name:name,
            hp:hp,
            attack:attack,
            defense:defense,
            generation:generation},
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
    return updatedPokemon
}

const deletePokemon = async (id) => {
    const pokemon = await Pokemon.findOne({where:{id:id}})
    if (!pokemon) {
        throw new NotFoundError('Pokemon not found');
    }
    await pokemon.destroy();
}

const addTypeToPokemon=async (pokemonId,types) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found");
    }
    const secondTypeId = types[1];
    const firstType = await Type.findOne({where:{id:types[0]}});
    if (!firstType) {
        throw new NotFoundError("Type not found");
    }
    await pokemon.addType(firstType)
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: types[1]}});
        if (!secondType) {
            throw new NotFoundError("Type not found");
        }
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
const addAbilityToPokemon=async (pokemonId,abilities) => {
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
    await pokemon.addAbility(firstAbility)
    if (secondAbilityId) {
        const secondAbility = await Ability.findOne({where: {id: abilities[1]}});
        if (!secondAbility) {
            throw new NotFoundError("Ability not found")
        }
        await pokemon.addAbility(secondAbility)
    }
    if (thirdAbilityId) {
        const thirdAbility = await Ability.findOne({where: {id: abilities[2]}});
        if (!thirdAbility) {
            throw new NotFoundError("Ability not found")
        }
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
const deleteTypeFromPokemon = async (pokemonId,types) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError("Pokemon not found")
    }
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

const deleteAbilityFromPokemon = async (pokemonId,abilities) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        throw new NotFoundError('Pokemon not found');
    }
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