const typeRepository = require("../repositories/typeRepository");

const getType = (id) => typeRepository.getType(id);

const getAllTypes = (page, size) => typeRepository.getAllTypes(page, size);

const getAllTypesSortedByName = (page, size) => typeRepository.getAllTypesSortedByName(page, size);

const getAllTypesWithPokemons = (page, size) => typeRepository.getAllTypesWithPokemons(page, size);

const getAllTypesSortedByIdASC = (page, size) => typeRepository.getAllTypesSortedByIdASC(page, size);

const getAllTypesSortedByIdDESC = (page, size) => typeRepository.getAllTypesSortedByIdDESC(page, size);

const createType = async (body) => {
    return typeRepository.createType(body);
};

const updateType = (id, body, res) => {
    return typeRepository.updateType(id, body, res);
};

const deleteType = (id,res) => typeRepository.deleteType(id,res);

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