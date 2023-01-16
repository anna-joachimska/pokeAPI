const {Pokemon, Ability, Type} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const PokemonsTypes = require("../models/Pokemons_Types");
const sequelize = require("../../db");
const {splitMulti} = require('../functions/splitMulti');
const {countPokemons} = require("../functions/countPokemons");

const getTypeWithAverageHigherHp = async () => {
    const data = await sequelize.query(`SELECT avg(hp) as average_hp, "pokemons_types"."TypeId" as type_id, "Types"."name" 
from "pokemons", "pokemons_types", "Types"
where pokemons.id="pokemons_types"."PokemonId" and "pokemons_types"."TypeId" = "Types"."id" 
group by "pokemons_types"."TypeId", "Types"."name"
order by average_hp desc 
limit 1;`);
    return data[0][0]
}

const getTypeWithAverageHigherAttack = async () => {
    const data = await sequelize.query(`SELECT avg(attack) as average_attack, "pokemons_types"."TypeId" as type_id, "Types"."name" 
from "pokemons", "pokemons_types", "Types"
where pokemons.id="pokemons_types"."PokemonId" and "pokemons_types"."TypeId" = "Types"."id" 
group by "pokemons_types"."TypeId", "Types"."name"
order by average_attack desc 
limit 1;`);
    return data[0][0]
}

const getTypeWithAverageHigherDefense = async () => {
    const data = await sequelize.query(`SELECT avg(defense) as average_defense, "pokemons_types"."TypeId" as type_id, "Types"."name" 
from "pokemons", "pokemons_types", "Types"
where pokemons.id="pokemons_types"."PokemonId" and "pokemons_types"."TypeId" = "Types"."id" 
group by "pokemons_types"."TypeId", "Types"."name"
order by average_defense desc 
limit 1;`);
    return data[0][0]
}

const countByType = async (typeId) => {
    const count = await PokemonsTypes.count({where:{TypeId:typeId}});
    const type = await Type.findOne({where:{id:typeId}});
    return {count,type}
}

const countPokemonsWithMoreThanXType = async(page, size, number) => {
    const [results, metadata] = await sequelize.query(`SELECT count("pokemons"."id") as pokemons_count  from (SELECT count("pokemons_types"."TypeId") as "count", "pokemons"."id"
from "pokemons_types", "pokemons" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons"."id") as types_count, pokemons WHERE count >$number group by "types_count"."count", "pokemons"."id"
limit 1;`,{bind: { number: number }})
    return results[0]
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
    const data = await sequelize.query(`SELECT avg(hp) as average_hp, "pokemons_abilities"."AbilityId" as ability_id, "abilities"."name" 
from "pokemons", "pokemons_abilities", "abilities"
where pokemons.id="pokemons_abilities"."PokemonId" and "pokemons_abilities"."AbilityId" = "abilities"."id" 
group by "pokemons_abilities"."AbilityId", "abilities"."name"
order by average_hp desc 
limit 1;`);
    return data[0][0]
}

const getAbilityWithAverageHigherAttack = async () => {
    const data = await sequelize.query(`SELECT avg(attack) as average_attack, "pokemons_abilities"."AbilityId" as ability_id, "abilities"."name" 
from "pokemons", "pokemons_abilities", "abilities"
where pokemons.id="pokemons_abilities"."PokemonId" and "pokemons_abilities"."AbilityId" = "abilities"."id" 
group by "pokemons_abilities"."AbilityId", "abilities"."name"
order by average_attack desc 
limit 1;`);
    return data[0][0]
}

const getAbilityWithAverageHigherDefense = async () => {
    const data = await sequelize.query(`SELECT avg(defense) as average_defense, "pokemons_abilities"."AbilityId" as ability_id, "abilities"."name" 
from "pokemons", "pokemons_abilities", "abilities"
where pokemons.id="pokemons_abilities"."PokemonId" and "pokemons_abilities"."AbilityId" = "abilities"."id" 
group by "pokemons_abilities"."AbilityId", "abilities"."name"
order by average_defense desc 
limit 1;`);
    return data[0][0]
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