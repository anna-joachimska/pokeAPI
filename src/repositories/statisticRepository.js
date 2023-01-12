const {Pokemon, Ability, Type} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const PokemonsTypes = require("../models/Pokemons_Types");
const sequelize = require("../../db");
const {splitMulti} = require('../functions/splitMulti');
const {indexOfMaxTypesValue, indexOfMaxAbilitiesValue} = require("../functions/maxValueAndIndex");
const {countPokemons} = require("../functions/countPokemons");

const getTypeWithAverageHigherHp = async () => {

    const data = await sequelize.query(`SELECT AVG(hp) as average_values, "pokemons_types"."TypeId"
from "pokemons", "pokemons_types" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons_types"."TypeId";`);
    const averageHp = data[0];
    const {types, index} = indexOfMaxTypesValue(averageHp)
    return Type.findOne({where:{id: types[index]}})
}

const getTypeWithAverageHigherAttack = async () => {
    const data = await sequelize.query(`SELECT AVG(attack) as average_values, "pokemons_types"."TypeId"
from "pokemons", "pokemons_types" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons_types"."TypeId";`);
    const averageAttack = data[0];
    console.log(averageAttack)
    const {types, index} = indexOfMaxTypesValue(averageAttack)
    return Type.findOne({where:{id: types[index]}})
}

const getTypeWithAverageHigherDefense = async () => {
    const data = await sequelize.query(`SELECT AVG(defense) as average_values, "pokemons_types"."TypeId"
from "pokemons", "pokemons_types" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons_types"."TypeId";`);
    const averageDefense = data[0];
    const {types, index} = indexOfMaxTypesValue(averageDefense)
    return Type.findOne({where:{id: types[index]}})
}

const countByType = async (typeId) => {
    const count = await PokemonsTypes.count({where:{TypeId:typeId}});
    const type = await Type.findOne({where:{id:typeId}});
    return {count,type}
}

const countPokemonsWithMoreThanXType = async(page, size, number) => {
    const data = await sequelize.query(`SELECT count("pokemons_types"."TypeId"), "pokemons"."id"
from "pokemons_types", "pokemons" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons"."id";`)
    const accessData = data[0];
    const pokemonsIds = countPokemons(accessData,number)
    const pokemons = await Pokemon.findAll({
        where:{id:pokemonsIds},
        include: [
            {
                model: Type,
                attributes: ['id','name',],
                through: {
                    attributes: []
                }
            }
        ],
        limit:page,
        offset:size})
    const count = await Pokemon.count({where:{id:pokemonsIds}})
    return {count, pokemons}
}

const getMostPopularType = async (page, size) => {
    const data = await sequelize.query(`select most_common_vals from pg_stats where tablename = 'pokemons_types' and attname = 'TypeId';`)
    const accessData = data[0]
    const mostCommonVals = accessData[0].most_common_vals;
    const types = splitMulti(mostCommonVals, ['{', ',', '}'])
    const mostPopularTypesIds = types.map(typeID => parseInt(typeID));
    const mostPopularTypes = await Type.findAll({
        where:{id:mostPopularTypesIds},
        order: sequelize.literal('(' + mostPopularTypesIds.map(function(id) {
            return '"Type"."id" = \'' + id + '\''
        }).join(', ') + ') DESC'),
        limit:page,
        offset:size})
    return mostPopularTypes;
}

const countPokemonsInMostPopularType = async (page, size) => {
    const data = await sequelize.query(`select most_common_vals from pg_stats where tablename = 'pokemons_types' and attname = 'TypeId';`)
    const accessData = data[0]
    const mostCommonVals = accessData[0].most_common_vals;
    const types = splitMulti(mostCommonVals, ['{', ',', '}'])
    const mostPopularTypesIds = types.map(typeID => parseInt(typeID));
    const count = await Type.count({where:{id:mostPopularTypesIds}})
    const pokemons =await Type.findAll({
        where:{id:mostPopularTypesIds},
        include: [
            {
                model: Pokemon,
                attributes: ['id','name', 'hp','attack','defense','generation'],
                through: {
                    attributes: []
                }
            }
        ],
        order: sequelize.literal('(' + mostPopularTypesIds.map(function(id) {
            return '"Type"."id" = \'' + id + '\''
        }).join(', ') + ') DESC'),
        limit:page, offset:size
    })
    return {count, pokemons}
}

