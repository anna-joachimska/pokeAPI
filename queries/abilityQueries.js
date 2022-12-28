const getAbilities = "SELECT * FROM abilities";
const getAbilityById = "SELECT * FROM abilities WHERE id = $1";
const getAbilityByName = "SELECT * FROM abilities WHERE name = $1";

const checkIfAbilityNameExists = "SELECT * FROM abilities WHERE name = $1";
const createAbility = "INSERT INTO abilities (name) VALUES ($1)";
const deleteAbility = "DELETE FROM abilities WHERE id = $1";
const updateAbilities = "UPDATE abilities SET name = $1 WHERE id = $2";


module.exports = {
    getAbilities,
    getAbilityById,
    getAbilityByName,
    createAbility,
    updateAbilities,
    deleteAbility,
    checkIfAbilityNameExists,
}