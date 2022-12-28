const getPokemons = "SELECT * FROM pokemons";
const getPokemonById = "SELECT * FROM pokemons WHERE id = $1";
const checkIfPokemonNameExists = "SELECT * FROM pokemons WHERE name = $1";
const createPokemon = "INSERT INTO pokemons (name, hp, attack, defense, generation) VALUES ($1, $2, $3, $4, $5)";
const deletePokemon = "DELETE FROM pokemons WHERE id = $1";
const updatePokemon = "UPDATE pokemons SET name = $1, hp = $2, attack = $3, defense = $4, generation = $5 WHERE id = $6";
// const addTypeToPokemon = "SELECT pokemon.id FROM pokemons INNER JOIN pokemons_types ON pokemon.id = pokemon.id;"

module.exports = {
    getPokemons,
    getPokemonById,
    checkIfPokemonNameExists,
    createPokemon,
    deletePokemon,
    updatePokemon,
}