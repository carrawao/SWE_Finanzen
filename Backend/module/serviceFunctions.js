const fs = require('fs');

const pathDataCurrentCurrency = './data/Currency/currentCurrency.json';
const rawCurreny = fs.readFileSync(pathDataCurrentCurrency);
const currency = JSON.parse(rawCurreny);

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

const convertDollarToEuro = (dollar) => {
    const erg = dollar * currency['data']['EUR']['value'];
    return erg;
}


//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//exports
module.exports = {
    getRandomIntInclusive,
    convertDollarToEuro
};