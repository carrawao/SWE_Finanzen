const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
let url;


const updateListOfQuotedUSshares = async (apiKey) => {
    console.log("update list of quoted US shares");
    url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`
    axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync('data/quotedUSshares.csv',data);
            csvToJson.fieldDelimiter(',').generateJsonFileFromCsv('data/quotedUSshares.csv','data/quotedUSshares.json');
        })
        .catch(error => {console.error(error)});
    console.log("Finish update list of quoted US shares");
}

const updateCompanyOverview = async (symbol, apiKey) => {
    console.log("update Company Overview from " + symbol);

    url=`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
    let path = 'data/CompanyOverview/companyOverview_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
    console.log("Finish update Company Overview from " + symbol);
}

//Shares
const updateIntradaySeriesShare = async (symbol, interval = 30, apiKey) => {
    console.log("update Intraday Share Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${apiKey}`;
    let path = 'data/Shares/Intraday/intradayShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
    console.log("Finish update IntraDay Share Series from " + symbol);
}

const updateDailySeriesShare = async (symbol, apiKey) => {
    console.log("update Daily Share Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/Shares/Daily/dailyShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error)
        )
        console.log("Finish update Daily Share Series from " + symbol);
    
}

const updateWeeklySeriesShare = async (symbol, apiKey) => {
    console.log("update Weekly Share Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/Shares/Weekly/weeklyShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
        console.log("Finish update Weekly Share Series from " + symbol);
}

const updateMonthlySeriesShare = async (symbol, apiKey) => {
    console.log("update Monthly Share Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/Shares/Monthly/monthlyShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
        console.log("Finish update Monthly Share Series from " + symbol);
}
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

//Crypto
const updateIntradaySeriesCrypto = async (symbol, interval = 30, apiKey) => {
    console.log("update Intraday Crypto Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=EUR&interval=${interval}min&apikey=${apiKey}`
    let path = 'data/Crypto/Intraday/intradayCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
    console.log("Finish update IntraDay Crypto Series from " + symbol);
}

const updateDailySeriesCrypto = async (symbol, apiKey) => {
    console.log("update Daily Crypto Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Daily/dailyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error)
        )
        console.log("Finish update Daily Crypto Series from " + symbol);
    
}

const updateWeeklySeriesCrypto = async (symbol, apiKey) => {
    console.log("update Weekly Crypto Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Weekly/weeklyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
        console.log("Finish update Weekly Crypto Series from " + symbol);
}

const updateMonthlySeriesCrypto = async (symbol, apiKey) => {
    console.log("update Monthly Crypto Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Monthly/monthlyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
        console.log("Finish update Monthly Crypto Series from " + symbol);
}
//----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

module.exports = {
    updateListOfQuotedUSshares, 
    updateDailySeriesShare, 
    updateIntradaySeriesShare, 
    updateMonthlySeriesShare, 
    updateWeeklySeriesShare,
    updateDailySeriesCrypto,
    updateIntradaySeriesCrypto,
    updateMonthlySeriesCrypto, 
    updateWeeklySeriesCrypto,
    updateCompanyOverview
};