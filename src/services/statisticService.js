const statisticRepository = require("../repositories/statisticRepository");

const getTypeWithAverageHigherHp = () => statisticRepository.getTypeWithAverageHigherHp();

const getTypeWithAverageHigherAttack = () => statisticRepository.getTypeWithAverageHigherAttack();

const getTypeWithAverageHigherDefense = () => statisticRepository.getTypeWithAverageHigherDefense();

const countByType = (typeId) => statisticRepository.countByType(typeId);

const countPokemonsWithMoreThanXType = (number) => statisticRepository.countPokemonsWithMoreThanXType(number);

const getMostPopularType = () => statisticRepository.getMostPopularType();

const countPokemonsInMostPopularType = () => statisticRepository.countPokemonsInMostPopularType();

const getAbilityWithAverageHigherHp = () => statisticRepository.getAbilityWithAverageHigherHp();

const getAbilityWithAverageHigherAttack = () => statisticRepository.getAbilityWithAverageHigherAttack();

const getAbilityWithAverageHigherDefense = () => statisticRepository.getAbilityWithAverageHigherDefense();

const countByAbility = (abilityId) => statisticRepository.countByAbility(abilityId);

const countPokemonsWithMoreXAbilities = (number) => statisticRepository.countPokemonsWithMoreThanXAbilities(number);

const getMostPopularAbility = () => statisticRepository.getMostPopularAbility();

const countPokemonsInMostPopularAbility = () => statisticRepository.countPokemonsInMostPopularAbility();

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
    countPokemonsWithMoreXAbilities,
    getMostPopularAbility,
    countPokemonsInMostPopularAbility,
};