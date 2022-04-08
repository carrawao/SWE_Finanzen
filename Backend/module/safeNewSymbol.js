const fs = require('fs');

const saveShareSymbol = (symbol) => {
    console.log("A new Share symbol will be saved");
    const path = 'data/shareSymbols.txt';
    
    const contents = fs.readFileSync(path, 'utf-8').toString().split("\n");

    let exists = false;
    for (const element of contents) {
        if(element === symbol){
            console.log("The Share Symbol already exists");
            exists = true;
            break;
        }
    }
    if(!exists){
        fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
        console.log("A new Share symbol is saved");
    }
}

const saveCryptoSymbol = (symbol) => {
    console.log("A new Crypto symbol will be saved");
    const path = 'data/cryptoSymbols.txt';

    const contents = fs.readFileSync(path, 'utf-8').toString().split("\n");

    let exists = false;
    for (const element of contents) {
        if(element === symbol){
            console.log("The Share Symbol already exists");
            exists = true;
            break;
        }
    }
    if(!exists){
        fs.writeFile(path, "\n" + symbol, { flag: 'a+' }, err => {})
        console.log("A new Crypto symbol is saved"); 
    }
           
}


module.exports = {saveShareSymbol, saveCryptoSymbol};