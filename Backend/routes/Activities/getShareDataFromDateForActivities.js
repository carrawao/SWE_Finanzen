const updateDataFromAPI = require('../../module/updateShareDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');

const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/getShareDataFromDateForActivities', (req, res) => {
        if(req.query.symbol && req.query.symbol){
            const symbol = req.query.symbol;
            const date = req.query.date;
            const dataPath = './data/Shares/Daily/dailyShare_' + symbol + '.json';

            fs.access(dataPath, fs.F_OK, (err) => {
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
                const rawShareData = fs.readFileSync(dataPath);
                const shareData = JSON.parse(rawShareData);
                
                let dateKeys = Object.keys(shareData["Time Series (Daily)"]);
                if(dateKeys.includes(date))
                {  
                    const back = { 
                        "symbol": symbol,
                        "date": date,
                        "1. open": shareData["Time Series (Daily)"][date]["1. open"],
                        "2. high": shareData["Time Series (Daily)"][date]["2. high"],
                        "3. low": shareData["Time Series (Daily)"][date]["3. low"],
                        "4. close": shareData["Time Series (Daily)"][date]["4. close"],
                        "5. volume": shareData["Time Series (Daily)"][date]["5. volume"]
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