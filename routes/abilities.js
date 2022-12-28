const express = require('express');
const router = express.Router();
const abilityController = require("../controllers/abiliyController");

router.get('/', abilityController.getAllAbilities);

router.post('/', abilityController.createNewAbility);

router.get('/ability/:abilityId', abilityController.getAbility);

router.put('/ability/:abilityId', abilityController.updateAbility);

router.delete('/ability/:abilityId', abilityController.deleteAbility);

module.exports = router;