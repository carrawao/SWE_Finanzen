const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const readline = require('readline');

const serviceFunctions = require('./serviceFunctions');
const pathShareSymbol = './data/shareSymbols.txt'
let url;

// Start updating all data:
// -> Intraday with the first apiKey
// -> Daily with the secound apiKey
// -> Weekly with the third apiKey
// -> Monthly currently not used therefore no execution
const startUpdateShareData = async (apiKeys) => {
    updateIntradayShareData(apiKeys[0]);
    updateDailyShareData(apiKeys[1]);
    updateWeeklyShareData(apiKeys[2]);

    // Wird erstmal weggelassen wird nicht benötigt
    // updateMonthlyShareData(apiKeys[3]);
};
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Intraday Data
async function updateIntradayShareData(apiKey) {
    let today = new Date();

    if (today.getHours() >= 3) {
        const fileStream = fs.createReadStream(pathShareSymbol);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        let fiveSymbols = [];
        let i = 0;
        let k = 0;
        for await (const symbol of rl) {
            if (i > 4) {
                updateFiveIntradayShareFromAPI(fiveSymbols, k, apiKey);
                k++;
                fiveSymbols = [];
                i = 0;
            }
            fiveSymbols[i] = symbol;
            i++;
        }
        updateFiveIntradayShareFromAPI(fiveSymbols, k, apiKey);

        rl.close();
    }
}
async function updateFiveIntradayShareFromAPI(symbols, minutes, apiKey) {
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateIntradaySeriesShare(symbol, 60, apiKey);
        }
    }, 120000 * minutes);
}
const updateIntradaySeriesShare = async (symbol, interval = 30, apiKey) => {
    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=${interval}min&slice=year1month1&apikey=${apiKey}`;
    let jsonPath = 'data/Shares/Intraday/intradayShare_' + symbol + '.json';
    let csvPath = 'data/Shares/Intraday/intradayShare_' + symbol + '.csv';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync(csvPath, data);
            csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(csvPath,jsonPath);
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Daily Data
async function updateDailyShareData(apiKey) {
    const fileStream = fs.createReadStream(pathShareSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let fiveSymbols = [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if (i > 4) {
            updateFiveDailyShareFromAPI(fiveSymbols, k, apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveDailyShareFromAPI(fiveSymbols, k, apiKey);

    rl.close();
}
async function updateFiveDailyShareFromAPI(symbols, minutes, apiKey) {
    //Every 2 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDailySeriesShare(symbol, apiKey);
        }
    }, 120000 * minutes);
}
const updateDailySeriesShare = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
    let path = 'data/Shares/Daily/dailyShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = { 
                        "Meta Data": {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Symbol": symbol,
                            "3. Last Refreshed": "Right now",
                            "4. Output Size": "NONE",
                            "5. Time Zone": "NONE"
                        },
                        "Time Series (Daily)": {
                            "N0 Date": {
                                "1. open": "0",
                                "2. high": "0",
                                "3. low": "0",
                                "4. close": "0",
                                "5. volume": "0"
                            }
                        }
                    };

                    if(fs.existsSync(path)){
                        //Flie exists
                        //Nothing todo
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Daily Share Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateDailySeriesShare(symbol,apiKey), randomTime);
            }
            
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Weekly Data
async function updateWeeklyShareData(apiKey) {
    const fileStream = fs.createReadStream(pathShareSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let fiveSymbols = [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if (i > 4) {
            updateFiveWeeklyShareFromAPI(fiveSymbols, k, apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveWeeklyShareFromAPI(fiveSymbols, k, apiKey);

    rl.close();
}
async function updateFiveWeeklyShareFromAPI(symbols, minutes, apiKey) {
    //Every 2 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateWeeklySeriesShare(symbol, apiKey);
        }
    }, 120000 * minutes);
}
const updateWeeklySeriesShare = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/Shares/Weekly/weeklyShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = { 
                        "Meta Data": {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Symbol": symbol,
                            "3. Last Refreshed": "Right now",
                            "4. Output Size": "NONE",
                            "5. Time Zone": "NONE"
                        },
                        "Time Series (Daily)": {
                            "No Date": {
                                "1. open": "0",
                                "2. high": "0",
                                "3. low": "0",
                                "4. close": "0",
                                "5. volume": "0"
                            }
                        }
                    };

                    if(fs.existsSync(path)){
                        //Flie exists
                        //Nothing todo
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Weekly Share Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateWeeklySeriesShare(symbol,apiKey), randomTime);
            }
        })
        .catch(error => console.error(error))
}
//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Monthly Data
async function updateMonthlyShareData(apiKey) {
    const fileStream = fs.createReadStream(pathShareSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let fiveSymbols = [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if (i > 4) {
            updateFiveMonthlyShareFromAPI(fiveSymbols, k, apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveMonthlyShareFromAPI(fiveSymbols, k, apiKey);

    rl.close();
}
async function updateFiveMonthlyShareFromAPI(symbols, minutes, apiKey) {
    //Every 2 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateMonthlySeriesShare(symbol, apiKey);
        }
    }, 120000 * minutes);
}
const updateMonthlySeriesShare = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
    let path = 'data/Shares/Monthly/monthlyShare_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = {
                        "Meta Data": {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Symbol": symbol,
                            "3. Last Refreshed": "Right now",
                            "4. Time Zone": "NONE"
                        },
                        "Monthly Time Series": {
                            "No Date": {
                                "1. open": "0",
                                "2. high": "0",
                                "3. low": "0",
                                "4. close": "0",
                                "5. volume": "0"
                            }
                        }
                    };

                    if(fs.existsSync(path)){
                        //Flie exists
                        //Nothing todo
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Monthly Share Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateMonthlySeriesShare(symbol,apiKey), randomTime);
            }
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//exports
module.exports = {
    startUpdateShareData,
    updateDailySeriesShare,
    updateIntradaySeriesShare,
    updateMonthlySeriesShare,
    updateWeeklySeriesShare
};