const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const schedule = require('node-schedule');
const readline = require('readline');

const updateDataFromAPI = require('./module/updateDataFromAPI');


const apiKeys =[
    'ZSQ57OXG4YKUA0B8', //API Key Hakan;
    'MB6DE4CNFFYGP4M7', //API Key Steffen;
    'NOGQ7D1A1RHDGMU4', //API Key Cedrik
    'ZSQ57OXG4YKUA0B8', //API Key Hakan;
    'MB6DE4CNFFYGP4M7', //API Key Steffen;
    'NOGQ7D1A1RHDGMU4'  //API Key Cedrik
]
let apiKeyIndex = 0;
let apiKey;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs, apiKey);

// launch server on Port 3001
const server = app.listen(3001, () => {
    setApiKey();
    console.log('listening on port %s...', server.address().port);
});

//INFO WICHTIGER LINK für schedule
//https://crontab.guru/#*_*_*_*_*

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//      Shares

// //Every hour new data are pulled from the API for Intraday
const updateIntradayShares = schedule.scheduleJob('0 */1 * * *', updateIntradayShareData);

// //Always at 0:05 the daily data is pulled from the API
const updateDailyShares = schedule.scheduleJob('5 0 * * *', updateDailyShareData);

// //Always at 1:05 the weekly data is pulled from the API
const updateWeeklyShares = schedule.scheduleJob('5 1 * * *', updateWeeklyShareData);

// //Always at 2:05 the monthly data is pulled from the API
const updateMonthlyShares = schedule.scheduleJob('5 2 * * *', updateMonthlyShareData);

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//      Crypto
// //Always by half an hour new data are pulled from the API for Intraday
const updateIntradayCryptos = schedule.scheduleJob('30 */1 * * *', updateIntradayCryptoData);

// //Always at 3:05 the daily data is pulled from the API
const updateDailyCryptos = schedule.scheduleJob('5 3 * * *', updateDailyCryptoData);

// //Always at 4:05 the weekly data is pulled from the API
const updateWeeklyCryptos = schedule.scheduleJob('5 4 * * *', updateWeeklyCryptoData);

// //Always at 5:05 the monthly data is pulled from the API
const updateMonthlyCryptos = schedule.scheduleJob('5 5 * * *', updateMonthlyCryptoData);

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// //Every 3 hours the API key is updated
const updateApiKey = schedule.scheduleJob('0 */3 * * *', setApiKey);
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//      Shares

//Only from 3 o'clock (including 3 o'clock) the intraday data are updated
async function updateIntradayShareData(){
    let today = new Date();    

    if(today.getHours() >= 3){
        const fileStream = fs.createReadStream('./data/shareSymbols.txt');

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        
        let fiveSymbols= [];
        let i = 0;
        let k = 0;
        for await (const symbol of rl) {
            if(i > 4){
                updateFiveIntradayShareFromAPI(fiveSymbols, k);
                k++;
                fiveSymbols = [];
                i = 0;
            }
            fiveSymbols[i] = symbol;
            i++;
        }
        updateFiveIntradayShareFromAPI(fiveSymbols, k);
        
        rl.close()
    }
}
async function updateFiveIntradayShareFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDataFromAPI.updateIntradaySeriesShare(symbol,30, apiKey);
        }
    },90000 * minutes);
}

async function updateDailyShareData(){
    const fileStream = fs.createReadStream('./data/shareSymbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveDailyShareFromAPI(fiveSymbols,k);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveDailyShareFromAPI(fiveSymbols,k);
    
    rl.close()
}
async function updateFiveDailyShareFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDataFromAPI.updateDailySeriesShare(symbol,apiKey);
        }
    },90000 * minutes);
}

async function updateWeeklyShareData(){
    const fileStream = fs.createReadStream('./data/shareSymbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveWeeklyShareFromAPI(fiveSymbols,k);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveWeeklyShareFromAPI(fiveSymbols,k);
    
    rl.close()
}
async function updateFiveWeeklyShareFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDataFromAPI.updateWeeklySeriesShare(symbol,apiKey);
        }
    },90000 * minutes);
}

async function updateMonthlyShareData(){
    const fileStream = fs.createReadStream('./data/shareSymbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveMonthlyShareFromAPI(fiveSymbols,k);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveMonthlyShareFromAPI(fiveSymbols,k);
    
    rl.close()
}
async function updateFiveMonthlyShareFromAPI(symbols, minutes){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDataFromAPI.updateMonthlySeriesShare(symbol,apiKey);
        }
    },90000 * minutes);
}
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//      Crypto
async function updateIntradayCryptoData(){
    let today = new Date();    

    if(today.getHours() >= 6){
        const fileStream = fs.createReadStream('./data/cryptoSymbols.txt');

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
        updateDataFromAPI.updateIntradaySeriesCrypto(symbol,30,apiKey);
    }
},90000 * minutes);
}

async function updateDailyCryptoData(){
    const fileStream = fs.createReadStream('./data/cryptoSymbols.txt');

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
            updateDataFromAPI.updateDailySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}

async function updateWeeklyCryptoData(){
    const fileStream = fs.createReadStream('./data/cryptoSymbols.txt');

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
            updateDataFromAPI.updateWeeklySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}

async function updateMonthlyCryptoData(){
    const fileStream = fs.createReadStream('./data/cryptoSymbols.txt');

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
            updateDataFromAPI.updateMonthlySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}

//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//      API Key
function setApiKey(){
    console.log("API Key checked is called");

    apiKey = apiKeys[apiKeyIndex];
    apiKeyIndex++;
    if(apiKeyIndex == 6)
    {
        apiKeyIndex = 0;
    }
}