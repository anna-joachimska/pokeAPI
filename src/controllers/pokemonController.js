const pokemonService = require("../services/pokemonService");

const getAllPokemons = async (req, res) => {
    try {
        const { page, size, sortBy , direction} = req.query;
        const data = await pokemonService.getAllPokemons(page,size,sortBy,direction)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const createNewPokemon = async (req, res, next) => {
    try {
        const pokemon = await pokemonService.createPokemon(req.body);
        res.status(201).json(pokemon);
    }
    catch(error) {
        return next(error)
    };
}

const getPokemon = async (req, res, next) => {
    try {
        const id = parseInt(req.params.pokemonId);
        const details = await pokemonService.getPokemonDetails(id)
        res.json(details);
    } catch (error) {
        return next(error)
    }
}

const updatePokemon = async (req, res, next) => {
    try {
        const id = parseInt(req.params.pokemonId);
        const details = await pokemonService.updatePokemon(id, req.body);
        res.status(200).json(details);
    } catch (error) {
        return next(error)
    }
}

const deletePokemon = async (req, res, next) => {
    try {
        const id = parseInt(req.params.pokemonId);
        const data = await pokemonService.deletePokemon(id)
        res.status(200).send({message:'Pokemon has been deleted'});

    } catch (error) {
        return next(error)
    }
}

const addTypeToPokemon = async (req, res, next) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.addTypeToPokemon(pokemonId,req.body);
        res.status(200).send(data);

    } catch (error) {
        return next(error)
    }
}

const deleteTypeFromPokemon = async (req, res, next) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.deleteTypeFromPokemon(pokemonId,req.body);
        res.status(200).send(data);
    } catch (error) {
        return next(error)
    }
}

const addAbilityToPokemon = async (req, res, next) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.addAbilityToPokemon(pokemonId,req.body);
        res.status(200).send(data);

    } catch (error) {
        return next(error)
    }
}

const deleteAbilityFromPokemon = async (req, res, next) => {
    try {
        const pokemonId = parseInt(req.params.pokemonId);
        const data = await pokemonService.deleteAbilityFromPokemon(pokemonId,req.body);
        res.status(200).send(data);
    } catch (error) {
        return next(error)
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