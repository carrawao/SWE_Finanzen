const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const app = express();
const schedule = require('node-schedule');

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
let url;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

// launch server on Port 3001
const server = app.listen(3001, () => {
    setApiKey();
    console.log('listening on port %s...', server.address().port);
    // updateData();
});

//Every 3 hours the API key is changed
const changeApiKey = schedule.scheduleJob('* */3 * * *', setApiKey);

function setApiKey(){
    console.log("API Key checked is called");

    apiKey = apiKeys[apiKeyIndex];
    apiKeyIndex++;
    if(apiKeyIndex == 6)
    {
        apiKeyIndex = 0;
    }
}

function updateListOfQuotedUSshares(){
    console.log("update list of quoted US shares");
    url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`
    axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync('data/quotedUSshares.csv',data);
            csvToJson.generateJsonFileFromCsv('data/quotedUSshares.csv','data/quotedUSshares.json');
        })
        .catch(error => {console.error(error)});
}

//TODO überprüfen ob symbol überhaupt existiert
function updateIntradaySeriesShare(symbol, interval = 30){
    console.log("update Intraday Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${apiKey}`;
    let path = 'data/intraday_' + symbol + '.json';

    axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}
function updateDailySeriesShare(symbol){
    console.log("update Daily Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/daily_' + symbol + '.json';

    axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error)
        )
}

function updateWeeklySeriesShare(symbol){
    console.log("update Weekly Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/weekly_' + symbol + '.json';

    axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}

function updateMonthlySeriesShare(symbol){
    console.log("update Monthly Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/monthly_' + symbol + '.json';

    axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}