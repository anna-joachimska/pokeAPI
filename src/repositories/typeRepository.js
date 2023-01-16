const {Pokemon, Type} = require("../models");
const PokemonsTypes = require("../models/Pokemons_Types");

const getType = async (id) => {
    const data = await Type.findOne({where:{id:id}})
    if (!data) return res.status(404).json('Type not found');
    return data
}
const getAllTypes = async (page, size, sortBy , direction) => {
    const data = await Type.findAll({order:[[sortBy,direction]],limit:size, offset:page})
    return data
}
const createType = async (body) => {
    const checkIfExists = await Type.findOne({where:{name:body.name}})
    if (checkIfExists) {
        throw new Error("type already exists in database")
    }
    const type = await Type.create({
        name: body.name,
    });
    return type
}

const updateType = async (id, body, res) => {
    const name = body.name;
    const type = await Type.findOne({where:{id:id}});
    if (!type) return res.status(404).json('Type not found');
    const data = await type.update({
        name:name},{where:{id:id}})
    return data
}
const deleteType = async (id,res) => {
    const type = await Type.findOne({where:{id:id}})
    if (!type) {
        return res.status(404).json({message: 'Type not found'});
    }
    const pokemonWithThisType = await PokemonsTypes.findAll({where:{TypeId:id}})
    if (pokemonWithThisType.length) {
        throw new Error("cannot delete type if any pokemons has this type")
    }
    await type.destroy();
}

module.exports={
    getType,
    getAllTypes,
    createType,
    updateType,
    deleteType,}