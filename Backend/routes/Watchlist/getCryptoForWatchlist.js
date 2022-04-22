const updateDataFromAPI = require('../../module/updateCryptoDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');

const dataPathQuotedUScryptos = './data/quotedCrypto.json';
const dataPathCurrentCurrency = './data/Currency/currentCurrency.json';

const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/getCryptoForWatchlist', (req, res) => {
        if(req.query.symbol){
            const symbol = req.query.symbol;
            const dataPathDailycrypto = './data/Crypto/Daily/dailyCrypto_' + symbol + '.json';

            fs.access(dataPathDailycrypto, fs.F_OK, (err) => {
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
                const rawCurreny = fs.readFileSync(dataPathCurrentCurrency);
                const rawDailyData = fs.readFileSync(dataPathDailycrypto);
                const rawQuotedUScryptos = fs.readFileSync(dataPathQuotedUScryptos);
                const dailyJson_data = JSON.parse(rawDailyData);  
                const quotedUScryptosData = JSON.parse(rawQuotedUScryptos);

                let keys = Object.keys(dailyJson_data['Time Series (Digital Currency Daily)']);
                dayOneSearchText = keys[0];


                let openValue = dailyJson_data['Time Series (Digital Currency Daily)'][dayOneSearchText]['1a. open (EUR)'];
                let closeValue = dailyJson_data['Time Series (Digital Currency Daily)'][dayOneSearchText]['4a. close (EUR)'];



                let change = (closeValue - openValue) / closeValue;
                change = change * 100;
                change = change.toFixed(2);

                let name;
                for(let crypto of quotedUScryptosData){
                    if(crypto['symbol'] === symbol){
                        name = crypto['name'];
                        break;
                    }
                }
                let value = closeValue;
                
                const back = { "name": name, "symbol": symbol, "value": value, "percentChange": change };
                
                res.set('Access-Control-AlLow-Origin', accessURL);
                res.send(JSON.parse(JSON.stringify(back)));
            }

        }else
        { 
            res.send("NO Symbol");
        }
    });
  };

  module.exports = userRoutes;