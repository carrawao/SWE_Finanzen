const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const readline = require('readline');

const pathShareSymbol = './data/shareSymbols.txt'
let url;

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Company Overview Data
async function updateCompanyOverviewData(apiKey){
    const fileStream = fs.createReadStream(pathShareSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveCompanyOverviewData(fiveSymbols,k,apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveCompanyOverviewData(fiveSymbols,k,apiKey);
    
    rl.close()
}
async function updateFiveCompanyOverviewData(symbols, minutes, apiKey){
    //Every 2 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateCompanyOverview(symbol, apiKey);
        }
    },120000 * minutes);
}
const updateCompanyOverview = async (symbol, apiKey) => {
    url=`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
    let path = 'data/CompanyOverview/companyOverview_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//update Quoted US shares Data
const updateListOfQuotedUSshares = async (apiKey) => {
    url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`
    axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync('data/quotedUSshares.csv',data);
            csvToJson.fieldDelimiter(',').generateJsonFileFromCsv('data/quotedUSshares.csv','data/quotedUSshares.json');
        })
        .catch(error => {console.error(error)});
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Current Currency Data
const updateCurrentCurrency = async (apiKey) => {
    url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`
    axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync('data/Currency/currentCurrency.json',JSON.stringify(data));
        })
        .catch(error => {console.error(error)});
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//exports
module.exports = {
    updateCompanyOverview,
    updateCompanyOverviewData,
    updateListOfQuotedUSshares,
    updateCurrentCurrency
};