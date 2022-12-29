const getPokemons = "SELECT * FROM pokemons LIMIT $2 OFFSET (($1 - 1) * $2)";
const getPokemonsSortedByName = "SELECT * FROM pokemons ORDER BY pokemons.name LIMIT $2 OFFSET (($1 - 1) * $2)";

const getPokemonsWithTypes = "SELECT pokemons.name as pokemon, types.name as type FROM pokemons, types, pokemons_types WHERE pokemon_id = pokemons.id AND type_id = types.id LIMIT $2 OFFSET (($1 - 1) * $2)";
const getPokemonsWithTypesSortedByTypeName = "SELECT pokemons.name as pokemon, types.name as type FROM pokemons, types, pokemons_types WHERE pokemon_id = pokemons.id AND type_id = types.id ORDER BY types.name LIMIT $2 OFFSET (($1 - 1) * $2)";

const getPokemonsWithAbilities = "SELECT pokemons.name as pokemon, abilities.name as ability FROM pokemons, abilities, pokemons_abilities WHERE pokemon_id = pokemons.id AND ability_id = abilities.id LIMIT $2 OFFSET (($1 - 1) * $2)";
const getPokemonsWithAbilitiesSortedByAbilityName = "SELECT pokemons.name as pokemon, abilities.name as ability FROM pokemons, abilities, pokemons_abilities WHERE pokemon_id = pokemons.id AND ability_id = abilities.id ORDER BY abilities.name LIMIT $2 OFFSET (($1 - 1) * $2)";

const getPokemonsSortedByHp = "SELECT * FROM pokemons ORDER BY pokemons.hp DESC LIMIT $2 OFFSET (($1 - 1) * $2)";
const getPokemonsSortedByAttack = "SELECT * FROM pokemons ORDER BY pokemons.attack DESC LIMIT $2 OFFSET (($1 - 1) * $2)";
const getPokemonsSortedByDefense = "SELECT * FROM pokemons ORDER BY pokemons.defense DESC LIMIT $2 OFFSET (($1 - 1) * $2)";
const getPokemonsSortedByGeneration = "SELECT * FROM pokemons ORDER BY pokemons.generation DESC LIMIT $2 OFFSET (($1 - 1) * $2)";

const getPokemonById = "SELECT * FROM pokemons WHERE id = $1";
const getPokemonByName = "SELECT * FROM pokemons WHERE name = $1";

const checkIfPokemonNameExists = "SELECT * FROM pokemons WHERE name = $1";
const checkIfAnyPokemonHaveAbility = "SELECT * FROM pokemons_abilities WHERE ability_id = $1";

const createPokemon = "INSERT INTO pokemons (name, hp, attack, defense, generation) VALUES ($1, $2, $3, $4, $5)";
const deletePokemon = "DELETE FROM pokemons WHERE id = $1";
const updatePokemon = "UPDATE pokemons SET name = $1, hp = $2, attack = $3, defense = $4, generation = $5 WHERE id = $6";

const addTypeToPokemon = "INSERT INTO pokemons_types (pokemon_id, type_id) VALUES ($1, $2)";
const deleteTypeFromPokemon = "DELETE FROM pokemons_types WHERE pokemon_id=$1 AND type_id = $2";

const addAbilityToPokemon = "INSERT INTO pokemons_abilities (pokemon_id, ability_id) VALUES ($1, $2)";
const deleteAbilityFromPokemon = "DELETE FROM pokemons_abilities WHERE pokemon_id=$1 AND ability_id = $2";

module.exports = {
    getPokemons,
    getPokemonById,
    getPokemonByName,
    getPokemonsWithTypes,
    getPokemonsWithTypesSortedByTypeName,
    getPokemonsSortedByName,
    getPokemonsWithAbilities,
    getPokemonsWithAbilitiesSortedByAbilityName,
    getPokemonsSortedByHp,
    getPokemonsSortedByAttack,
    getPokemonsSortedByDefense,
    getPokemonsSortedByGeneration,
    checkIfPokemonNameExists,
    checkIfAnyPokemonHaveAbility,
    createPokemon,
    deletePokemon,
    updatePokemon,
    addTypeToPokemon,
    deleteTypeFromPokemon,
    addAbilityToPokemon,
    deleteAbilityFromPokemon,
}