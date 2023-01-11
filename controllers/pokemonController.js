const pool = require("../db");
const pokemonQueries = require("../queries/pokemonQueries");
const typeQueries = require("../queries/typeQueries");
const {Pokemon} = require("../models/index");
const abilityQueries = require("../queries/abilityQueries");
const pokemonService = require("../services/PokemonService");

const getAllPokemons = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemons(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByIdASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByIdASC(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByIdDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByIdDESC(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByName = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByName(page,size)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsWithTypes = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsWithTypes(page,size)
        res.status(200).json(data);
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

const getAllPokemonsWithAbilities = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsWithAbilities(page, size);
        res.status(200).json(data);
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByHpASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByHpASC(page, size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByHpDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByHpDESC(page, size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByAttackASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByAttackASC(page,size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByAttackDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByAttackDESC(page,size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByDefenseASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByDefenseASC(page,size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByDefenseDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByDefenseDESC(page,size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByGenerationASC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByGenerationASC(page,size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllPokemonsSortedByGenerationDESC = async (req, res) => {
    try {
        const { page, size } = req.query;
        const data = await pokemonService.getAllPokemonsSortedByGenerationDESC(page,size);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createNewPokemon = async (req, res) => {
    try {
        const checkIfNameExists = await Pokemon.findOne({where: {name:req.body.name}})
        if (checkIfNameExists) {
            throw new Error("name already exists in DB")
        }
        const pokemon = await pokemonService.createPokemon(req.body);
        res.status(201).json(pokemon);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    };
}

const getPokemon = async (req, res) => {
    try {
        if (!req.params.pokemonId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.pokemonId);
        const details = await pokemonService.getPokemonDetails(id)
        res.json(details);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updatePokemon = async (req, res) => {
    try {
        if (!req.params.pokemonId) return res.status(400).json('id not provided');
        const id = parseInt(req.params.pokemonId);
        const details = await pokemonService.updatePokemon(id, req.body, res);
        res.status(200).json({message: "pokemon updated successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deletePokemon = async (req, res) => {
    try {
        if (!req.params.pokemonId) return res.status(400).json('id not provided');
        const id = req.params.pokemonId;
        const data = await pokemonService.deletePokemon(id,res)
        res.status(200).send('Pokemon has been deleted');

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addTypeToPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.addTypeToPokemon(pokemonId,req.body,res);
        res.status(200).send("successfully added type to pokemon");

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteTypeFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.deleteTypeFromPokemon(pokemonId,req.body,res);
        res.status(200).send("successfully deleted type from pokemon");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addAbilityToPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.addAbilityToPokemon(pokemonId,req.body,res);
        res.status(200).send("successfully added ability to pokemon");

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteAbilityFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.deleteAbilityFromPokemon(pokemonId,req.body,res);
        res.status(200).send("successfully deleted ability from pokemon");
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports = {
    getPokemon,
    getAllPokemons,
    getAllPokemonsSortedByIdASC,
    getAllPokemonsSortedByIdDESC,
    getAllPokemonsWithTypes,
    getAllPokemonsSortedByName,
    getAllPokemonsWithAbilities,
    getAllPokemonsSortedByHpASC,
    getAllPokemonsSortedByHpDESC,
    getAllPokemonsSortedByAttackASC,
    getAllPokemonsSortedByAttackDESC,
    getAllPokemonsSortedByDefenseASC,
    getAllPokemonsSortedByDefenseDESC,
    getAllPokemonsSortedByGenerationASC,
    getAllPokemonsSortedByGenerationDESC,
    createNewPokemon,
    deletePokemon,
    updatePokemon,
    addTypeToPokemon,
    deleteTypeFromPokemon,
    addAbilityToPokemon,
    deleteAbilityFromPokemon,
}