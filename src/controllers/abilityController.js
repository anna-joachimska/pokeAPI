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

const createNewAbility = async (req, res, next) => {
    try {
        const ability = await abilitySerivice.createAbility(req.body);
        res.status(201).send(ability);
    }
    catch(error) {
        return next(error)
    };
}

const getAbility = async (req, res, next) => {
    try {
        const id = parseInt(req.params.abilityId);
        const data = await abilitySerivice.getAbility(id);
        res.status(200).json(data);
    } catch (error) {
        return next(error)
    }
}
const updateAbility = async (req, res, next) => {
    try {
        const id = parseInt(req.params.abilityId);
        const data = await abilitySerivice.updateAbility(id,req.body);
        res.status(200).send(data);
    } catch (error) {
        return next(error)
    }
}

const deleteAbility = async (req, res, next) => {
    try {
        const id = parseInt(req.params.abilityId);
        const data = await abilitySerivice.deleteAbility(id);
        res.status(200).send({message:'Ability has been deleted'});
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAbility,
    getAllAbilities,
    createNewAbility,
    updateAbility,
    deleteAbility,
}