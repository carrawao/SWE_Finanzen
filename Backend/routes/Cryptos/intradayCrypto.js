const updateDataFromAPI = require('../../module/updateCryptoDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');


const userRoutes = (app, fs) => {

    app.get('/intradayCrypto', (req, res, apiKey, allowedRoute) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/Crypto/Intraday/intradayCrypto_' + symbol + '.json';
        

        fs.access(dataPath, fs.F_OK, (err) => {
          if (err) {
            updateDataFromAPI.updateIntradaySeriesCrypto(symbol,60, apiKey).then(() => {
              safeNewSymbol.saveCryptoSymbol(symbol);
              fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                res.set('Access-Control-AlLow-Origin', allowedRoute);
                res.send(JSON.parse(data));
              });
            });
            
            return;
          }
          
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.set('Access-Control-AlLow-Origin', allowedRoute);
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