// load up our shiny new route for users
const dailyroute = require('./daily');
const intradayroute = require('./intraday');
const monthlyroute = require('./monthly');
const weeklyroute = require('./weekly');
const quotedUSshares = require('./quotedUSshares');
const search = require('./search');

const appRouter = (app, fs, apiKey) => {
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  dailyroute(app, fs, apiKey);
  intradayroute(app, fs, apiKey);
  monthlyroute(app, fs, apiKey);
  weeklyroute(app, fs, apiKey);
  quotedUSshares(app,fs, apiKey);
  search(app,fs);
};

module.exports = appRouter;