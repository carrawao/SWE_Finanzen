const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const app = express();


//const apikey = 'ZSQ57OXG4YKUA0B8' //API Key Hakan;
const apikey = 'MB6DE4CNFFYGP4M7' //API Key Steffen;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

// launch server on Port 3001
const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
    updateData();
});


//let intervalID = setInterval(updateData, 10000);


//-------------------------
let url;

function updateData(){
    console.info("update Data called");

    // updateIntradaySeriesShare("IBM", 30);
    // updateDailySeriesShare("IBM");
    // updateWeeklySeriesShare("IBM");
    // updateMonthlySeriesShare("IBM");
    

    // console.log("quoted US shares");
    // url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apikey}`
    // axios.get(url)
    //     .then(res => res.data)
    //     .then(data => {
    //         fs.writeFileSync('data/quotedUSshares.csv',data);
    //         csvToJson.generateJsonFileFromCsv('data/quotedUSshares.csv','data/quotedUSshares.json');
    //     })
    //     .catch(error => {console.error(error)});
      
}

//TODO überprüfen ob symbol überhaupt existiert
function updateIntradaySeriesShare(symbol, interval = 30){
    console.log("update Intraday Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${apikey}`;
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

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apikey}`;
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

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apikey}`;
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

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apikey}`;
    let path = 'data/monthly_' + symbol + '.json';

    axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}