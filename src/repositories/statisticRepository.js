const {Ability, Type} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const PokemonsTypes = require("../models/Pokemons_Types");
const sequelize = require("../../db");

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
    const [results, metadata] = await sequelize.query(`SELECT avg(attack) as average_attack, "pokemons_types"."TypeId" as type_id, "Types"."name" 
from "pokemons", "pokemons_types", "Types"
where pokemons.id="pokemons_types"."PokemonId" and "pokemons_types"."TypeId" = "Types"."id" 
group by "pokemons_types"."TypeId", "Types"."name"
order by average_attack desc 
limit 1;`);
    return results[0]
}

const getTypeWithAverageHigherDefense = async () => {
    const [results, metadata] = await sequelize.query(`SELECT avg(defense) as average_defense, "pokemons_types"."TypeId" as type_id, "Types"."name" 
from "pokemons", "pokemons_types", "Types"
where pokemons.id="pokemons_types"."PokemonId" and "pokemons_types"."TypeId" = "Types"."id" 
group by "pokemons_types"."TypeId", "Types"."name"
order by average_defense desc 
limit 1;`);
    return results[0]
}

const countByType = async (typeId) => {
    const count = await PokemonsTypes.count({where:{TypeId:typeId}});
    const type = await Type.findOne({where:{id:typeId}});
    return {count,type}
}

const countPokemonsWithMoreThanXType = async(number) => {
    const [results, metadata] = await sequelize.query(`SELECT count("pokemons"."id") as pokemons_count  from (SELECT count("pokemons_types"."TypeId") as "count", "pokemons"."id"
from "pokemons_types", "pokemons" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons"."id") as types_count, pokemons WHERE count >$number group by "types_count"."count", "pokemons"."id"
limit 1;`,{bind: { number: number }})
    return results[0]
}

const getMostPopularType = async () => {
    const [result, metadata] = await sequelize.query(`SELECT "id", "name" from (SELECT max("count"), "id", "name" from (SELECT count("pokemons"."id") as "count", "pokemons_types"."TypeId"
from "pokemons_types", "pokemons" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons_types"."TypeId" 
order by "count" desc) most_popular_types, "Types"
WHERE "Types"."id" = "most_popular_types"."TypeId"
group by "id" 
order by "max" desc 
limit 1) "most_popular_type";`)
    return result[0];
}

const countPokemonsInMostPopularType = async () => {
    const [result, metadata] = await sequelize.query(`SELECT max("count") as pokemons_count, "id", "name" from (SELECT count("pokemons"."id") as "count", "pokemons_types"."TypeId"
from "pokemons_types", "pokemons" where pokemons.id="pokemons_types"."PokemonId" 
group by "pokemons_types"."TypeId" 
order by "count" desc) most_popular_types, "Types"
WHERE "Types"."id" = "most_popular_types"."TypeId"
group by "id" 
order by "pokemons_count" desc 
limit 1;`)
    return result[0];
}

const getAbilityWithAverageHigherHp = async () => {
    const [results, metadata] = await sequelize.query(`SELECT avg(hp) as average_hp, "pokemons_abilities"."AbilityId" as ability_id, "abilities"."name" 
from "pokemons", "pokemons_abilities", "abilities"
where pokemons.id="pokemons_abilities"."PokemonId" and "pokemons_abilities"."AbilityId" = "abilities"."id" 
group by "pokemons_abilities"."AbilityId", "abilities"."name"
order by average_hp desc 
limit 1;`);
    return results[0]
}

const getAbilityWithAverageHigherAttack = async () => {
    const [results, metadata] = await sequelize.query(`SELECT avg(attack) as average_attack, "pokemons_abilities"."AbilityId" as ability_id, "abilities"."name" 
from "pokemons", "pokemons_abilities", "abilities"
where pokemons.id="pokemons_abilities"."PokemonId" and "pokemons_abilities"."AbilityId" = "abilities"."id" 
group by "pokemons_abilities"."AbilityId", "abilities"."name"
order by average_attack desc 
limit 1;`);
    return results[0]
}

const getAbilityWithAverageHigherDefense = async () => {
    const [results, metadata] = await sequelize.query(`SELECT avg(defense) as average_defense, "pokemons_abilities"."AbilityId" as ability_id, "abilities"."name" 
from "pokemons", "pokemons_abilities", "abilities"
where pokemons.id="pokemons_abilities"."PokemonId" and "pokemons_abilities"."AbilityId" = "abilities"."id" 
group by "pokemons_abilities"."AbilityId", "abilities"."name"
order by average_defense desc 
limit 1;`);
    return results[0]
}

const countByAbility = async (abilityId) => {
    const count = await PokemonsAbilities.count({where:{AbilityId:abilityId}});
    const ability = await Ability.findOne({where:{id:abilityId}});
    return {count,ability}
}

const countPokemonsWithMoreThanXAbilities = async (number) => {
    const [results, metadata] = await sequelize.query(`SELECT count("pokemons"."id") as pokemons_count  from (SELECT count("pokemons_abilities"."AbilityId") as "count", "pokemons"."id"
from "pokemons_abilities", "pokemons" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons"."id") as abilities_count, pokemons WHERE count >$number group by "abilities_count"."count", "pokemons"."id"
limit 1;`,{bind: { number: number }})
    return results[0];
}

const getMostPopularAbility = async () => {
   const [result, metadata] = await sequelize.query(`SELECT "id", "name" from (SELECT max("count"), "id", "name" from (SELECT count("pokemons"."id") as "count", "pokemons_abilities"."AbilityId"
from "pokemons_abilities", "pokemons" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons_abilities"."AbilityId" 
order by "count" desc) most_popular_abilities, "abilities"
WHERE "abilities"."id" = "most_popular_abilities"."AbilityId"
group by "id" 
order by "max" desc 
limit 1) "most_popular_ability";`)
    return result[0];
}

const countPokemonsInMostPopularAbility = async () => {
    const [result, metadata] = await sequelize.query(`SELECT max("count") as pokemons_count, "id", "name" from (SELECT count("pokemons"."id") as "count", "pokemons_abilities"."AbilityId"
from "pokemons_abilities", "pokemons" where pokemons.id="pokemons_abilities"."PokemonId" 
group by "pokemons_abilities"."AbilityId" 
order by "count" desc) most_popular_ability, "abilities"
WHERE "abilities"."id" = "most_popular_ability"."AbilityId"
group by "id" 
order by "pokemons_count" desc 
limit 1;`)
    return result[0];
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