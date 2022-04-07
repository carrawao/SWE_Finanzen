const updateDataFromAPI = require('../module/updateDataFromAPI');
const safeNewSymbol = require('../module/safeNewSymbol');


const userRoutes = (app, fs) => {

    app.get('/getShareForWatchlist', (req, res, apiKey) => {
        if(req.query.symbol){
            const symbol = req.query.symbol;
            const dataPathOne = './data/Shares/Daily/dailyShare_' + symbol + '.json';
            const dataPathTwo = './data/CompanyOverview/companyOverview_' + symbol + '.json';

            let shareFinished = false;
            let companyOverviewFinished = false;

            fs.access(dataPathOne, fs.F_OK, (err) => {
                if (err) {
                    updateDataFromAPI.updateDailySeriesShare(symbol, apiKey).then(() => {
                        safeNewSymbol.saveShareSymbol(symbol);
                    }).then(() => {
                        shareFinished = true;
                    });
                    return;
                }else{
                    shareFinished = true;
                    console.log("Daily File exists");
                }
            });
            fs.access(dataPathTwo, fs.F_OK, (err) => {
                if (err) {
                  updateDataFromAPI.updateCompanyOverview(symbol, apiKey).then(() => {
                        safeNewSymbol.saveShareSymbol(symbol);
                  }).then(() => {
                    companyOverviewFinished = true;
                });
                    return;
                }else{
                    companyOverviewFinished = true;
                    console.log("Company Overview File exists");
                }
            });

            const setDataIntervall = setInterval(() => {
                if(shareFinished && companyOverviewFinished){
                    const rawCurreny = fs.readFileSync('./data/Currency/currentCurrency.json');
                    const currency = JSON.parse(rawCurreny);
                    clearInterval(setDataIntervall);
                    const rawDailyData = fs.readFileSync(dataPathOne);
                    const rawCompanyOverview = fs.readFileSync(dataPathTwo);
                    const dailyJson_data = JSON.parse(rawDailyData);  
                    const companyOverviewData = JSON.parse(rawCompanyOverview);
                    
                    
                    let dayOne = new Date();
                    dayOne.setDate(dayOne.getDate() - 1);
                    
                    let dayOneSearchText = dayOne.getFullYear() + '-';
                    
                    if((dayOne.getMonth() + 1) < 10){
                    dayOneSearchText = dayOneSearchText + '0' + (dayOne.getMonth() + 1) + '-';
                    }else{
                    dayOneSearchText = dayOneSearchText + (dayOne.getMonth() + 1) + '-';
                    }
                    if(dayOne.getDate() < 10){
                    dayOneSearchText = dayOneSearchText + '0' + dayOne.getDate();
                    }else{
                    dayOneSearchText = dayOneSearchText + dayOne.getDate();
                    }
                    
                    let openValue = dailyJson_data['Time Series (Daily)'][dayOneSearchText]['1. open'];
                    let closeValue = dailyJson_data['Time Series (Daily)'][dayOneSearchText]['4. close'];
                    
                    let change = (closeValue - openValue) / closeValue;
                    let percentChange;
                    
                    if(change > 0){
                    percentChange = change * 100 * - 1;
                    percentChange = percentChange.toFixed(4);
                    }else{
                    percentChange = change * -100;
                    percentChange = percentChange.toFixed(4);
                    }
                    
                    const name = companyOverviewData['Name'];
                    let value = closeValue * currency['data']['EUR']['value'];
                    value = value.toFixed(4);
                    
                    const back = { "name": name, "symbol": symbol, "value": value, "percentChange": percentChange };
                    
                    res.set('Access-Control-AlLow-Origin','http://localhost:3000');
                    res.send(JSON.parse(JSON.stringify(back)));
                }
            }, 100);


      }else
      {
        res.send("NO Symbol");
      }
      
    });
  };

  module.exports = userRoutes;