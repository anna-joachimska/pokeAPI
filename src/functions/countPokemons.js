const countPokemons = (accessData,number) => {
    let pokemonsIds = []
    accessData.forEach(pokemon => {
        if (pokemon.count > number) {
            pokemonsIds.push(pokemon.id)
        }
    })
    return pokemonsIds
}

module.exports={countPokemons}