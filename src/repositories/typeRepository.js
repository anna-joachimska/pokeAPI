const {Type} = require("../models");
const PokemonsTypes = require("../models/Pokemons_Types");
const {ValidationError, NotFoundError} = require("../errors/customError");

const getType = async (id) => {
    const data = await Type.findOne({where:{id:id}})
    if(!data) {
        throw new NotFoundError("Type not found");
    }
    return data
}
const getAllTypes = async (page, size, sortBy , direction) => {
    const data = await Type.findAll({order:[[sortBy || 'id',direction || 'ASC']],limit:size, offset:page})
    return data
}
const createType = async (name) => {
    const checkIfExists = await Type.findOne({where:{name:name}})
    if (checkIfExists) {
        throw new ValidationError("Type already exists in database")
    }
    const type = await Type.create({
        name: name,
    });
    return type
}

const updateType = async (id, name) => {
    const type = await Type.findOne({where:{id:id}});
    if (!type) {
        throw new NotFoundError("Type not found");
    }
    const data = await type.update({
        name:name},{where:{id:id}})
    return data
}

const deleteType = async (id) => {
    const type = await Type.findOne({where:{id:id}})
    if (!type) {
        throw new NotFoundError("Type not found");
    }
    const pokemonWithThisType = await PokemonsTypes.findAll({where:{TypeId:id}})
    if (pokemonWithThisType.length) {
        throw new ValidationError("Cannot delete type if any pokemons has this type")
    }
    await type.destroy();
}

module.exports={
    getType,
    getAllTypes,
    createType,
    updateType,
    deleteType,}