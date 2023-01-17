const express = require('express');
const router = express.Router();
const abilityController = require("../controllers/abilityController");

router.get('/', abilityController.getAllAbilities);

router.post('/', abilityController.createNewAbility);

router.get('/:abilityId', abilityController.getAbility);

router.put('/:abilityId', abilityController.updateAbility);

router.delete('/:abilityId', abilityController.deleteAbility);

module.exports = router;