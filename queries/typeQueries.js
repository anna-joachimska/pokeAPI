const getTypes = "SELECT * FROM types";
const getTypeById = "SELECT * FROM types WHERE id = $1";
const checkIfTypeNameExists = "SELECT * FROM types WHERE name = $1";
const createType = "INSERT INTO types (name) VALUES ($1)";
const deleteType = "DELETE FROM types WHERE id = $1";
const updateType = "UPDATE types SET name = $1 WHERE id = $2";

module.exports = {
    getTypes,
    getTypeById,
    createType,
    updateType,
    deleteType,
    checkIfTypeNameExists,
}