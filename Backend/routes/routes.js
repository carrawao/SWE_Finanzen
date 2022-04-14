// Shares
const dailyShareRoute = require('./Shares/dailyShare');
const intradayShareRoute = require('./Shares/intradayShare');
const monthlyShareRoute = require('./Shares/monthlyShare');
const weeklyShareRoute = require('./Shares/weeklyShare');

//Crypto
const dailyCryptoRoute = require('./Cryptos/dailyCrypto');
const intradayCryptoRoute = require('./Cryptos/intradayCrypto');
const monthlyCryptoRoute = require('./Cryptos/monthlyCrypto');
const weeklyCryptoRoute = require('./Cryptos/weeklyCrypto');

//Allgemein
const quotedUSshares = require('./Generals/quotedUSshares');
const companyOverviewRoute = require('./Generals/companyOverview');
const search = require('./Generals/search');

//Watchlist
const getShareForWatchlist = require('./Watchlist/getShareForWatchlist');
const getCryptoForWatchlist = require('./Watchlist/getCryptoForWatchlist');

const appRouter = (app, fs, apiKeys, allowedRoutes) => {
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  //Shares
  dailyShareRoute(app, fs, apiKeys[0], allowedRoutes);
  intradayShareRoute(app, fs, apiKeys[0], allowedRoutes);
  monthlyShareRoute(app, fs, apiKeys[0], allowedRoutes);
  weeklyShareRoute(app, fs, apiKeys[0], allowedRoutes);

  //Crypto
  dailyCryptoRoute(app, fs, apiKeys[0], allowedRoutes);
  intradayCryptoRoute(app, fs, apiKeys[0], allowedRoutes);
  monthlyCryptoRoute(app, fs, apiKeys[0], allowedRoutes);
  weeklyCryptoRoute(app, fs, apiKeys[0], allowedRoutes);
  
  //Allgemein
  quotedUSshares(app, fs, allowedRoutes);
  companyOverviewRoute(app, fs, apiKeys[1], allowedRoutes);
  search(app, fs, allowedRoutes);

  //Watchlist
  getShareForWatchlist(app,fs,apiKeys[0], allowedRoutes);
  getCryptoForWatchlist(app,fs,apiKeys[0], allowedRoutes);
};

module.exports = appRouter;