const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get('/', pokemonController.getAllPokemons);

router.get('/sorted/byName', pokemonController.getAllPokemonsSortedByName);

router.get('/withTypes', pokemonController.getAllPokemonsWithTypes);

router.get('/sorted/byTypeName', pokemonController.getAllPokemonsSortedByTypeName);

router.get('/withAbilities', pokemonController.getAllPokemonsWithAbilities);

router.get('/sorted/byAbilityName', pokemonController.getAllPokemonsSortedByAbilityName);

router.get('/sorted/byHp', pokemonController.getAllPokemonsSortedByHp);

router.get('/sorted/byAttack', pokemonController.getAllPokemonsSortedByAttack);

router.get('/sorted/byDefense', pokemonController.getAllPokemonsSortedByDefense);

router.get('/sorted/byGeneration', pokemonController.getAllPokemonsSortedByGeneration);

router.post('/', pokemonController.createNewPokemon);

router.get('/:pokemonId', pokemonController.getPokemon);

router.put('/:pokemonId',pokemonController.updatePokemon);

router.delete('/:pokemonId', pokemonController.deletePokemon);

router.post('/addTypeToPokemon/:pokemonId', pokemonController.addTypeToPokemon);

router.delete('/deleteTypeFromPokemon/:pokemonId', pokemonController.deleteTypeFromPokemon);

router.post('/addAbilityToPokemon/:pokemonId', pokemonController.addAbilityToPokemon);

router.delete('/deleteAbilityToPokemon/:pokemonId', pokemonController.deleteAbilityFromPokemon);

module.exports = router;