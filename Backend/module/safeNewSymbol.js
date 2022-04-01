const fs = require('fs');

const saveShareSymbol = (symbol) => {
    console.log("A new Share symbol will be saved");
    const path = 'data/shareSymbols.txt';
    

    fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
    console.log("A new Share symbol is saved");
}



module.exports = {saveShareSymbol};