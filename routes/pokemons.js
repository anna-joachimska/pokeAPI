const express = require('express');
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get('/', pokemonController.getAllPokemons);

router.get('/sorted/byId/asc', pokemonController.getAllPokemonsSortedByIdASC);

router.get('/sorted/byId/desc', pokemonController.getAllPokemonsSortedByIdDESC);

router.get('/sorted/byName', pokemonController.getAllPokemonsSortedByName);

router.get('/withTypes', pokemonController.getAllPokemonsWithTypes);

router.get('/withAbilities', pokemonController.getAllPokemonsWithAbilities);

router.get('/sorted/byHp/asc', pokemonController.getAllPokemonsSortedByHpASC);

router.get('/sorted/byHp/desc', pokemonController.getAllPokemonsSortedByHpDESC);

router.get('/sorted/byAttack/asc', pokemonController.getAllPokemonsSortedByAttackASC);

router.get('/sorted/byAttack/desc', pokemonController.getAllPokemonsSortedByAttackDESC);

router.get('/sorted/byDefense/asc', pokemonController.getAllPokemonsSortedByDefenseASC);

router.get('/sorted/byDefense/desc', pokemonController.getAllPokemonsSortedByDefenseDESC);

router.get('/sorted/byGeneration/asc', pokemonController.getAllPokemonsSortedByGenerationASC);

router.get('/sorted/byGeneration/desc', pokemonController.getAllPokemonsSortedByGenerationDESC);

router.post('/', pokemonController.createNewPokemon);

router.get('/:pokemonId', pokemonController.getPokemon);

router.put('/:pokemonId',pokemonController.updatePokemon);

router.delete('/:pokemonId', pokemonController.deletePokemon);

router.post('/addTypeToPokemon/:pokemonId', pokemonController.addTypeToPokemon);

router.delete('/deleteTypeFromPokemon/:pokemonId', pokemonController.deleteTypeFromPokemon);

router.post('/addAbilityToPokemon/:pokemonId', pokemonController.addAbilityToPokemon);

router.delete('/deleteAbilityFromPokemon/:pokemonId', pokemonController.deleteAbilityFromPokemon);

module.exports = router;