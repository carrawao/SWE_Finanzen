const userRoutes = (app, fs) => {
  // variables
  const dataPath = './data/quotedUSshares.json';

  // READ
  app.get('/quotedUSshares', (req, res, accessURL) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
              throw err;
          }
          res.set('Access-Control-AlLow-Origin', accessURL);
          res.send(JSON.parse(data));
      });
  });
};

module.exports = userRoutes;