const abilityRepository = require("../repositories/abilityRepository");
const {Ability} = require("../models");
const {ValidationError} = require("../errors/customError");

const getAbility = (id) => {
    if(!id) {
        throw new ValidationError("id not provided")
    }
    return abilityRepository.getAbility(id);
}

const getAllAbilities = (page, size, sortBy, direction) => abilityRepository.getAllAbilities(page, size, sortBy, direction);

const createAbility = async (body) => {
    const name = body.name
    if(name) {
        throw new ValidationError("You must pass a data to create new type")
    }
    if(name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    return abilityRepository.createAbility(name);
};

const updateAbility = (id, body) => {
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
    return abilityRepository.updateAbility(id, name);
};

const deleteAbility = (id) => {
    if (!id) {
        throw new ValidationError("Not valid id provided")
    }
    return abilityRepository.deleteAbility(id);
}

module.exports = {
    getAbility,
    getAllAbilities,
    createAbility,
    updateAbility,
    deleteAbility,
};