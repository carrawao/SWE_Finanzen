const updateDataFromAPI = require('../../module/updateShareDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');


const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/dailyShare', (req, res) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/Shares/Daily/dailyShare_' + symbol + '.json';
        

        fs.access(dataPath, fs.F_OK, (err) => {
          if (err) {
            updateDataFromAPI.updateDailySeriesShare(symbol, apiKey).then(() => {
              safeNewSymbol.saveShareSymbol(symbol);
              fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                res.set('Access-Control-AlLow-Origin', accessURL);
                res.send(JSON.parse(data));
              });
            });
            
            return;
          }
          
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.set('Access-Control-AlLow-Origin', accessURL);
            res.send(JSON.parse(data));
          });
        });  
      }else
      {
        res.send("NO Symbol");
      }
      
    });
  };

  module.exports = userRoutes;