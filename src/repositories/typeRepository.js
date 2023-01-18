const {Type} = require("../models");


const getType = async (id) => {
    const data = await Type.findOne({where:{id:id}})
    return data
}
const getAllTypes = async (page, size, sortBy , direction) => {
    const data = await Type.findAll({order:[[sortBy || 'id',direction || 'ASC']],limit:size, offset:page})
    return data
}
const createType = async (name) => {
    const type = await Type.create({
        name: name,
    });
    return type
}

const updateType = async (type, id, name) => {
    const data = await type.update({
        name:name},{where:{id:id}})
    return data
}

const deleteType = async (type) => {
    await type.destroy();
}

module.exports={
    getType,
    getAllTypes,
    createType,
    updateType,
    deleteType,}