const updateDataFromAPI = require('../../module/updateCryptoDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');


const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/getCryptoForWatchlist', (req, res) => {
        if(req.query.symbol){
            const symbol = req.query.symbol;
            const dataPathDailycrypto = './data/Crypto/Daily/dailyCrypto_' + symbol + '.json';
            const dataPathQuotedUScryptos = './data/quotedCrypto.json';
            const dataPathCurrentCurrency = './data/Currency/currentCurrency.json';


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
                const currency = JSON.parse(rawCurreny);
                const dailyJson_data = JSON.parse(rawDailyData);  
                const quotedUScryptosData = JSON.parse(rawQuotedUScryptos);

                // let dayOne = new Date();
                // dayOne.setDate(dayOne.getDate() - 1);
                    
                // let dayOneSearchText = dayOne.getFullYear() + '-';
                    
                // if((dayOne.getMonth() + 1) < 10){
                //     dayOneSearchText = dayOneSearchText + '0' + (dayOne.getMonth() + 1) + '-';
                // }else{
                //     dayOneSearchText = dayOneSearchText + (dayOne.getMonth() + 1) + '-';
                // }
                // if(dayOne.getDate() < 10){
                //     dayOneSearchText = dayOneSearchText + '0' + dayOne.getDate();
                // }else{
                //     dayOneSearchText = dayOneSearchText + dayOne.getDate();
                // }

                keys = dailyJson_data['Time Series (Digital Currency Daily)'].getKeys();
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