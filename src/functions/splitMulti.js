function splitMulti(str, tokens){
    const tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(let i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    str = str.slice(1, -1)
    return str;
}

module.exports={splitMulti}