const express = require('express');
const router = express.Router();
const typeController = require("../controllers/typeController");

router.get('/', typeController.getAllTypes);

router.get('/sorted/byId/asc', typeController.getAllTypesSortedByIdASC);

router.get('/sorted/byId/desc', typeController.getAllTypesSortedByIdDESC);

router.get('/sorted/byName', typeController.getAllTypesSortedByName);

router.get('/withPokemons', typeController.getAllTypesWithPokemons);

router.post('/', typeController.createNewType);

router.get('/:typeId', typeController.getType);

router.put('/:typeId', typeController.updateType);

router.delete('/:typeId', typeController.deleteType);

module.exports = router;