const getAbilityWithAverageHigherHp = async () => {
    const data = await sequelize.query(`SELECT AVG(hp) as average_values, "pokemons_abilities"."AbilityId"
from "pokemons", "pokemons_abilities" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons_abilities"."AbilityId";`);
    const averageDefense = data[0];
    const {abilities, index} = indexOfMaxAbilitiesValue(averageDefense);
    return Ability.findOne({where:{id: abilities[index]}})
}

const getAbilityWithAverageHigherAttack = async () => {
    const data = await sequelize.query(`SELECT AVG(attack) as average_values, "pokemons_abilities"."AbilityId"
from "pokemons", "pokemons_abilities" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons_abilities"."AbilityId";`);
    const averageDefense = data[0];
    const {abilities, index} = indexOfMaxAbilitiesValue(averageDefense);
    return Ability.findOne({where:{id: abilities[index]}})
}

const getAbilityWithAverageHigherDefense = async () => {
    const data = await sequelize.query(`SELECT AVG(defense) as average_values, "pokemons_abilities"."AbilityId"
from "pokemons", "pokemons_abilities" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons_abilities"."AbilityId";`);
    const averageDefense = data[0];
    const {abilities, index} = indexOfMaxAbilitiesValue(averageDefense);
    return Ability.findOne({where:{id: abilities[index]}})
}

const countByAbility = async (abilityId) => {
    const count = await PokemonsAbilities.count({where:{AbilityId:abilityId}});
    const ability = await Ability.findOne({where:{id:abilityId}});
    return {count,ability}
}

const countPokemonsWithMoreThanXAbilities = async (page, size, number) => {
    const data = await sequelize.query(`SELECT count("pokemons_abilities"."AbilityId"), "pokemons"."id"
from "pokemons_abilities", "pokemons" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons"."id";`)
    const accessData = data[0];
    const pokemonsIds = countPokemons(accessData,number)
    const pokemons = await Pokemon.findAll({
        where:{id:pokemonsIds},
        include: [
            {
                model: Ability,
                attributes: ['id','name',],
                through: {
                    attributes: []
                }
            }
        ],
        limit:page,
        offset:size})
    const count = await Pokemon.count({where:{id:pokemonsIds}})
    return {count, pokemons}
}

const getMostPopularAbility = async (page, size) => {
    const data = await sequelize.query(` select histogram_bounds from pg_stats where tablename = 'pokemons_abilities' and attname = 'AbilityId';`)
    const accessData = data[0]
    const histogramBounds = accessData[0].histogram_bounds;
    const abilities = splitMulti(histogramBounds, ['{', ',', '}'])
    const mostPopularAbilitiesIds = abilities.map(abilityID => parseInt(abilityID));
    const mostPopularAbilities = await Ability.findAll({
        where:{id:mostPopularAbilitiesIds},
        order: sequelize.literal('(' + mostPopularAbilitiesIds.map(function(id) {
            return '"Ability"."id" = \'' + id + '\''
        }).join(', ') + ') DESC'),
        limit:page,
        offset:size})
    return mostPopularAbilities;
}

const countPokemonsInMostPopularAbility = async (page, size) => {
    const data = await sequelize.query(` select histogram_bounds from pg_stats where tablename = 'pokemons_abilities' and attname = 'AbilityId';`)
    const accessData = data[0]
    const histogramBounds = accessData[0].histogram_bounds;
    const abilities = splitMulti(histogramBounds, ['{', ',', '}'])
    const mostPopularAbilitiesIds = abilities.map(abilityID => parseInt(abilityID));
    const mostPopularAbilitiesWithPokemons = await Ability.findAll({
        where:{id:mostPopularAbilitiesIds},
        order: sequelize.literal('(' + mostPopularAbilitiesIds.map(function(id) {
            return '"Ability"."id" = \'' + id + '\''
        }).join(', ') + ') DESC'),
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
        offset:size
    })
    return mostPopularAbilitiesWithPokemons;
}

module.exports={
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
    countPokemonsInMostPopularAbility,}