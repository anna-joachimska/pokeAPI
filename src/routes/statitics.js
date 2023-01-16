const express = require('express');
const router = express.Router();
const statisticController = require("../controllers/statisticController");

router.get('/type/withAverageHigher/hp', statisticController.getTypeWithAverageHigherHp);

router.get('/type/withAverageHigher/attack', statisticController.getTypeWithAverageHigherAttack);

router.get('/type/withAverageHigher/defense', statisticController.getTypeWithAverageHigherDefense);

router.get('/ability/withAverageHigher/hp', statisticController.getAbilityWithAverageHigherHp);

router.get('/ability/withAverageHigher/attack', statisticController.getAbilityWithAverageHigherAttack);

router.get('/ability/withAverageHigher/defense', statisticController.getAbilityWithAverageHigherDefense);

router.get('/count/byType/:typeId',statisticController.countByType);

router.get('/count/byAbility/:abilityId', statisticController.countByAbility);

router.get('/count/pokemonsWithMoreThan/:X/types', statisticController.countPokemonsWithMoreThanXType);

router.get('/count/pokemonsWithMoreThan/:X/abilities', statisticController.countPokemonsWithMoreThanXAbilities);

router.get('/mostPopular/type', statisticController.getMostPopularType);

router.get('/mostPopular/ability', statisticController.getMostPopularAbility);

router.get('/count/mostPopular/type', statisticController.countPokemonsInMostPopularType);

router.get('/count/mostPopular/ability', statisticController.countPokemonsInMostPopularAbility);

module.exports = router;