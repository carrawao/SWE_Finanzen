// Shares
const dailyShareRoute = require('./dailyShare');
const intradayShareRoute = require('./intradayShare');
const monthlyShareRoute = require('./monthlyShare');
const weeklyShareRoute = require('./weeklyShare');

const quotedUSshares = require('./quotedUSshares');

//Crypto
const dailyCryptoRoute = require('./dailyCrypto');
const intradayCryptoRoute = require('./intradayCrypto');
const monthlyCryptoRoute = require('./monthlyCrypto');
const weeklyCryptoRoute = require('./weeklyCrypto');

const search = require('./search');

const appRouter = (app, fs, apiKey) => {
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  //Shares
  dailyShareRoute(app, fs, apiKey);
  intradayShareRoute(app, fs, apiKey);
  monthlyShareRoute(app, fs, apiKey);
  weeklyShareRoute(app, fs, apiKey);

  //Crypto
  dailyCryptoRoute(app, fs, apiKey);
  intradayCryptoRoute(app, fs, apiKey);
  monthlyCryptoRoute(app, fs, apiKey);
  weeklyCryptoRoute(app, fs, apiKey);
  

  quotedUSshares(app, fs, apiKey);
  search(app, fs);
};

module.exports = appRouter;