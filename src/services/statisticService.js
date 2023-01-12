const statisticRepository = require("../repositories/statisticRepository");

const getTypeWithAverageHigherHp = () => statisticRepository.getTypeWithAverageHigherHp();

const getTypeWithAverageHigherAttack = () => statisticRepository.getTypeWithAverageHigherAttack();

const getTypeWithAverageHigherDefense = () => statisticRepository.getTypeWithAverageHigherDefense();

const countByType = (typeId) => statisticRepository.countByType(typeId);

const countPokemonsWithMoreThanXType = (page, size,number) => statisticRepository.countPokemonsWithMoreThanXType(page, size,number);

const getMostPopularType = (page, size) => statisticRepository.getMostPopularType(page, size);

const countPokemonsInMostPopularType = (page,size) => statisticRepository.countPokemonsInMostPopularType(page,size);

const getAbilityWithAverageHigherHp = () => statisticRepository.getAbilityWithAverageHigherHp();

const getAbilityWithAverageHigherAttack = () => statisticRepository.getAbilityWithAverageHigherAttack();

const getAbilityWithAverageHigherDefense = () => statisticRepository.getAbilityWithAverageHigherDefense();

const countByAbility = (abilityId) => statisticRepository.countByAbility(abilityId);

const countPokemonsWithMoreXAbilities = (page, size, number) => statisticRepository.countPokemonsWithMoreThanXAbilities(page, size, number);

const getMostPopularAbility = (page, size) => statisticRepository.getMostPopularAbility(page, size);

const countPokemonsInMostPopularAbility = (page, size) => statisticRepository.countPokemonsInMostPopularAbility(page,size);

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