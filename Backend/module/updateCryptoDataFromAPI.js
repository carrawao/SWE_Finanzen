const axios = require('axios');
const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const readline = require('readline');

const serviceFunctions = require('./serviceFunctions');
const pathCryptoSymbol = './data/cryptoSymbols.txt';
let url;

// Todo: Check if we got new Data or we have to many Calls
// Todo: -> To manye calls say do it later in 60 minutes
// ! Else with try catch or the server get killed
// Start updating all data:
// -> Intraday
// -> Daily
// -> Weekly
// -> Monthly
const startUpdateCryptoData = async (apiKeys) => {
    updateIntradayCryptoData(apiKeys[0]);
    updateDailyCryptoData(apiKeys[1]);
    updateWeeklyCryptoData(apiKeys[2]);

    // Wird erstmal weggelassen wird nicht benötigt
    // updateMonthlyCryptoData(apiKeys[3]);
};

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Intraday Data
async function updateIntradayCryptoData(apiKey){
    let today = new Date();    

    if(today.getHours() >= 6){
        const fileStream = fs.createReadStream(pathCryptoSymbol);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        
        let fiveSymbols= [];
        let i = 0;
        let k = 0;
        for await (const symbol of rl) {
            if(i > 4){
                updateFiveIntradayCryptoFromAPI(fiveSymbols, k, apiKey);
                k++;
                fiveSymbols = [];
                i = 0;
            }
            fiveSymbols[i] = symbol;
            i++;
        }
        updateFiveIntradayCryptoFromAPI(fiveSymbols, k, apiKey);
        
        rl.close()
    }
}
async function updateFiveIntradayCryptoFromAPI(symbols, minutes, apiKey){
//Every 1.5 Minutes start update 5 Symbols
setTimeout(() => {
    for (const symbol of symbols) {
        updateIntradaySeriesCrypto(symbol,60,apiKey);
    }
},90000 * minutes);
}
const updateIntradaySeriesCrypto = async (symbol, interval = 60, apiKey) => {
    url = `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${symbol}&market=EUR&interval=${interval}min&apikey=${apiKey}`
    let path = 'data/Crypto/Intraday/intradayCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = [
                        {
                         "time": "Right now",
                         "open": "0",
                         "high": "0",
                         "low": "0",
                         "close": "0",
                         "volume": "0"
                        },
                        {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Symbol": symbol
                        }];
                    if(fs.existsSync(jsonPath)){
                        //Flie exists
                        // -> Add extra Information to Json
                        let data = JSON.stringify(JSON.parse(fs.readFileSync(path)));
                        data = data.substring(0, data.length -1);
                        data = data +  ', \"Info\" : { \"1. Information\": \"Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.\"}}'
                        fs.writeFileSync(path, (data));
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(jsonPath, JSON.stringify(jsonMessage));
                    }
                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Intraday Share Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }

            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateIntradaySeriesCrypto(symbol, 30, apiKey), randomTime);
            }
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Daily Data
async function updateDailyCryptoData(apiKey){
    const fileStream = fs.createReadStream(pathCryptoSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveDailyCryptoFromAPI(fiveSymbols,k,apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveDailyCryptoFromAPI(fiveSymbols,k,apiKey);
    
    rl.close()
}
async function updateFiveDailyCryptoFromAPI(symbols, minutes, apiKey){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateDailySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}
const updateDailySeriesCrypto = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Daily/dailyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = {
                        "Meta Data": {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Digital Currency Code": symbol,
                            "3. Digital Currency Name": symbol,
                            "4. Market Code": "EUR",
                            "5. Market Name": "Euro",
                            "6. Last Refreshed": "Right now",
                            "7. Time Zone": "NONE"
                        },
                        "Time Series (Digital Currency Daily)": {
                            "No Date": {
                                "1a. open (EUR)": "0",
                                "1b. open (USD)": "0",
                                "2a. high (EUR)": "0",
                                "2b. high (USD)": "0",
                                "3a. low (EUR)": "0",
                                "3b. low (USD)": "0",
                                "4a. close (EUR)": "0",
                                "4b. close (USD)": "0",
                                "5. volume": "0",
                                "6. market cap (USD)": "0"
                            }
                        }
                    };

                    if(fs.existsSync(path)){
                        //Flie exists
                        // -> Add extra Information to Json
                        let data = JSON.stringify(JSON.parse(fs.readFileSync(path)));
                        data = data.substring(0, data.length -1);
                        data = data +  ', \"Info\" : { \"1. Information\": \"Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.\"}}'
                        fs.writeFileSync(path, (data));
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Daily Crypto Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateDailySeriesCrypto(symbol,apiKey), randomTime);
            }
        })
        .catch(error => console.error(error)
        )
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Weekly Data
async function updateWeeklyCryptoData(apiKey){
    const fileStream = fs.createReadStream(pathCryptoSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveWeeklyCryptoFromAPI(fiveSymbols,k,apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveWeeklyCryptoFromAPI(fiveSymbols,k,apiKey);
    
    rl.close()
}
async function updateFiveWeeklyCryptoFromAPI(symbols, minutes, apiKey){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateWeeklySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}
const updateWeeklySeriesCrypto = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Weekly/weeklyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = {
                        "Meta Data": {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Digital Currency Code": symbol,
                            "3. Digital Currency Name": symbol,
                            "4. Market Code": "EUR",
                            "5. Market Name": "Euro",
                            "6. Last Refreshed": "Right now",
                            "7. Time Zone": "NONE"
                        },
                        "Time Series (Digital Currency Weekly)": {
                            "No Date": {
                                "1a. open (EUR)": "0",
                                "1b. open (USD)": "0",
                                "2a. high (EUR)": "0",
                                "2b. high (USD)": "0",
                                "3a. low (EUR)": "0",
                                "3b. low (USD)": "0",
                                "4a. close (EUR)": "0",
                                "4b. close (USD)": "0",
                                "5. volume": "0",
                                "6. market cap (USD)": "0"
                            }
                        }
                    };

                    if(fs.existsSync(path)){
                        //Flie exists
                        // -> Add extra Information to Json
                        let data = JSON.stringify(JSON.parse(fs.readFileSync(path)));
                        data = data.substring(0, data.length -1);
                        data = data +  ', \"Info\" : { \"1. Information\": \"Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.\"}}'
                        fs.writeFileSync(path, (data));
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Daily Crypto Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateWeeklySeriesCrypto(symbol,apiKey), randomTime);
            }
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//Monthly Data
async function updateMonthlyCryptoData(apiKey){
    const fileStream = fs.createReadStream(pathCryptoSymbol);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let fiveSymbols= [];
    let i = 0;
    let k = 0;
    for await (const symbol of rl) {
        if(i > 4){
            updateFiveMonthlyCryptoFromAPI(fiveSymbols,k,apiKey);
            k++;
            fiveSymbols = [];
            i = 0;
        }
        fiveSymbols[i] = symbol;
        i++;
    }
    updateFiveMonthlyCryptoFromAPI(fiveSymbols,k,apiKey);
    
    rl.close()
}
async function updateFiveMonthlyCryptoFromAPI(symbols, minutes, apiKey){
    //Every 1.5 Minutes start update 5 Symbols
    setTimeout(() => {
        for (const symbol of symbols) {
            updateMonthlySeriesCrypto(symbol,apiKey);
        }
    },90000 * minutes);
}
const updateMonthlySeriesCrypto = async (symbol, apiKey) => {
    url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${symbol}&market=EUR&apikey=${apiKey}'`
    let path = 'data/Crypto/Monthly/monthlyCrypto_' + symbol + '.json';

    const res = await axios.get(url)
        .then(res => res.data)
        .then(data => {
            try {
                if(JSON.stringify(data).includes('Our standard API call frequency is 5 calls per minute and 500 calls per day.')){
                    let jsonMessage = 
                    {
                        "Meta Data": {
                            "1. Information": "Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.",
                            "2. Digital Currency Code": symbol,
                            "3. Digital Currency Name": symbol,
                            "4. Market Code": "EUR",
                            "5. Market Name": "Euro",
                            "6. Last Refreshed": "Right now",
                            "7. Time Zone": "NONE"
                        },
                        "Time Series (Digital Currency Monthly)": {
                            "No Date": {
                                "1a. open (EUR)": "0",
                                "1b. open (USD)": "0",
                                "2a. high (EUR)": "0",
                                "2b. high (USD)": "0",
                                "3a. low (EUR)": "0",
                                "3b. low (USD)": "0",
                                "4a. close (EUR)": "0",
                                "4b. close (USD)": "0",
                                "5. volume": "0",
                                "6. market cap (USD)": "0"
                            }
                        }
                    };

                    if(fs.existsSync(path)){
                        //Flie exists
                        // -> Add extra Information to Json
                        let data = JSON.stringify(JSON.parse(fs.readFileSync(path)));
                        data = data.substring(0, data.length -1);
                        data = data +  ', \"Info\" : { \"1. Information\": \"Sorry, our API is overloaded at the moment, it may take a few minutes before your data is available.\"}}'
                        fs.writeFileSync(path, (data));
                    }else{
                        //File not exists
                        // -> Write a new File with 
                        fs.writeFileSync(path, JSON.stringify(jsonMessage));
                    }

                    throw new Error('To many API calls with the Key: ' + apiKey + ', for Daily Crypto Data');
                }else{
                    fs.writeFileSync(path, JSON.stringify(data));
                }
            } catch (error) {
                console.error(error);
                //After 1 to 9 minutes we will try again to get the data.
                let randomTime = 60000 * serviceFunctions.getRandomIntInclusive(1,10);
                setTimeout(() => updateMonthlySeriesCrypto(symbol,apiKey), randomTime);
            }
        })
        .catch(error => console.error(error))
}

//---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ----------//
//exports
module.exports = {
    startUpdateCryptoData,
    updateDailySeriesCrypto,
    updateIntradaySeriesCrypto,
    updateMonthlySeriesCrypto,
    updateWeeklySeriesCrypto,
};