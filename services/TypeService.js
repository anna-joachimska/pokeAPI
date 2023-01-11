const typeDal = require("../dataAccessLayer/typeDal");

const getType = (id) => typeDal.getType(id);

const getAllTypes = (page, size) => typeDal.getAllTypes(page, size);

const getAllTypesSortedByName = (page, size) => typeDal.getAllTypesSortedByName(page, size);

const getAllTypesWithPokemons = (page, size) => typeDal.getAllTypesWithPokemons(page, size);

const getAllTypesSortedByIdASC = (page, size) => typeDal.getAllTypesSortedByIdASC(page, size);

const getAllTypesSortedByIdDESC = (page, size) => typeDal.getAllTypesSortedByIdDESC(page, size);

const createType = async (body) => {
    return typeDal.createType(body);
};

const updateType = (id, body, res) => {
    return typeDal.updateType(id, body, res);
};

const deleteType = (id,res) => typeDal.deleteType(id,res);

module.exports = {
    getType,
    getAllTypes,
    getAllTypesSortedByName,
    getAllTypesWithPokemons,
    getAllTypesSortedByIdASC,
    getAllTypesSortedByIdDESC,
    createType,
    updateType,
    deleteType,
};