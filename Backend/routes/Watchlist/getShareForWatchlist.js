const updateDataFromAPI = require('../../module/updateShareDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');

const dataPathQuotedUSshares = './data/quotedUSshares.json';
const dataPathCurrentCurrency = './data/Currency/currentCurrency.json';

const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/getShareForWatchlist', (req, res) => {
        if(req.query.symbol){
            const symbol = req.query.symbol;
            const dataPathDailyShare = './data/Shares/Daily/dailyShare_' + symbol + '.json';

            fs.access(dataPathDailyShare, fs.F_OK, (err) => {
                if (err) {
                    updateDataFromAPI.updateDailySeriesShare(symbol, apiKey).then(() => {
                        safeNewSymbol.saveShareSymbol(symbol);
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
                const rawDailyData = fs.readFileSync(dataPathDailyShare);
                const rawQuotedUSshares = fs.readFileSync(dataPathQuotedUSshares);
                const currency = JSON.parse(rawCurreny);
                const dailyJson_data = JSON.parse(rawDailyData);  
                const quotedUSsharesData = JSON.parse(rawQuotedUSshares);


                let keys = Object.keys(dailyJson_data['Time Series (Daily)']);
                let dayOneSearchText = keys[0];

                let openValue = dailyJson_data['Time Series (Daily)'][dayOneSearchText]['1. open'];
                let closeValue = dailyJson_data['Time Series (Daily)'][dayOneSearchText]['4. close'];

                let change = (closeValue - openValue) / closeValue;
                change = change * 100;
                change = change.toFixed(2);

                let name;
                for(let share of quotedUSsharesData){
                    if(share['symbol'] === symbol){
                        name = share['name'];
                        break;
                    }
                }
                let value = closeValue * currency['data']['EUR']['value'];
                value = value.toFixed(2);
                
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
