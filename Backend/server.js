const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const schedule = require('node-schedule');
const readline = require('readline');


const updateShare = require('./module/updateShareDataFromAPI');
const updateCrypto = require('./module/updateCryptoDataFromAPI');
const updateGeneral = require('./module/updateGeneralDataFromAPI');
const { Console } = require('console');

const args = require('minimist')(process.argv.slice(2))

let accessURL = '*';

// if(JSON.stringify(args).includes('prod')){
//     console.log("Produktion");
//     accessURL = 'http://swe-bench--market.germanywestcentral.cloudapp.azure.com:3000';
// }else{
//     if(JSON.stringify(args).includes('ent')){
//         console.log("Entwicklung")
//         accessURL = '*';
//     }else{
//         console.log("Lokal");
//         accessURL = 'http://swe-bench--market.germanywestcentral.cloudapp.azure.com:3000';
//     }
// }


const apiKeys =[
    'ZSQ57OXG4YKUA0B8', //API Key Hakan;
    'MB6DE4CNFFYGP4M7', //API Key Steffen;
    'NOGQ7D1A1RHDGMU4', //API Key Cedrik
    'ZSQ57OXG4YKUA0B8', //API Key Hakan;    //RESERVIERT FÜR MONATLICH
    'MB6DE4CNFFYGP4M7', //API Key Steffen;
    'NOGQ7D1A1RHDGMU4'  //API Key Cedrik
]
let apiKeyIndex = 0;
// let apiKey;
const currencyAPIKey = '8M63hm29skLS4WL2ET8NX3rua6ZMalqUZFy09CMx';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs, apiKeys, accessURL);

const PORT = 3001;
const HOST = '0.0.0.0';

const server = app.listen(PORT,HOST, () => {
    console.log('listening on port %s...', server.address().port); 
});

//INFO WICHTIGER LINK für schedule
//https://crontab.guru/#*_*_*_*_*

// //dauert bis zu 2 Stunden
const updateShares = schedule.scheduleJob('0 1 * * *', () => {
    updateShare.startUpdateShareData(apiKeys);
});

// // 5 minutes break (Sicherheit wegen api Keys)
const updateCryptos = schedule.scheduleJob('5 3 * * *', () => {
    updateCrypto.startUpdateCryptoData(apiKeys);
});
const updateGenerals = schedule.scheduleJob('0 1 * * *', () => {
    updateGeneral.updateCompanyOverviewData(apiKeys[4]);
    updateGeneral.updateCurrentCurrency(apiKeys[5]);
    updateGeneral.updateListOfQuotedUSshares(apiKeys[5]);
});