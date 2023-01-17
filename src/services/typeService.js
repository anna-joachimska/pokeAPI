const typeRepository = require("../repositories/typeRepository");
const {ValidationError} = require("../errors/customError");

const getType = (id) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    return typeRepository.getType(id);
}

const getAllTypes = (page, size, sortBy , direction) => typeRepository.getAllTypes(page, size, sortBy , direction);

const createType = async (body) => {
    if(!body.name) {
        throw new ValidationError("You must pass a data to create new type")
    }
    if(body.name.length<3){
        throw new ValidationError("Not valid length of name")
    }
    return typeRepository.createType(body);
};

const updateType = (id, body) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    if(!body.name){
        throw new ValidationError("You must pass a data to update type")
    }
    if(body.name.length<3){
        throw new ValidationError("Not valid length of name")
    }
    return typeRepository.updateType(id, body);
};

const deleteType = (id) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    return typeRepository.deleteType(id);
}

module.exports = {
    getType,
    getAllTypes,
    createType,
    updateType,
    deleteType,
};