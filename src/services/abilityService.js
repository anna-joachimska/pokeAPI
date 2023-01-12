const abilityRepository = require("../repositories/abilityRepository");

const getAbility = (id) => abilityRepository.getAbility(id);

const getAllAbilities = (page, size, sortBy, direction) => abilityRepository.getAllAbilities(page, size, sortBy, direction);

const createAbility = async (body) => {
    return abilityRepository.createAbility(body);
};

const updateAbility = (id, body, res) => {
    return abilityRepository.updateAbility(id, body, res);
};

const deleteAbility = (id,res) => abilityRepository.deleteAbility(id,res);

module.exports = {
    getAbility,
    getAllAbilities,
    createAbility,
    updateAbility,
    deleteAbility,
};