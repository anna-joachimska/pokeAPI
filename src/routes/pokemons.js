const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get('/', pokemonController.getAllPokemons);

router.post('/', pokemonController.createNewPokemon);

router.get('/:pokemonId', pokemonController.getPokemon);

router.put('/:pokemonId',pokemonController.updatePokemon);

router.delete('/:pokemonId', pokemonController.deletePokemon);

router.post('/addTypeToPokemon/:pokemonId', pokemonController.addTypeToPokemon);

router.delete('/deleteTypeFromPokemon/:pokemonId', pokemonController.deleteTypeFromPokemon);

router.post('/addAbilityToPokemon/:pokemonId', pokemonController.addAbilityToPokemon);

router.delete('/deleteAbilityFromPokemon/:pokemonId', pokemonController.deleteAbilityFromPokemon);

module.exports = router;