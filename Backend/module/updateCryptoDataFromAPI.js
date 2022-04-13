const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const readline = require('readline');

const pathCryptoSymbol = './data/cryptoSymbols.txt';
let url;

// Start updating all data:
// -> Intraday
// -> Daily
// -> Weekly
// -> Monthly
const startUpdateCryptoData = async (apiKeys) => {
    updateIntradayCryptoData(apiKeys[0]);
    updateDailyCryptoData(apiKeys[1]);
    updateWeeklyCryptoData(apiKeys[2]);

//     // Wird erstmal weggelassen wird nicht benötigt
//     // updateMonthlyCryptoData(apiKeys[3]);
};

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Intraday Data
async function updateIntradayCryptoData(){
    let today = new Date();    

    if(today.getHours() >= 6){
        const fileStream = fs.createReadStream(pathCryptoSymbol);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        
        let fiveSymbols= [];
        let i = 0;
        let k = 0;
        for await (const symbol of rl) {
            if(i > 4){
                updateFiveIntradayCryptoFromAPI(fiveSymbols, k);
                k++;
                fiveSymbols = [];
                i = 0;
            }
            fiveSymbols[i] = symbol;
            i++;
        }
        updateFiveIntradayCryptoFromAPI(fiveSymbols, k);
        
        rl.close()
    }
}
async function updateFiveIntradayCryptoFromAPI(symbols, minutes){
//Every 1.5 Minutes start update 5 Symbols
setTimeout(() => {
    for (const symbol of symbols) {
        updateIntradaySeriesCrypto(symbol,60,apiKey);
    }
},90000 * minutes);
}
const updateIntradaySeriesCrypto = async (symbol, interval = 60, apiKey) => {
    url = `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=EUR&interval=${interval}min&apikey=${apiKey}`
    let path = 'data/Crypto/Intraday/intradayCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Daily Data
async function updateDailyCryptoData(){
    const fileStream = fs.createReadStream(pathCryptoSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveDailyCryptoFromAPI(fiveSymbols,k);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveDailyCryptoFromAPI(fiveSymbols,k);
    
    rl.close()
}
async function updateFiveDailyCryptoFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDailySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}
const updateDailySeriesCrypto = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Daily/dailyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        })
        .catch(error => console.error(error)
        )
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Weekly Data
async function updateWeeklyCryptoData(){
    const fileStream = fs.createReadStream(pathCryptoSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveWeeklyCryptoFromAPI(fiveSymbols,k);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveWeeklyCryptoFromAPI(fiveSymbols,k);
    
    rl.close()
}
async function updateFiveWeeklyCryptoFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateWeeklySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}
const updateWeeklySeriesCrypto = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Weekly/weeklyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Monthly Data
async function updateMonthlyCryptoData(){
    const fileStream = fs.createReadStream(pathCryptoSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveMonthlyCryptoFromAPI(fiveSymbols,k);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveMonthlyCryptoFromAPI(fiveSymbols,k);
    
    rl.close()
}
async function updateFiveMonthlyCryptoFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateMonthlySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}
const updateMonthlySeriesCrypto = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Monthly/monthlyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//exports
module.exports = {
    startUpdateCryptoData,
    updateDailySeriesCrypto,
    updateIntradaySeriesCrypto,
    updateMonthlySeriesCrypto,
    updateWeeklySeriesCrypto,
};