const typeSerivice = require("../services/typeService");

const getAllTypes = async (req, res) => {
    try {
        const { page, size, sortBy , direction} = req.query;
        const data = await typeSerivice.getAllTypes(page, size, sortBy , direction)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewType = async (req, res, next) => {
    try {
        const type = await typeSerivice.createType(req.body);
        res.status(201).send(type);
    }
    catch(error) {
        return next(error)
    };
}

const getType = async (req, res, next) => {
    try {
        const id = parseInt(req.params.typeId);
        const data = await typeSerivice.getType(id);
        res.status(200).json(data);
    } catch (error) {
        return next(error)
    }
}
const updateType = async (req, res, next) => {
    try {
        const id = parseInt(req.params.typeId);
        const data = await typeSerivice.updateType(id,req.body);
        res.status(200).send(data);
    } catch (error) {
        return next(error)
    }
}

const deleteType = async (req, res, next) => {
    try {
        const id = parseInt(req.params.typeId);
        const data = await typeSerivice.deleteType(id);
        res.status(200).send({message:'Type has been deleted'});

    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getType,
    getAllTypes,
    createNewType,
    updateType,
    deleteType
}