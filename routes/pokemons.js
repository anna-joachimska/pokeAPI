const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get('/', pokemonController.getAllPokemons);

router.post('/', pokemonController.createNewPokemon);

router.get('/pokemon/:pokemonId', pokemonController.getPokemon);

router.put('/pokemon/:pokemonId',pokemonController.updatePokemon);

router.delete('/pokemon/:pokemonId', pokemonController.deletePokemon);

router.post('/addTypeToPokemon/:pokemonId', pokemonController.addTypeToPokemon);

router.delete('/deleteTypeToPokemon/:pokemonId', pokemonController.deleteTypeFromPokemon);

// router.post('/addAbilityToPokemon/:pokemonId', pokemonController.addAbilityToPokemon);
//
// router.delete('/deleteAbilityToPokemon/:pokemonId', pokemonController.deleteAbilityFromPokemon);

module.exports = router;