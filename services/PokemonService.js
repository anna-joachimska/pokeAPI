const pokemonDal = require("../dataAccessLayer/pokemonDal");

const getPokemonDetails = (id) => pokemonDal.getPokemonDetails(id)

// const createPokemon = (body) => {
//         const { name, hp, attack, defense, generation} = body;
//         const pokemon = {
//             name,
//             hp,
//             attack,
//             defense,
//             generation
//         };
//         return pokemonDal.createPokemon(pokemon);
//     };
//
const updatePokemon = (id, body) => {

    return pokemonDal.updatePokemon(id, body);
    };

const deletePokemon = (id) => pokemonDal.deletePokemon(id);


module.exports = {
    getPokemonDetails,
    updatePokemon,
    deletePokemon,
};