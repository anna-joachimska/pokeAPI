const abilityRepository = require("../repositories/abilityRepository");
const {Ability} = require("../models");
const {ValidationError, NotFoundError} = require("../errors/customError");
const PokemonsAbilities = require("../models/Pokemons_Abilities");

const getAbility = async (id) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    const data = await abilityRepository.getAbility(id);
    if (!data) {
        throw new NotFoundError('Ability not found');
    }
    return data
}

const getAllAbilities = (page, size, sortBy, direction) => abilityRepository.getAllAbilities(page, size, sortBy, direction);

const createAbility = async (body) => {
    const name = body.name
    if(!name) {
        throw new ValidationError("You must pass a data to create new ability")
    }
    if(name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    const checkIfExists = await Ability.findOne({where:{name:name}})
    if (checkIfExists) {
        throw new ValidationError("Ability already exists in database")
    }
    return abilityRepository.createAbility(name);
};

const updateAbility = async (id, body) => {
    const name = body.name
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    if(!name){
        throw new ValidationError("You must pass a data to update ability")
    }
    if(name.length<3){
        throw new ValidationError("Not valid length of name")
    }
    const ability = await Ability.findOne({where:{id:id}});
    if (!ability) {
        throw new NotFoundError('Ability not found');
    }
    return abilityRepository.updateAbility(ability, id, name);
};

const deleteAbility = async (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    const ability = await Ability.findOne({where:{id:id}})
    if (!ability) {
        throw new NotFoundError('Ability not found');
    }
    const pokemonWithThisAbility = await PokemonsAbilities.findAll({where:{AbilityId:id}})
    if (pokemonWithThisAbility.length) {
        throw new ValidationError("Cannot delete ability if any pokemons has this ability")
    }
    return abilityRepository.deleteAbility(ability);
}

module.exports = {
    getAbility,
    getAllAbilities,
    createAbility,
    updateAbility,
    deleteAbility,
};