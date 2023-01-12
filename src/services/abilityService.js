const abilityRepository = require("../repositories/abilityRepository");

const getAbility = (id) => abilityRepository.getAbility(id);

const getAllAbilities = (page, size) => abilityRepository.getAllAbilities(page, size);

const getAllAbilitiesSortedByName = (page, size) => abilityRepository.getAllAbilitiesSortedByName(page, size);

const getAllAbilitiesWithPokemons = (page, size) => abilityRepository.getAllAbilitiesWithPokemons(page, size);

const getAllAbilitiesSortedByIdASC = (page, size) => abilityRepository.getAllAbilitiesSortedByIdASC(page, size);

const getAllAbilitiesSortedByIdDESC = (page, size) => abilityRepository.getAllAbilitiesSortedByIdDESC(page, size);

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
    getAllAbilitiesSortedByName,
    getAllAbilitiesWithPokemons,
    getAllAbilitiesSortedByIdASC,
    getAllAbilitiesSortedByIdDESC,
    createAbility,
    updateAbility,
    deleteAbility,
};