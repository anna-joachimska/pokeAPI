const pool = require("../db");
const pokemonQueries = require("../queries/pokemonQueries");
const Pokemon = require("../models/Pokemon");

const getAllPokemons = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemons)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewPokemon = async (req, res) => {
    try {
        const { name, hp, attack, defense, generation} = req.body;
        const result = await pool.query(pokemonQueries.checkIfPokemonNameExists, [name]);
        if (result.rows.length){
            res.send("name already exists in DB")
        }
        const pokemon = new Pokemon({name, hp, attack, defense, generation});
        const data = await pokemon.createPokemon();
        res.status(201).send(pokemon);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}

const getPokemon = async (req, res) => {
    try {
        if (!req.params.pokemonId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.pokemonId);
        const data = await pool.query(pokemonQueries.getPokemonById, [id]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updatePokemon = async (req, res) => {
    try {
        if (!req.params.pokemonId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.pokemonId);
        const { name, hp, attack, defense, generation} = req.body;
        const data = await pool.query(pokemonQueries.getPokemonById, [id]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        await pool.query(pokemonQueries.updatePokemon, [name, hp, attack, defense, generation, id])
        res.status(200).send("Pokemon updated successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deletePokemon = async (req, res) => {
    try {
        if (!req.params.pokemonId) return res.status(400).json('id not provided');
        const id = req.params.pokemonId;
        const data = await pool.query(pokemonQueries.getPokemonById, [id])
        if (!data.rows.length) {
            return res.status(404).json({message: 'Pokemon not found'});
        }
        await pool.query(pokemonQueries.deletePokemon, [id])
        res.status(200).send('Pokemon has been deleted');

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addTypeToPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const { typeName } = req.body
        const data = await pool.query(pokemonQueries.getPokemonById, [id]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        // const result = await pool.query(typeQueries.checkIfTypeNameExists, [typeName]);
        // if (result.rows.length){
        //     res.send("name already exists in DB")
        // }

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteTypeFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const { typeName } = req.body
        const data = await pool.query(pokemonQueries.getPokemonById, [id]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        // const result = await pool.query(typeQueries.checkIfTypeNameExists, [typeName]);
        // if (result.rows.length){
        //     res.send("name already exists in DB")
        // }

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getPokemon,
    getAllPokemons,
    createNewPokemon,
    deletePokemon,
    updatePokemon,
    addTypeToPokemon,
    deleteTypeFromPokemon
}