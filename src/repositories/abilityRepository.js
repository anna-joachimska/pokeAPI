const {Ability} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const {ValidationError, NotFoundError} = require("../errors/customError");

const getAbility = async (id) => {
    const data = await Ability.findOne({where:{id:id}})
    return data
}
const getAllAbilities = async (page, size, sortBy, direction) => {
    const data = await Ability.findAll({order:[[sortBy || 'id', direction || 'ASC']],limit:size, offset:page})
    return data
}

const createAbility = async (name) => {
    const ability = await Ability.create({
        name: name,
    });
    return ability
}

const updateAbility = async (ability, id, name) => {
    const data = await ability.update({
        name:name},{where:{id:id}})
    return data
}
const deleteAbility = async (ability) => {
    await ability.destroy();
}

module.exports={
    getAbility,
    getAllAbilities,
    createAbility,
    updateAbility,
    deleteAbility,}