const abilitySerivice = require("../services/abilityService");

const getAllAbilities = async (req, res) => {
    try {
        const { page, size, sortBy , direction} = req.query;
        const data = await abilitySerivice.getAllAbilities(page,size, sortBy, direction)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewAbility = async (req, res) => {
    try {
        const ability = await abilitySerivice.createAbility(req.body);
        res.status(201).send(ability);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}

const getAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.abilityId);
        const data = await abilitySerivice.getAbility(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.abilityId);
        const data = await abilitySerivice.updateAbility(id,req.body,res);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = req.params.abilityId;
        const data = await abilitySerivice.deleteAbility(id, res);
        res.status(200).send({message:'Ability has been deleted'});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAbility,
    getAllAbilities,
    createNewAbility,
    updateAbility,
    deleteAbility,
}