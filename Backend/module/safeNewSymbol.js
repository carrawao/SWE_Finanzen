const fs = require('fs');

// Check if the stock symbol is already in the list
// -> If it is listed nothing happens
// -> If not it will be written into the file
const saveShareSymbol = (symbol) => {
    const path = 'data/shareSymbols.txt';
    
    const contents = fs.readFileSync(path, 'utf-8').toString().split("\n");

    let exists = false;
    for (const element of contents) {
        if(element === symbol){
            exists = true;
            break;
        }
    }
    if(!exists){
        fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
    }
}

// Check if the Crypto symbol is already in the list.
// -> If it is listed nothing happens
// -> If not it will be written into the file
const saveCryptoSymbol = (symbol) => {
    const path = 'data/cryptoSymbols.txt';

    const contents = fs.readFileSync(path, 'utf-8').toString().split("\n");

    let exists = false;
    for (const element of contents) {
        if(element === symbol){
            exists = true;
            break;
        }
    }
    if(!exists){
        fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
    }
           
}


module.exports = {saveShareSymbol, saveCryptoSymbol};