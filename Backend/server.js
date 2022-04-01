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


// //Every 3 hours the API key is updated
const updateApiKey = schedule.scheduleJob('0 */3 * * *', setApiKey);

// //Every hour new data are pulled from the API for Intraday
const updateIntraday = schedule.scheduleJob('0 */1 * * *', updateIntradayShareData);
// const updateIntraday = schedule.scheduleJob('5 15 * * *', updateIntradayData);

// //Always at 0:05 the daily data is pulled from the API
const updateDaily = schedule.scheduleJob('5 0 * * *', updateDailyShareData);
// const updateDaily = schedule.scheduleJob('5 15 * * *', updateDailyData);

// //Always at 1:05 the weekly data is pulled from the API
const updateWeekly = schedule.scheduleJob('5 1 * * *', updateWeeklyShareData);
// const updateWeekly = schedule.scheduleJob('5 15 * * *', updateWeeklyData);

// //Always at 2:05 the monthly data is pulled from the API
const updateMonthly = schedule.scheduleJob('5 2 * * *', updateMonthlyShareData);
// const updateMonthly = schedule.scheduleJob('39 15 * * *', updateMonthlyData);


//Only from 3 o'clock (including 3 o'clock) the intraday data are updated
async function updateIntradayShareData(){
    let today = new Date();    

    if(today.getHours() > 2){
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

function setApiKey(){
    console.log("API Key checked is called");

    apiKey = apiKeys[apiKeyIndex];
    apiKeyIndex++;
    if(apiKeyIndex == 6)
    {
        apiKeyIndex = 0;
    }
}