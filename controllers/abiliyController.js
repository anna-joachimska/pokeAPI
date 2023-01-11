const abilitySerivice = require("../services/AbilityService");

const getAllAbilities = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await abilitySerivice.getAllAbilities(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllAbilitiesSortedByIdASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await abilitySerivice.getAllAbilitiesSortedByIdASC(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllAbilitiesSortedByIdDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await abilitySerivice.getAllAbilitiesSortedByIdDESC(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllAbilitiesSortedByName = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await abilitySerivice.getAllAbilitiesSortedByName(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllAbilitiesWithPokemons = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await abilitySerivice.getAllAbilitiesWithPokemons(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createNewAbility = async (req, res) => {
    try {
        const type = await abilitySerivice.createAbility(req.body);
        res.status(201).send(type);
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
        res.status(200).send("Ability updated successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = req.params.abilityId;
        const data = await abilitySerivice.deleteAbility(id, res);
        res.status(200).send('Ability has been deleted');

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAbility,
    getAllAbilities,
    getAllAbilitiesSortedByIdASC,
    getAllAbilitiesSortedByIdDESC,
    getAllAbilitiesSortedByName,
    getAllAbilitiesWithPokemons,
    createNewAbility,
    updateAbility,
    deleteAbility,
}