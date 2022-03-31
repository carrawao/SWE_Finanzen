const fs = require('fs');

const saveSymbol = (symbol) => {
    console.log("A new symbol will be saved");
    const path = 'data/symbols.txt';
    

    fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
    console.log("A new symbol is saved");
}

module.exports = {saveSymbol};