// Shares
const dailyShareRoute = require('./dailyShare');
const intradayShareRoute = require('./intradayShare');
const monthlyShareRoute = require('./monthlyShare');
const weeklyShareRoute = require('./weeklyShare');

//Crypto
const dailyCryptoRoute = require('./dailyCrypto');
const intradayCryptoRoute = require('./intradayCrypto');
const monthlyCryptoRoute = require('./monthlyCrypto');
const weeklyCryptoRoute = require('./weeklyCrypto');

//Allgemein
const quotedUSshares = require('./quotedUSshares');
const companyOverviewRoute = require('./companyOverview');
const search = require('./search');

//Watchlist
const getShareForWatchlist = require('./getShareForWatchlist');

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
  
  //Allgemein
  quotedUSshares(app, fs, apiKey);
  companyOverviewRoute(app, fs, apiKey);
  search(app, fs);

  //Watchlist
  getShareForWatchlist(app,fs,apiKey);
};

module.exports = appRouter;