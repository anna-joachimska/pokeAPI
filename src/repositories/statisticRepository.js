const {Ability, Type} = require("../models");
const PokemonsAbilities = require("../models/Pokemons_Abilities");
const PokemonsTypes = require("../models/Pokemons_Types");
const sequelize = require("../../db");

const getTypeWithAverageHigherHp = async () => {
    const [results, metadata] = await sequelize.query(`SELECT AVG(hp) AS average_hp, "pokemons_types"."TypeId" AS type_id, "Types"."name" 
FROM "pokemons", "pokemons_types", "Types"
WHERE pokemons.id="pokemons_types"."PokemonId" AND "pokemons_types"."TypeId" = "Types"."id" 
GROUP BY "pokemons_types"."TypeId", "Types"."name"
ORDER BY average_hp desc 
LIMIT 1;`);
    return results[0]
}

const getTypeWithAverageHigherAttack = async () => {
    const [results, metadata] = await sequelize.query(`SELECT AVG(attack) AS average_attack, "pokemons_types"."TypeId" AS type_id, "Types"."name" 
FROM "pokemons", "pokemons_types", "Types"
WHERE pokemons.id="pokemons_types"."PokemonId" AND "pokemons_types"."TypeId" = "Types"."id" 
GROUP BY "pokemons_types"."TypeId", "Types"."name"
ORDER BY average_attack desc 
LIMIT 1;`);
    return results[0]
}

const getTypeWithAverageHigherDefense = async () => {
    const [results, metadata] = await sequelize.query(`SELECT AVG(defense) AS average_defense, "pokemons_types"."TypeId" AS type_id, "Types"."name" 
FROM "pokemons", "pokemons_types", "Types"
WHERE pokemons.id="pokemons_types"."PokemonId" AND "pokemons_types"."TypeId" = "Types"."id" 
GROUP BY "pokemons_types"."TypeId", "Types"."name"
ORDER BY average_defense desc 
LIMIT 1;`);
    return results[0]
}

const countByType = async (typeId) => {
    const count = await PokemonsTypes.count({where:{TypeId:typeId}});
    const type = await Type.findOne({where:{id:typeId}});
    return {count,type}
}

const countPokemonsWithMoreThanXType = async(number) => {
    const [results, metadata] = await sequelize.query(`SELECT count("pokemons"."id") AS pokemons_count  FROM (SELECT count("pokemons_types"."TypeId") AS "count", "pokemons"."id"
FROM "pokemons_types", "pokemons" where pokemons.id="pokemons_types"."PokemonId" 
GROUP BY "pokemons"."id") AS types_count, pokemons WHERE count >$number GROUP BY "types_count"."count", "pokemons"."id"
LIMIT 1;`,{bind: { number: number }})
    return results[0]
}

const getMostPopularType = async () => {
    const [result, metadata] = await sequelize.query(`SELECT "id", "name" FROM (SELECT max("count"), "id", "name" FROM (SELECT count("pokemons"."id") AS "count", "pokemons_types"."TypeId"
FROM "pokemons_types", "pokemons" WHERE pokemons.id="pokemons_types"."PokemonId" 
GROUP BY "pokemons_types"."TypeId" 
ORDER BY "count" desc) most_popular_types, "Types"
WHERE "Types"."id" = "most_popular_types"."TypeId"
GROUP BY "id" 
ORDER BY "max" desc 
LIMIT 1) "most_popular_type";`)
    return result[0];
}

const countPokemonsInMostPopularType = async () => {
    const [result, metadata] = await sequelize.query(`SELECT max("count") AS pokemons_count, "id", "name" FROM (SELECT count("pokemons"."id") AS "count", "pokemons_types"."TypeId"
FROM "pokemons_types", "pokemons" WHERE pokemons.id="pokemons_types"."PokemonId" 
GROUP BY "pokemons_types"."TypeId" 
ORDER BY "count" desc) most_popular_types, "Types"
WHERE "Types"."id" = "most_popular_types"."TypeId"
GROUP BY "id" 
ORDER BY "pokemons_count" desc 
LIMIT 1;`)
    return result[0];
}

