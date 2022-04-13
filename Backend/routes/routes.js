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

const appRouter = (app, fs, apiKeys) => {
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  //Shares
  dailyShareRoute(app, fs, apiKeys[0]);
  intradayShareRoute(app, fs, apiKeys[0]);
  monthlyShareRoute(app, fs, apiKeys[0]);
  weeklyShareRoute(app, fs, apiKeys[0]);

  //Crypto
  dailyCryptoRoute(app, fs, apiKeys[0]);
  intradayCryptoRoute(app, fs, apiKeys[0]);
  monthlyCryptoRoute(app, fs, apiKeys[0]);
  weeklyCryptoRoute(app, fs, apiKeys[0]);
  
  //Allgemein
  quotedUSshares(app, fs, apiKeys[0]);
  companyOverviewRoute(app, fs, apiKeys[1]);
  search(app, fs);

  //Watchlist
  getShareForWatchlist(app,fs,apiKeys[0]);
  getCryptoForWatchlist(app,fs,apiKeys[0]);
};

module.exports = appRouter;