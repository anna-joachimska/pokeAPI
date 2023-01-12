const typeRepository = require("../repositories/typeRepository");

const getType = (id) => typeRepository.getType(id);

const getAllTypes = (page, size, sortBy , direction) => typeRepository.getAllTypes(page, size, sortBy , direction);

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
    createType,
    updateType,
    deleteType,
};