const getAbilityWithAverageHigherHp = async () => {
    const [results, metadata] = await sequelize.query(`SELECT AVG(hp) AS average_hp, "pokemons_abilities"."AbilityId" AS ability_id, "abilities"."name" 
FROM "pokemons", "pokemons_abilities", "abilities"
WHERE pokemons.id="pokemons_abilities"."PokemonId" AND "pokemons_abilities"."AbilityId" = "abilities"."id" 
GROUP BY "pokemons_abilities"."AbilityId", "abilities"."name"
ORDER BY average_hp desc 
LIMIT 1;`);
    return results[0]
}

const getAbilityWithAverageHigherAttack = async () => {
    const [results, metadata] = await sequelize.query(`SELECT avg(attack) AS average_attack, "pokemons_abilities"."AbilityId" AS ability_id, "abilities"."name" 
FROM "pokemons", "pokemons_abilities", "abilities"
WHERE pokemons.id="pokemons_abilities"."PokemonId" AND "pokemons_abilities"."AbilityId" = "abilities"."id" 
GROUP BY "pokemons_abilities"."AbilityId", "abilities"."name"
ORDER BY average_attack desc 
LIMIT 1;`);
    return results[0]
}

const getAbilityWithAverageHigherDefense = async () => {
    const [results, metadata] = await sequelize.query(`SELECT avg(defense) AS average_defense, "pokemons_abilities"."AbilityId" AS ability_id, "abilities"."name" 
FROM "pokemons", "pokemons_abilities", "abilities"
WHERE pokemons.id="pokemons_abilities"."PokemonId" AND "pokemons_abilities"."AbilityId" = "abilities"."id" 
GROUP BY "pokemons_abilities"."AbilityId", "abilities"."name"
ORDER BY average_defense desc 
LIMIT 1;`);
    return results[0]
}

const countByAbility = async (abilityId) => {
    const count = await PokemonsAbilities.count({where:{AbilityId:abilityId}});
    const ability = await Ability.findOne({where:{id:abilityId}});
    return {count,ability}
}

const countPokemonsWithMoreThanXAbilities = async (number) => {
    const [results, metadata] = await sequelize.query(`SELECT count("pokemons"."id") AS pokemons_count FROM (SELECT count("pokemons_abilities"."AbilityId") AS "count", "pokemons"."id"
FROM "pokemons_abilities", "pokemons" WHERE pokemons.id="pokemons_abilities"."PokemonId" 
GROUP BY "pokemons"."id") AS abilities_count, pokemons WHERE count >$number GROUP BY "abilities_count"."count", "pokemons"."id"
LIMIT 1;`,{bind: { number: number }})
    return results[0];
}

const getMostPopularAbility = async () => {
   const [result, metadata] = await sequelize.query(`SELECT "id", "name" FROM (SELECT max("count"), "id", "name" FROM (SELECT count("pokemons"."id") AS "count", "pokemons_abilities"."AbilityId"
FROM "pokemons_abilities", "pokemons" where pokemons.id="pokemons_abilities"."PokemonId" 
GROUP BY "pokemons_abilities"."AbilityId" 
ORDER BY "count" desc) most_popular_abilities, "abilities"
WHERE "abilities"."id" = "most_popular_abilities"."AbilityId"
GROUP BY "id" 
ORDER BY "max" desc 
LIMIT 1) "most_popular_ability";`)
    return result[0];
}

const countPokemonsInMostPopularAbility = async () => {
    const [result, metadata] = await sequelize.query(`SELECT max("count") AS pokemons_count, "id", "name" FROM (SELECT count("pokemons"."id") AS "count", "pokemons_abilities"."AbilityId"
FROM "pokemons_abilities", "pokemons" where pokemons.id="pokemons_abilities"."PokemonId" 
GROUP BY "pokemons_abilities"."AbilityId" 
ORDER BY "count" desc) most_popular_ability, "abilities"
WHERE "abilities"."id" = "most_popular_ability"."AbilityId"
GROUP BY "id" 
ORDER BY "pokemons_count" desc 
LIMIT 1;`)
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