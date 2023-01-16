const statisticSerivice = require("../services/statisticService");

const getTypeWithAverageHigherHp = async (req, res) => {
    try {
        const data = await statisticSerivice.getTypeWithAverageHigherHp()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getTypeWithAverageHigherAttack = async (req, res) => {
    try {
        const data = await statisticSerivice.getTypeWithAverageHigherAttack()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getTypeWithAverageHigherDefense = async (req, res) => {
    try {
        const data = await statisticSerivice.getTypeWithAverageHigherDefense()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const countByType = async (req,res) => {
    try {
        const typeId = req.params.typeId
        const {count, type} = await statisticSerivice.countByType(typeId)
        res.status(200).json({count:count,type:type});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const countPokemonsWithMoreThanXType = async (req,res) => {
    try {
        const number = req.params.X
        const data = await statisticSerivice.countPokemonsWithMoreThanXType(number)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getMostPopularType = async (req,res) => {
    try {
        const data = await statisticSerivice.getMostPopularType()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const countPokemonsInMostPopularType = async (req,res) => {
    try {
        const data = await statisticSerivice.countPokemonsInMostPopularType()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const getAbilityWithAverageHigherHp = async (req, res) => {
    try {
        const data = await statisticSerivice.getAbilityWithAverageHigherHp()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAbilityWithAverageHigherAttack = async (req, res) => {
    try {
        const data = await statisticSerivice.getAbilityWithAverageHigherAttack()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAbilityWithAverageHigherDefense = async (req, res) => {
    try {
        const data = await statisticSerivice.getAbilityWithAverageHigherDefense()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const countByAbility = async (req,res) => {
    try {
        const abilityId = req.params.abilityId
        const {count, ability} = await statisticSerivice.countByAbility(abilityId)
        res.status(200).json({count:count,ability:ability});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const countPokemonsWithMoreThanXAbilities = async (req,res) => {
    try {
        const number = req.params.X
        const data = await statisticSerivice.countPokemonsWithMoreXAbilities(number);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getMostPopularAbility = async (req,res) => {
    try {
        const data = await statisticSerivice.getMostPopularAbility()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const countPokemonsInMostPopularAbility = async (req,res) => {
    try {
        const data = await statisticSerivice.countPokemonsInMostPopularAbility()
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getTypeWithAverageHigherHp,
    getTypeWithAverageHigherAttack,
    getTypeWithAverageHigherDefense,
    countByType,
    countPokemonsWithMoreThanXType,
    getMostPopularType,
    countPokemonsInMostPopularType,
    getAbilityWithAverageHigherHp,
    getAbilityWithAverageHigherAttack,
    getAbilityWithAverageHigherDefense,
    countByAbility,
    countPokemonsWithMoreThanXAbilities,
    getMostPopularAbility,
    countPokemonsInMostPopularAbility,
}