const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const readline = require('readline');

const serviceFunctions = require('./serviceFunctions');
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
    let path = './data/CompanyOverview/companyOverview_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    console.log("TO many API CALLS");
                    let jsonMessage = {
                        "Symbol": symbol,
                        "AssetType": "",
                        "Name": "",
                        "Description": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                        "CIK": "",
                        "Exchange": "",
                        "Currency": "",
                        "Country": "",
                        "Sector": "",
                        "Industry": "",
                        "Address": "",
                        "FiscalYearEnd": "",
                        "LatestQuarter": "",
                        "MarketCapitalization": "",
                        "EBITDA": "",
                        "PERatio": "",
                        "PEGRatio": "",
                        "BookValue": "",
                        "DividendPerShare": "",
                        "DividendYield": "",
                        "EPS": "",
                        "RevenuePerShareTTM": "",
                        "ProfitMargin": "",
                        "OperatingMarginTTM": "",
                        "ReturnOnAssetsTTM": "",
                        "ReturnOnEquityTTM": "",
                        "RevenueTTM": "",
                        "GrossProfitTTM": "",
                        "DilutedEPSTTM": "",
                        "QuarterlyEarningsGrowthYOY": "",
                        "QuarterlyRevenueGrowthYOY": "",
                        "AnalystTargetPrice": "",
                        "TrailingPE": "",
                        "ForwardPE": "",
                        "PriceToSalesRatioTTM": "",
                        "PriceToBookRatio": "",
                        "EVToRevenue": "",
                        "EVToEBITDA": "",
                        "Beta": "",
                        "52WeekHigh": "",
                        "52WeekLow": "",
                        "50DayMovingAverage": "",
                        "200DayMovingAverage": "",
                        "SharesOutstanding": "",
                        "DividendDate": "",
                        "ExDividendDate": ""
                      };

                    if(fs.existsSync(path)){
                        console.log('File exists');
                        //Flie exists
                        // -> Add extra Information to Json
                        let data = JSON.stringify(JSON.parse(fs.readFileSync(path)));
                        data = data.substring(0, data.length -1);
                        data = data +  ', \"Info\" : { \"1. Information\": \"Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.\"}}'
                        fs.writeFileSync(path, (data));
                    }else{
                        console.log("File doesnt exists");
                        console.log(JSON.stringify(jsonMessage));
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Company Overview Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateCompanyOverview(symbol,apiKey), randomTime);
            }
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