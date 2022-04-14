const updateDataFromAPI = require('../../module/updateCryptoDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');


const userRoutes = (app, fs) => {

    app.get('/monthlyCrypto', (req, res, apiKey, accessURL) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/Crypto/Monthly/monthlyCrypto_' + symbol + '.json';
        
        
        fs.access(dataPath, fs.F_OK, (err) => {
          if (err) {
            updateDataFromAPI.updateMonthlySeriesCrypto(symbol, apiKey).then(() => {
              safeNewSymbol.saveCryptoSymbol(symbol);
              fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                res.set('Access-Control-AlLow-Origin',accessURL);
                res.send(JSON.parse(data));
              });
            });
            
            return;
          }
          
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.set('Access-Control-AlLow-Origin',accessURL);
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