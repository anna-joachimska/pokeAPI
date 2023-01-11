const {Pokemon, Type, Ability} = require("../models");
const PokemonsTypes = require("../models/Pokemons_Types");
const PokemonsAbilities = require("../models/Pokemons_Abilities");

const getPokemonDetails = async (id) => {
    const data = await Pokemon.findOne({where:{id:id}, include:[Type,Ability]})
    if (!data) return res.status(404).json('Pokemon not found');
    return data
}
const getAllPokemons = async (page, size) => {
    const data = await Pokemon.findAll({include:[Type,Ability],limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByIdASC = async(page, size) => {
    const data = await Pokemon.findAll({order: [['id', 'ASC']], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByIdDESC = async(page, size) => {
    const data = await Pokemon.findAll({order: [['id', 'DESC']], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByName = async (page,size) => {
    const data = await Pokemon.findAll({order: [['name', 'ASC']],limit:page, offset:size})
    return data
}
const getAllPokemonsWithTypes = async (page,size) => {
    const data = await Pokemon.findAll({order: [['id', 'ASC']],include:Type, limit:page, offset:size})
    return data
}
const getAllPokemonsWithAbilities = async (page, size) => {
    const data = await Pokemon.findAll({order: [['id', 'ASC']],include:Ability, limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByHpASC = async (page, size) => {
    const data = await Pokemon.findAll({order: [['hp', 'ASC']],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByHpDESC = async (page, size) => {
    const data = await Pokemon.findAll({order: [['hp', 'DESC']],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByAttackASC = async (page, size) => {
    const data = await Pokemon.findAll({order: [['attack', 'ASC']],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByAttackDESC = async (page, size) => {
    const data = await Pokemon.findAll({order: [['attack', 'DESC']],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByDefenseASC = async(page, size) => {
    const data = await Pokemon.findAll({order: [['defense', 'ASC']],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByDefenseDESC = async(page, size) => {
    const data = await Pokemon.findAll({order: [['defense', 'DESC']],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByGenerationASC = async(page, size) => {
    const data = await Pokemon.findAll({order: [['generation', 'ASC'],["id","ASC"]],include:[Type,Ability], limit:page, offset:size})
    return data
}
const getAllPokemonsSortedByGenerationDESC = async(page, size) => {
    const data = await Pokemon.findAll({order: [['generation', 'DESC'],["id","ASC"]],include:[Type,Ability], limit:page, offset:size})
    return data
}
const createPokemon = async (body) => {
    const firstTypeId = body.types[0]
    const firstAbilityId = body.abilities[0];
    if (!firstTypeId) {
        throw new Error("you must pass pokemon type")
    }
    if (!firstAbilityId) {
        throw new Error("you must pass pokemon ability")
    }
    const firstType = await Type.findOne({where: {id: body.types[0]}});
    if (!firstType) {
        return res.status(404).json({message:"Type not found"})
    }
    const firstAbility = await Ability.findOne({where:{id:body.abilities[0]}});
    if (!firstAbility) {
        return res.status(404).json({message:"Ability not found"})
    }
    const checkIfExists = await Pokemon.findOne({where:{name:body.name}})
    if (checkIfExists) {
        throw new Error("pokemon already exists in database")
    }
    const pokemon = await Pokemon.create({
        name: body.name,
        hp: body.hp,
        attack: body.attack,
        defense: body.defense,
        generation: body.generation,
    });
    const secondTypeId = body.types[1]
    const secondAbilityId = body.abilities[1]
    const thirdAbilityId = body.abilities[2]
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: body.types[1]}});
        if (!secondType) {
            return res.status(404).json({message:"Type not found"})
        }
        await pokemon.addType(secondType);
    }
    if(secondAbilityId) {
        const secondAbility = await Ability.findOne({where:{id:body.abilities[1]}});
        if (!secondAbility) {
            return res.status(404).json({message:"Ability not found"})
        }
        await pokemon.addAbility(secondAbility);
    }
    if (thirdAbilityId){
        const thirdAbility = await Ability.findOne({where:{id:body.abilities[2]}});
        if (!thirdAbility) {
            return res.status(404).json({message:"Ability not found"})
        }
        await pokemon.addAbility(thirdAbility);
    }
    await pokemon.addType(firstType);
    await pokemon.addAbility(firstAbility);
    return pokemon
}

const updatePokemon = async (id, body, res) => {
    const { name, hp, attack, defense, generation} = body;
    const pokemon = await Pokemon.findOne({where:{id:id}});
    if (!pokemon) return res.status(404).json('Pokemon not found');
    const data = await pokemon.update({
            name:name,
            hp:hp,
            attack:attack,
            defense:defense,
            generation:generation},{where:{id:id}})
    return data
}
const deletePokemon = async (id,res) => {
    const pokemon = await Pokemon.findOne({where:{id:id}})
    if (!pokemon) {
        return res.status(404).json({message: 'Pokemon not found'});
    }
    await pokemon.destroy();
}
const addTypeToPokemon=async (pokemonId,body,res) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        return res.status(404).json({message:"Pokemon not found"})
    }
    const firstTypeId = body.types[0];
    const secondTypeId = body.types[1];
    if (!firstTypeId) {
        throw new Error("you must pass pokemon type")
    }
    const firstType = await Type.findOne({where:{id:body.types[0]}});
    if (!firstType) {
        return res.status(404).json({message:"Type not found"})
    }
    await pokemon.addType(firstType)
    if (secondTypeId) {
        const secondType = await Type.findOne({where: {id: body.types[1]}});
        if (!secondType) {
            return res.status(404).json({message: "Type not found"})
        }
        await pokemon.addType(secondType)
    }
}
const addAbilityToPokemon=async (pokemonId,body,res) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) {
        return res.status(404).json({message:"Pokemon not found"})
    }
    const firstAbilityId = body.abilities[0];
    const secondAbilityId = body.abilities[1];
    const thirdAbilityId = body.abilities[2];
    if (!firstAbilityId) {
        throw new Error("you must pass pokemon ability")
    }
    const firstAbility = await Ability.findOne({where:{id:body.abilities[0]}});
    if (!firstAbility) {
        return res.status(404).json({message:"Ability not found"})
    }
    await pokemon.addAbility(firstAbility)
    if (secondAbilityId) {
        const secondAbility = await Ability.findOne({where: {id: body.abilities[1]}});
        if (!secondAbility) {
            return res.status(404).json({message: "Ability not found"})
        }
        await pokemon.addAbility(secondAbility)
    }
    if (thirdAbilityId) {
        const thirdAbility = await Ability.findOne({where: {id: body.abilities[2]}});
        if (!thirdAbility) {
            return res.status(404).json({message: "Ability not found"})
        }
        await pokemon.addAbility(thirdAbility)
    }
}
const deleteTypeFromPokemon = async (pokemonId,body,res) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) return res.status(404).json('Pokemon not found');
    const firstTypeId = body.types[0];
    const secondTypeId = body.types[1];
    await PokemonsTypes.destroy({where:{TypeId:firstTypeId, PokemonId:pokemonId}})
    if (secondTypeId) {
        await PokemonsTypes.destroy({where:{TypeId:secondTypeId, PokemonId:pokemonId}})
    }
}

const deleteAbilityFromPokemon = async (pokemonId,body,res) => {
    const pokemon = await Pokemon.findOne({where:{id:pokemonId}});
    if (!pokemon) return res.status(404).json('Pokemon not found');
    const firstAbilityId = body.abilities[0];
    const secondAbilityId = body.abilities[1];
    const thirdAbilityId = body.abilities[2];
    await PokemonsAbilities.destroy({where:{AbilityId:firstAbilityId, PokemonId:pokemonId}})
    if (secondAbilityId) {
        await PokemonsAbilities.destroy({where:{AbilityId:secondAbilityId, PokemonId:pokemonId}})
    }
    if (thirdAbilityId) {
        await PokemonsAbilities.destroy({where:{AbilityId:thirdAbilityId, PokemonId:pokemonId}})
    }
}
module.exports={
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
    deleteTypeFromPokemon,
    addAbilityToPokemon,
    deleteAbilityFromPokemon,
    }