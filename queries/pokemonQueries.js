const getPokemons = "SELECT * FROM pokemons";
const getPokemonById = "SELECT * FROM pokemons WHERE id = $1";
const getPokemonByName = "SELECT * FROM pokemons WHERE name = $1";
const getPokemonsWithTypes = "SELECT pokemons.name as pokemon, types.name as type FROM pokemons, types, pokemons_types WHERE pokemon_id = pokemons.id AND type_id = types.id";
const checkIfPokemonNameExists = "SELECT * FROM pokemons WHERE name = $1";
const createPokemon = "INSERT INTO pokemons (name, hp, attack, defense, generation) VALUES ($1, $2, $3, $4, $5)";
const deletePokemon = "DELETE FROM pokemons WHERE id = $1";
const updatePokemon = "UPDATE pokemons SET name = $1, hp = $2, attack = $3, defense = $4, generation = $5 WHERE id = $6";
const addTypeToPokemon = "INSERT INTO pokemons_types (pokemon_id, type_id) VALUES ($1, $2)";
const deleteTypeFromPokemon = "DELETE FROM pokemons_types WHERE pokemon_id=$1 AND type_id = $2";

module.exports = {
    getPokemons,
    getPokemonById,
    getPokemonByName,
    getPokemonsWithTypes,
    checkIfPokemonNameExists,
    createPokemon,
    deletePokemon,
    updatePokemon,
    addTypeToPokemon,
    deleteTypeFromPokemon,
}