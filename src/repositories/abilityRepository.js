const {Ability} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const {ValidationError, NotFoundError} = require("../errors/customError");

const getAbility = async (id) => {
    const data = await Ability.findOne({where:{id:id}})
    if (!data) {
        throw new NotFoundError('Ability not found');
    }
    return data
}
const getAllAbilities = async (page, size, sortBy, direction) => {
    const data = await Ability.findAll({order:[[sortBy || 'id', direction || 'ASC']],limit:size, offset:page})
    return data
}

const createAbility = async (name) => {
    const checkIfExists = await Ability.findOne({where:{name:name}})
    if (checkIfExists) {
        throw new ValidationError("Ability already exists in database")
    }
    const ability = await Ability.create({
        name: name,
    });
    return ability
}

const updateAbility = async (id, name) => {
    const ability = await Ability.findOne({where:{id:id}});
    if (!ability) {
        throw new NotFoundError('Ability not found');
    }
    const data = await ability.update({
        name:name},{where:{id:id}})
    return data
}
const deleteAbility = async (id) => {
    const ability = await Ability.findOne({where:{id:id}})
    if (!ability) {
       throw new NotFoundError('Ability not found');
    }
    const pokemonWithThisAbility = await PokemonsAbilities.findAll({where:{AbilityId:id}})
    if (pokemonWithThisAbility.length) {
        throw new ValidationError("Cannot delete ability if any pokemons has this ability")
    }
    await ability.destroy();
}

module.exports={
    getAbility,
    getAllAbilities,
    createAbility,
    updateAbility,
    deleteAbility,}