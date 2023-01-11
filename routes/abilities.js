const express = require('express');
const router = express.Router();
const abilityController = require("../controllers/abiliyController");

router.get('/', abilityController.getAllAbilities);

router.get('/sorted/byId/asc', abilityController.getAllAbilitiesSortedByIdASC);

router.get('/sorted/byId/desc', abilityController.getAllAbilitiesSortedByIdDESC);

router.get('/sorted/byName', abilityController.getAllAbilitiesSortedByName);

router.get('/withPokemons', abilityController.getAllAbilitiesWithPokemons);

router.post('/', abilityController.createNewAbility);

router.get('/:abilityId', abilityController.getAbility);

router.put('/:abilityId', abilityController.updateAbility);

router.delete('/:abilityId', abilityController.deleteAbility);

module.exports = router;