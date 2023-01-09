const pool = require("../db");
const typeQueries = require("../queries/typeQueries");
const Type = require("../models/Type");

const getAllTypes = async (req, res) => {
    try {
        const data = await pool.query(typeQueries.getTypes)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewType = async (req, res) => {
    try {
        const { name } = req.body;
        // const result = await pool.query(typeQueries.checkIfTypeNameExists, [name]);
        // if (result.rows.length){
        //     throw new Error("name already exists in DB")
        // }
        // const pokemon = await Pokemon.findOne({
        //     where: {id: pokemonId}
        // });
        const type = await Type.create({name});
        // const type = new Type({name});
        // await type.createType();
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
        const data = await pool.query(typeQueries.getTypeById, [id]);
        if (!data.rows.length) return res.status(404).json('Type not found');
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateType = async (req, res) => {
    try {
        if (!req.params.typeId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.typeId);
        const { name } = req.body;
        const data = await pool.query(typeQueries.getTypeById, [id]);
        if (!data.rows.length) return res.status(404).json('Type not found');
        await pool.query(typeQueries.updateType, [name, id])
        res.status(200).send("Type updated successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteType = async (req, res) => {
    try {
        if (!req.params.typeId) return res.status(400).json('id not provided');
        const id = req.params.typeId;
        const data = await pool.query(typeQueries.getTypeById, [id])
        if (!data.rows.length) {
            return res.status(404).json({message: 'Type not found'});
        }
        await pool.query(typeQueries.deleteType, [id])
        res.status(200).send('Type has been deleted');

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getType,
    getAllTypes,
    createNewType,
    deleteType,
    updateType,
}