const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
let url;


//TODO überprüfen ob symbol überhaupt existiert

const updateListOfQuotedUSshares = (apiKey) => {
    console.log("update list of quoted US shares");
    url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${apiKey}`
    axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync('data/quotedUSshares.csv',data);
            csvToJson.fieldDelimiter(',').generateJsonFileFromCsv('data/quotedUSshares.csv','data/quotedUSshares.json');
        })
        .catch(error => {console.error(error)});
}


const updateIntradaySeriesShare = async (symbol, interval = 30, apiKey) => {
    console.log("update Intraday Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${apiKey}`;
    let path = 'data/intraday_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}

const updateDailySeriesShare = async (symbol, apiKey) => {
    console.log("update Daily Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/daily_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error)
        )
        console.log("FINISH update Daily Series from " + symbol);
    
}

const updateWeeklySeriesShare = async (symbol, apiKey) => {
    console.log("update Weekly Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/weekly_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}

const updateMonthlySeriesShare = async (symbol, apiKey) => {
    console.log("update Monthly Series from " + symbol);

    url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/monthly_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data )
        .then(data => {
            fs.writeFileSync(path, JSON.stringify(data));
        }) 
        .catch(error => console.error(error))
}

module.exports = {
    updateDailySeriesShare, 
    updateIntradaySeriesShare, 
    updateListOfQuotedUSshares, 
    updateMonthlySeriesShare, 
    updateWeeklySeriesShare};