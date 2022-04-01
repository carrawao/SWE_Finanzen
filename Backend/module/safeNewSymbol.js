const fs = require('fs');

const saveShareSymbol = (symbol) => {
    console.log("A new Share symbol will be saved");
    const path = 'data/shareSymbols.txt';
    
    const contents = fs.readFileSync(path, 'utf-8');

    if(!contents.includes(symbol)){
        fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
        console.log("A new Share symbol is saved");
    }else{
        console.log("The Crypto Symbol already exists");
    }
}

const saveCryptoSymbol = (symbol) => {
    console.log("A new Crypto symbol will be saved");
    const path = 'data/cryptoSymbols.txt';
    
    const contents = fs.readFileSync(path, 'utf-8');

    if(!contents.includes(symbol)){
        fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
        console.log("A new Crypto symbol is saved");
    }else{
        console.log("The Crypto Symbol already exists");
    }
        
}


module.exports = {saveShareSymbol, saveCryptoSymbol};