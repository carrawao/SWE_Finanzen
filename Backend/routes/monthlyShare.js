const updateDataFromAPI = require('../module/updateDataFromAPI');
const safeNewSymbol = require('../module/safeNewSymbol');


const userRoutes = (app, fs) => {

    app.get('/monthlyShare', (req, res, apiKey) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/Shares/Monthly/monthlyShare_' + symbol + '.json';
        
        fs.access(dataPath, fs.F_OK, (err) => {
          if (err) {
            updateDataFromAPI.updateMonthlySeriesShare(symbol,apiKey).then(() => {
              safeNewSymbol.saveShareSymbol(symbol);
              fs.readFile(dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                res.set('Access-Control-AlLow-Origin','http://localhost:3000');
                res.send(JSON.parse(data));
              });
            });
            
            return;
          }else{
            console.log("File exists");
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