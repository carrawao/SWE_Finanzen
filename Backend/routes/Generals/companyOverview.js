const updateDataFromAPI = require('../../module/updateGeneralDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');


const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/companyOverview', (req, res) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/CompanyOverview/companyOverview_' + symbol + '.json';
        

        fs.access(dataPath, fs.F_OK, (err) => {
          if (err) {
            updateDataFromAPI.updateCompanyOverview(symbol, apiKey).then(() => {
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
            if(data == "{}"){
              res.send("NO Company Overview for this");
            }else{
              res.send(JSON.parse(data));
            }            
          });
        });  
      }else
      {
        res.send("NO Symbol");
      }
    });
  };

  module.exports = userRoutes;