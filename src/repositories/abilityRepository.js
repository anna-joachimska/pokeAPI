const {Pokemon, Ability} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");

const getAbility = async (id) => {
    const data = await Ability.findOne({where:{id:id}})
    if (!data) return res.status(404).json('Ability not found');
    return data
}
const getAllAbilities = async (page, size) => {
    const data = await Ability.findAll({limit:page, offset:size})
    return data
}
const getAllAbilitiesSortedByName = async (page,size) => {
    const data = await Ability.findAll({order: [['name', 'ASC']],limit:page, offset:size})
    return data
}
const getAllAbilitiesWithPokemons = async (page,size) => {
    const data = await Ability.findAll({
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
const getAllAbilitiesSortedByIdASC = async(page, size) => {
    const data = await Ability.findAll({order: [['id', 'ASC']], limit:page, offset:size})
    return data
}
const getAllAbilitiesSortedByIdDESC = async(page, size) => {
    const data = await Ability.findAll({order: [['id', 'DESC']], limit:page, offset:size})
    return data
}
const createAbility = async (body) => {
    const checkIfExists = await Ability.findOne({where:{name:body.name}})
    if (checkIfExists) {
        throw new Error("ability already exists in database")
    }
    const ability = await Ability.create({
        name: body.name,
    });
    return ability
}

const updateAbility = async (id, body, res) => {
    const name = body.name;
    const ability = await Ability.findOne({where:{id:id}});
    if (!ability) return res.status(404).json('Ability not found');
    const data = await ability.update({
        name:name},{where:{id:id}})
    return data
}
const deleteAbility = async (id,res) => {
    const ability = await Ability.findOne({where:{id:id}})
    if (!ability) {
        return res.status(404).json({message: 'Ability not found'});
    }
    const pokemonWithThisAbility = await PokemonsAbilities.findAll({where:{AbilityId:id}})
    if (pokemonWithThisAbility.length) {
        throw new Error("cannot delete ability if any pokemons has this ability")
    }
    await ability.destroy();
}

module.exports={
    getAbility,
    getAllAbilities,
    getAllAbilitiesWithPokemons,
    getAllAbilitiesSortedByName,
    getAllAbilitiesSortedByIdASC,
    getAllAbilitiesSortedByIdDESC,
    createAbility,
    updateAbility,
    deleteAbility,}