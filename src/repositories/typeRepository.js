const {Pokemon, Type} = require("../models");
const PokemonsTypes = require("../models/Pokemons_Types");

const getType = async (id) => {
    const data = await Type.findOne({where:{id:id}})
    if (!data) return res.status(404).json('Type not found');
    return data
}
const getAllTypes = async (page, size) => {
    const data = await Type.findAll({limit:page, offset:size})
    return data
}
const getAllTypesSortedByName = async (page,size) => {
    const data = await Type.findAll({order: [['name', 'ASC']],limit:page, offset:size})
    return data
}
const getAllTypesWithPokemons = async (page,size) => {
    const data = await Type.findAll({
        order: [['id', 'ASC']],
        include: [
            {
                model: Pokemon,
                attributes: ['id','name', 'hp','attack','defense','generation'],
                through: {
                    attributes: []
                }
            }
        ],
        limit:page,
        offset:size})
    return data
}
const getAllTypesSortedByIdASC = async(page, size) => {
    const data = await Type.findAll({order: [['id', 'ASC']], limit:page, offset:size})
    return data
}
const getAllTypesSortedByIdDESC = async(page, size) => {
    const data = await Type.findAll({order: [['id', 'DESC']], limit:page, offset:size})
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
    getAllTypesWithPokemons,
    getAllTypesSortedByName,
    getAllTypesSortedByIdASC,
    getAllTypesSortedByIdDESC,
    createType,
    updateType,
    deleteType,}