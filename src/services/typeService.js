const typeRepository = require("../repositories/typeRepository");
const {ValidationError, NotFoundError} = require("../errors/customError");
const {Type} = require("../models");
const PokemonsTypes = require("../models/Pokemons_Types");

const getType = async (id) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    const data = await typeRepository.getType(id);
    if(!data) {
        throw new NotFoundError("Type not found");
    }
    return data
}

const getAllTypes = (page, size, sortBy , direction) => typeRepository.getAllTypes(page, size, sortBy , direction);

const createType = async (body) => {
    const name = body.name
    if(!name) {
        throw new ValidationError("You must pass a data to create new type")
    }
    if(name.length<3){
        throw new ValidationError("Not valid length of name")
    }
    const checkIfExists = await Type.findOne({where:{name:name}})
    if (checkIfExists) {
        throw new ValidationError("Type already exists in database")
    }
    return typeRepository.createType(name);
};

const updateType = async (id, body) => {
    const name = body.name
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    if(!name){
        throw new ValidationError("You must pass a data to update type")
    }
    if(name.length<3){
        throw new ValidationError("Not valid length of name")
    }
    const type = await Type.findOne({where:{id:id}});
    if (!type) {
        throw new NotFoundError("Type not found");
    }
    return typeRepository.updateType(type, id, name);
};

const deleteType = async (id) => {
    if(!id) {
        throw new ValidationError("Not valid id provided")
    }
    const type = await Type.findOne({where:{id:id}})
    if (!type) {
        throw new NotFoundError("Type not found");
    }
    const pokemonWithThisType = await PokemonsTypes.findAll({where:{TypeId:id}})
    if (pokemonWithThisType.length) {
        throw new ValidationError("Cannot delete type if any pokemons has this type")
    }
    return typeRepository.deleteType(type);
}

module.exports = {
    getType,
    getAllTypes,
    createType,
    updateType,
    deleteType,
};