const indexOfMaxTypesValue = (averageValues) => {
    let avgVals = []
    let types = []
    averageValues.forEach(averageValue => {
        avgVals.push(parseFloat(averageValue.average_values))
        types.push(averageValue.TypeId);
    });
    const maxNum = Math.max.apply(null, avgVals);
    const index = avgVals.indexOf(maxNum);
    return {types, index}
}
const indexOfMaxAbilitiesValue = (averageValues) => {
    let avgVals = []
    let abilities = []
    averageValues.forEach(averageValue => {
        avgVals.push(parseFloat(averageValue.average_values))
        abilities.push(averageValue.AbilityId);
    });
    const maxNum = Math.max.apply(null, avgVals);
    const index = avgVals.indexOf(maxNum);
    return {abilities, index}
}
module.exports={indexOfMaxTypesValue, indexOfMaxAbilitiesValue}