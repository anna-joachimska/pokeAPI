const express = require('express');
const router = express.Router();
const statisticController = require("../controllers/statisticController");

router.get('/type/withAverageHighest/hp', statisticController.getTypeWithAverageHigherHp);

router.get('/type/withAverageHighest/attack', statisticController.getTypeWithAverageHigherAttack);

router.get('/type/withAverageHighest/defense', statisticController.getTypeWithAverageHigherDefense);

router.get('/ability/withAverageHighest/hp', statisticController.getAbilityWithAverageHigherHp);

router.get('/ability/withAverageHighest/attack', statisticController.getAbilityWithAverageHigherAttack);

router.get('/ability/withAverageHighest/defense', statisticController.getAbilityWithAverageHigherDefense);

router.get('/count/byType/:typeId',statisticController.countByType);

router.get('/count/byAbility/:abilityId', statisticController.countByAbility);

router.get('/count/pokemonsWithMoreThan/:X/types', statisticController.countPokemonsWithMoreThanXType);

router.get('/count/pokemonsWithMoreThan/:X/abilities', statisticController.countPokemonsWithMoreThanXAbilities);

router.get('/mostPopular/type', statisticController.getMostPopularType);

router.get('/mostPopular/ability', statisticController.getMostPopularAbility);

router.get('/count/mostPopular/type', statisticController.countPokemonsInMostPopularType);

router.get('/count/mostPopular/ability', statisticController.countPokemonsInMostPopularAbility);

module.exports = router;