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
    updateIntradayData();
});

//INFO WICHTIGER LINK für schedule
//https://crontab.guru/#*_*_*_*_*


// //Every 3 hours the API key is updated
// const updateApiKey = schedule.scheduleJob('* */3 * * *', setApiKey);

// //Every hour new data are pulled from the API for Intraday
 const updateIntraday = schedule.scheduleJob('* */1 * * *', updateIntradayData);

// //Always at 0:10 the daily data is pulled from the API
 const updateDaily = schedule.scheduleJob('30 0 * * *', updateDailyData);

// //Always at 0:20 the weekly data is pulled from the API
 const updateWeekly = schedule.scheduleJob('20 0 * * *', updateWeeklyData);

// //Always at 0:30 the monthly data is pulled from the API
 const updateMonthly = schedule.scheduleJob('30 0 * * *', updateMonthlyData);


async function updateIntradayData(){
    const fileStream = fs.createReadStream('./data/symbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const symbol of rl) {
        updateDataFromAPI.updateIntradaySeriesShare(symbol,30, apiKey);
    }
}

async function updateDailyData(){
    const fileStream = fs.createReadStream('./data/symbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const symbol of rl) {
        updateDataFromAPI.updateDailySeriesShare(symbol,apiKey);
    }
}
async function updateWeeklyData(){
    const fileStream = fs.createReadStream('./data/symbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const symbol of rl) {
        updateDataFromAPI.updateWeeklySeriesShare(symbol,apiKey);
    }
}
async function updateMonthlyData(){
    const fileStream = fs.createReadStream('./data/symbols.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const symbol of rl) {
        updateDataFromAPI.updateMonthlySeriesShare(symbol,apiKey);
    }
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