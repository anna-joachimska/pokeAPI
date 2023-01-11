const abilityDal = require("../dataAccessLayer/abilityDal");

const getAbility = (id) => abilityDal.getAbility(id);

const getAllAbilities = (page, size) => abilityDal.getAllAbilities(page, size);

const getAllAbilitiesSortedByName = (page, size) => abilityDal.getAllAbilitiesSortedByName(page, size);

const getAllAbilitiesWithPokemons = (page, size) => abilityDal.getAllAbilitiesWithPokemons(page, size);

const getAllAbilitiesSortedByIdASC = (page, size) => abilityDal.getAllAbilitiesSortedByIdASC(page, size);

const getAllAbilitiesSortedByIdDESC = (page, size) => abilityDal.getAllAbilitiesSortedByIdDESC(page, size);

const createAbility = async (body) => {
    return abilityDal.createAbility(body);
};

const updateAbility = (id, body, res) => {
    return abilityDal.updateAbility(id, body, res);
};

const deleteAbility = (id,res) => abilityDal.deleteAbility(id,res);

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