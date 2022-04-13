const updateDataFromAPI = require('../../module/updateCryptoDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');


const userRoutes = (app, fs) => {

    app.get('/dailyCrypto', (req, res, apiKey) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/Crypto/Daily/dailyCrypto_' + symbol + '.json';
        
        
        fs.access(dataPath, fs.F_OK, (err) => {
          if (err) {
            updateDataFromAPI.updateDailySeriesCrypto(symbol, apiKey).then(() => {
              safeNewSymbol.saveCryptoSymbol(symbol);
              fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                res.set('Access-Control-AlLow-Origin','http://localhost:3000');
                res.send(JSON.parse(data));
              });
            });
            
            return;
          }
          
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.set('Access-Control-AlLow-Origin','http://localhost:3000');
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