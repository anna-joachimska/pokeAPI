const pool = require("../db");
const pokemonQueries = require("../queries/pokemonQueries");
const typeQueries = require("../queries/typeQueries");
const Pokemon = require("../models/Pokemon");
const abilityQueries = require("../queries/abilityQueries");

const getAllPokemons = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemons)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByName = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsSortedByName)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsWithTypes = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsWithTypes);
        res.status(200).json(data.rows);
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByTypeName = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsWithTypesSortedByTypeName)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsWithAbilities = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsWithAbilities);
        res.status(200).json(data.rows);
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByAbilityName = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsWithAbilitiesSortedByAbilityName)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByHp = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsSortedByHp)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByAttack = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsSortedByAttack)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByDefense = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsSortedByDefense)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByGeneration = async (req, res) => {
    try {
        const data = await pool.query(pokemonQueries.getPokemonsSortedByGeneration)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createNewPokemon = async (req, res) => {
    try {
        const { name, hp, attack, defense, generation} = req.body;
        const result = await pool.query(pokemonQueries.checkIfPokemonNameExists, [name.toLowerCase()]);
        if (result.rows.length){
            throw new Error("name already exists in DB")
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
        const data = await pool.query(pokemonQueries.getPokemonById, [pokemonId]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        const typeId = await pool.query(typeQueries.getTypeByName, [typeName]);
        await pool.query(pokemonQueries.addTypeToPokemon, [pokemonId, typeId.rows[0].id])
        res.status(200).send("successfully added type to pokemon");

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteTypeFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const { typeName } = req.body
        const data = await pool.query(pokemonQueries.getPokemonById, [pokemonId]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        const typeId = await pool.query(typeQueries.getTypeByName, [typeName]);
        await pool.query(pokemonQueries.deleteTypeFromPokemon, [pokemonId, typeId.rows[0].id])
        res.status(200).send("successfully deleted type from pokemon");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const addAbilityToPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        console.log(pokemonId)
        const { abilityName } = req.body
        console.log(abilityName)
        const data = await pool.query(pokemonQueries.getPokemonById, [pokemonId]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        const abilityId = await pool.query(abilityQueries.getAbilityByName, [abilityName]);
        await pool.query(pokemonQueries.addAbilityToPokemon, [pokemonId, abilityId.rows[0].id])
        res.status(200).send("successfully added ability to pokemon");

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteAbilityFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const { abilityName } = req.body
        const data = await pool.query(pokemonQueries.getPokemonById, [pokemonId]);
        if (!data.rows.length) return res.status(404).json('Pokemon not found');
        const abilityId = await pool.query(abilityQueries.getAbilityByName, [abilityName]);
        await pool.query(pokemonQueries.deleteAbilityFromPokemon, [pokemonId, abilityId.rows[0].id])
        res.status(200).send("successfully deleted ability from pokemon");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports = {
    getPokemon,
    getAllPokemons,
    getAllPokemonsWithTypes,
    getAllPokemonsSortedByTypeName,
    getAllPokemonsSortedByName,
    getAllPokemonsWithAbilities,
    getAllPokemonsSortedByAbilityName,
    getAllPokemonsSortedByHp,
    getAllPokemonsSortedByAttack,
    getAllPokemonsSortedByDefense,
    getAllPokemonsSortedByGeneration,
    createNewPokemon,
    deletePokemon,
    updatePokemon,
    addTypeToPokemon,
    deleteTypeFromPokemon,
    addAbilityToPokemon,
    deleteAbilityFromPokemon,
}