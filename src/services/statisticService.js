const statisticRepository = require("../repositories/statisticRepository");
const {ValidationError} = require("../errors/customError");

const getTypeWithAverageHigherHp = () => statisticRepository.getTypeWithAverageHigherHp();

const getTypeWithAverageHigherAttack = () => statisticRepository.getTypeWithAverageHigherAttack();

const getTypeWithAverageHigherDefense = () => statisticRepository.getTypeWithAverageHigherDefense();

const countByType = (typeId) => {
    if(!typeId){
        throw new ValidationError("Not valid id provided");
    }
    return statisticRepository.countByType(typeId);
}

const countPokemonsWithMoreThanXType = (number) => {
    if (!number) {
        throw new ValidationError("You must pass a number of types to compare")
    }
    return statisticRepository.countPokemonsWithMoreThanXType(number);
}

const getMostPopularType = () => statisticRepository.getMostPopularType();

const countPokemonsInMostPopularType = () => statisticRepository.countPokemonsInMostPopularType();

const getAbilityWithAverageHigherHp = () => statisticRepository.getAbilityWithAverageHigherHp();

const getAbilityWithAverageHigherAttack = () => statisticRepository.getAbilityWithAverageHigherAttack();

const getAbilityWithAverageHigherDefense = () => statisticRepository.getAbilityWithAverageHigherDefense();

const countByAbility = (abilityId) => {
    if(!abilityId){
        throw new ValidationError("Not valid id provided")
    }
    return statisticRepository.countByAbility(abilityId);
}

const countPokemonsWithMoreXAbilities = (number) => {
    if(!number) {
        throw new ValidationError("You must pass a number of abilities to compare");
    }
    return statisticRepository.countPokemonsWithMoreThanXAbilities(number);
}

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