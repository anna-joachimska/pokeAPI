const request = require('request');
const baseApiUrl = 'http://localhost:8888/pokemons'
const sequelize = require("../db");
// const pool = require("../db");
const pokemonQueries = require("../queries/pokemonQueries");

const getPokemonDetails = async (id) => {
    const data = await sequelize.query(pokemonQueries.getPokemonById, [id]);
    if (!data.rows.length) return res.status(404).json('Pokemon not found');
    return data.rows
}
const updatePokemon = async (id, body) => {
    const { name, hp, attack, defense, generation} = body;
    const data = await pool.query(pokemonQueries.getPokemonById, [id]);
    if (!data.rows.length) return res.status(404).json('Pokemon not found');
    await pool.query(pokemonQueries.updatePokemon,
        [name || data.rows[0].name, hp || data.rows[0].hp , attack || data.rows[0].attack,
            defense || data.rows[0].defense, generation || data.rows[0].generation, id])

}
const deletePokemon = async (id) => {
    const data = await pool.query(pokemonQueries.getPokemonById, [id])
    if (!data.rows.length) {
        return res.status(404).json({message: 'Pokemon not found'});
    }
    await pool.query(pokemonQueries.deletePokemon, [id])
}
module.exports={
    getPokemonDetails,
    updatePokemon,
    deletePokemon}
//
// module.exports = () => ({
//     getPokemonDetails: (id) => {
//         new Promise((resolve, reject) => {
//             request({
//                 uri: `${baseApiUrl}/${id}`,
//                 method: 'GET',
//                 json: true,
//             }, (err, r, body) => {
//                 const { id, name, hp, attack, defense, generation} = body;
//                 const pokemon = {
//                     id,
//                     name,
//                     hp,
//                     attack,
//                     defense,
//                     generation,
//                 };
//
//                 if (err || r.statusCode !== 200) {
//                     return reject(err);
//                 }
//                 return resolve({
//                     status: 'success',
//                     pokemon,
//                 });
//             });
//         })
//     },
//
//     createPokemon: (body) => new Promise((resolve, reject) => {
//         request({
//             uri: baseApiUrl,
//             method: 'POST',
//             body,
//             json: true,
//         }, (err, r, b) => {
//             if (err || r.statusCode !== 201) {
//                 return reject(err);
//             }
//             return resolve(b);
//         });
//     }),
//
//     updatePokemon: (id, body) => new Promise((resolve, reject) => {
//         request({
//             uri: `${baseApiUrl}/${id}`,
//             method: 'PUT',
//             body,
//             json: true,
//         }, (err, r, b) => {
//             if (err || r.statusCode !== 200) {
//                 return reject(err);
//             }
//
//             return resolve({
//                 status: 'success',
//                 post: b,
//             });
//         });
//     }),
//
//     deletePokemon: (id) => new Promise((resolve, reject) => {
//         request({
//             uri: `${baseApiUrl}/${id}`,
//             method: 'DELETE',
//             json: true,
//         }, (err, r) => {
//             if (err || r.statusCode !== 200) {
//                 return reject(err);
//             }
//             return resolve({ status: 'OK' });
//         });
//     }),
// });