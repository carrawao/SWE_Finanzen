const updateDataFromAPI = require('../../module/updateCryptoDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');

const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/getCryptoDataFromDateForActivities', (req, res) => {
        if(req.query.symbol && req.query.symbol){
            const symbol = req.query.symbol;
            const date = req.query.date;
            const dataPath = 'data/Crypto/Daily/dailyCrypto_' + symbol + '.json';

            fs.access(dataPath, fs.F_OK, (err) => {
                if (err) {
                    updateDataFromAPI.updateDailySeriesCrypto(symbol, apiKey).then(() => {
                        safeNewSymbol.saveCryptoSymbol(symbol);
                    }).then(() => {
                        setData();
                    });
                    return;
                }else{
                    setData();
                }
            });
            const setData = () => {
                const rawcryptoData = fs.readFileSync(dataPath);
                const cryptoData = JSON.parse(rawcryptoData);
                
                let dateKeys = Object.keys(cryptoData["Time Series (Digital Currency Daily)"]);
                if(dateKeys.includes(date))
                {  
                    const back = { 
                        "symbol": symbol,
                        "date": date,
                        "1. open": cryptoData["Time Series (Digital Currency Daily)"][date]["1a. open (EUR)"],
                        "2. high": cryptoData["Time Series (Digital Currency Daily)"][date]["2a. high (EUR)"],
                        "3. low": cryptoData["Time Series (Digital Currency Daily)"][date]["3a. low (EUR)"],
                        "4. close": cryptoData["Time Series (Digital Currency Daily)"][date]["4a. close (EUR)"],
                        "5. volume": cryptoData["Time Series (Digital Currency Daily)"][date]["5. volume"],
                        "6. market cap (USD)": cryptoData["Time Series (Digital Currency Daily)"][date]["6a. marked cap (USD)"]
                    };

                    res.set('Access-Control-AlLow-Origin', accessURL);
                    res.send(back);
                }else
                {
                    res.set('Access-Control-AlLow-Origin', accessURL);
                    res.send("Date nicht vorhanden");
                }
            }

        }else
        { 
            res.send("NO Symbol or no Date");
        }
    });
  };

  module.exports = userRoutes;