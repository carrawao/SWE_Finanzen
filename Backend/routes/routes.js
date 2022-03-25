// load up our shiny new route for users
const dailyroute = require('./daily');
const intradayroute = require('./intraday');
const monthlyroute = require('./monthly');
const weeklyroute = require('./weekly');
const quotedUSshares = require('./quotedUSshares');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the api-server');
  });
  dailyroute(app, fs);
  intradayroute(app, fs);
  monthlyroute(app, fs);
  weeklyroute(app, fs);
  quotedUSshares(app,fs);
  
};

module.exports = appRouter;