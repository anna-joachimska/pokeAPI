const pool = require("../db");
const abilityQueries = require("../queries/abilityQueries");
const Ability = require("../models/Ability");
const pokemonQueries = require("../queries/pokemonQueries");
const typeQueries = require("../queries/typeQueries");

const getAllAbilities = async (req, res) => {
    try {
        const data = await pool.query(abilityQueries.getAbilities)
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNewAbility = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query(abilityQueries.checkIfAbilityNameExists, [name]);
        if (result.rows.length){
            res.send("name already exists in DB")
        }
        const ability = new Ability({name});
        await ability.createAbility();
        res.status(201).send(ability);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}

const getAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.abilityId);
        const data = await pool.query(abilityQueries.getAbilityById, [id]);
        if (!data.rows.length) return res.status(404).json('Ability not found');
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updateAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.abilityId);
        const { name } = req.body;
        const data = await pool.query(abilityQueries.getAbilityById, [id]);
        if (!data.rows.length) return res.status(404).json('Ability not found');
        await pool.query(abilityQueries.updateAbilities, [name, id])
        res.status(200).send("Ability updated successfully");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteAbility = async (req, res) => {
    try {
        if (!req.params.abilityId) return res.status(400).json('id not provided');
        const id = req.params.abilityId;
        const data = await pool.query(abilityQueries.getAbilityById, [id])
        if (!data.rows.length) {
            return res.status(404).json({message: 'Ability not found'});
        }
        const pokemonsWithAbilities = await pool.query(pokemonQueries.checkIfAnyPokemonHaveAbility, [id])
        console.log(pokemonsWithAbilities.rows.length);
        if (!pokemonsWithAbilities.rows.length) {
            await pool.query(abilityQueries.deleteAbility, [id])
            res.status(200).send('Ability has been deleted');
        }
        return res.status(400).send('Ability cannot be deleted');

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getAbility,
    getAllAbilities,
    createNewAbility,
    updateAbility,
    deleteAbility,
}