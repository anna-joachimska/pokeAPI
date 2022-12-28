const express = require('express');
const router = express.Router();
const typeController = require("../controllers/typeController");

router.get('/', typeController.getAllTypes);

router.post('/', typeController.createNewType);

router.get('/type/:typeId', typeController.getType);

router.put('/type/:typeId', typeController.updateType);

router.delete('/type/:typeId', typeController.deleteType);

module.exports = router;