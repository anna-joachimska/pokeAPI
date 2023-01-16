const pokemonService = require("../services/PokemonService");

const getAllPokemons = async (req, res) => {
    try {
        const { page, size, sortBy , direction} = req.query;
        const data = await pokemonService.getAllPokemons(page,size,sortBy,direction)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createNewPokemon = async (req, res) => {
    try {
        const pokemon = await pokemonService.createPokemon(req.body,res);
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
        res.status(200).json(details);
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
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteTypeFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.deleteTypeFromPokemon(pokemonId,req.body,res);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addAbilityToPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.addAbilityToPokemon(pokemonId,req.body,res);
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteAbilityFromPokemon = async (req, res) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.deleteAbilityFromPokemon(pokemonId,req.body,res);
        res.status(200).send(data);
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
    deleteTypeFromPokemon,
    addAbilityToPokemon,
    deleteAbilityFromPokemon,
}