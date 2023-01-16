const express = require('express');
const router = express.Router();
const typeController = require("../controllers/typeController");

router.get('/', typeController.getAllTypes);

router.post('/', typeController.createNewType);

router.get('/:typeId', typeController.getType);

router.put('/:typeId', typeController.updateType);

router.delete('/:typeId', typeController.deleteType);

module.exports = router;