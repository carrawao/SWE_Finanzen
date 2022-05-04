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
const searchShare = require('./Generals/searchShare');
const searchCrypto = require('./Generals/searchCrypto');

//Watchlist
const getShareForWatchlist = require('./Watchlist/getShareForWatchlist');
const getCryptoForWatchlist = require('./Watchlist/getCryptoForWatchlist');

//Analyse
const getShareInformationsForAnalyse = require('./Analyse/getShareInformationsForAnalyse');

const appRouter = (app, fs, apiKeys, accessURL) => {
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  //Shares
  dailyShareRoute(app, fs, apiKeys[0], accessURL);
  intradayShareRoute(app, fs, apiKeys[0], accessURL);
  monthlyShareRoute(app, fs, apiKeys[0], accessURL);
  weeklyShareRoute(app, fs, apiKeys[0], accessURL);

  //Crypto
  dailyCryptoRoute(app, fs, apiKeys[0], accessURL);
  intradayCryptoRoute(app, fs, apiKeys[0], accessURL);
  monthlyCryptoRoute(app, fs, apiKeys[0], accessURL);
  weeklyCryptoRoute(app, fs, apiKeys[0], accessURL);
  
  //Allgemein
  quotedUSshares(app, fs, accessURL);
  companyOverviewRoute(app, fs, apiKeys[1], accessURL);
  search(app, fs, accessURL);
  searchShare(app,fs,accessURL);
  searchCrypto(app,fs,accessURL);

  //Watchlist
  getShareForWatchlist(app,fs,apiKeys[0], accessURL);
  getCryptoForWatchlist(app,fs,apiKeys[0], accessURL);

  //Analyse
  getShareInformationsForAnalyse(app,fs,apiKeys[1],accessURL);
};

module.exports = appRouter;