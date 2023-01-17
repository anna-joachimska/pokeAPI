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
    if(!body.name) {
        throw new ValidationError("You must pass a data to create new type")
    }
    if(body.name.length<3) {
        throw new ValidationError("Not valid length of name")
    }
    return abilityRepository.createAbility(body);
};

const updateAbility = (id, body) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    if(!body.name){
        throw new ValidationError("You must pass a data to update ability")
    }
    if(body.name.length>3){
        throw new ValidationError("Not valid length of name")
    }
    return abilityRepository.updateAbility(id, body);
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