const typeSerivice = require("../services/TypeService");

const getAllTypes = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await typeSerivice.getAllTypes(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllTypesSortedByIdASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await typeSerivice.getAllTypesSortedByIdASC(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllTypesSortedByIdDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await typeSerivice.getAllTypesSortedByIdDESC(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllTypesSortedByName = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await typeSerivice.getAllTypesSortedByName(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllTypesWithPokemons = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await typeSerivice.getAllTypesWithPokemons(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createNewType = async (req, res) => {
    try {
        const type = await typeSerivice.createType(req.body);
        res.status(201).send(type);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}

const getType = async (req, res) => {
    try {
        if (!req.params.typeId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.typeId);
        const data = await typeSerivice.getType(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateType = async (req, res) => {
    try {
        if (!req.params.typeId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.typeId);
        const data = await typeSerivice.updateType(id,req.body,res);
        res.status(200).send("Type updated successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteType = async (req, res) => {
    try {
        if (!req.params.typeId) return res.status(400).json('id not provided');
        const id = req.params.typeId;
        const data = await typeSerivice.deleteType(id, res);
        res.status(200).send('Type has been deleted');

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getType,
    getAllTypes,
    getAllTypesSortedByIdASC,
    getAllTypesSortedByIdDESC,
    getAllTypesSortedByName,
    getAllTypesWithPokemons,
    createNewType,
    updateType,
    deleteType
}