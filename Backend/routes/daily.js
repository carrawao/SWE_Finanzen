const userRoutes = (app, fs) => {

    app.get('/daily', (req, res) => {
      if(req.query.symbol){
        const symbol = req.query.symbol;
        const dataPath = './data/daily_' + symbol + '.json';

        fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          res.send(JSON.parse(data));
        });
      }else
      {
        res.send("NO Symbol");
      }
      
    });
  };

  module.exports = userRoutes;