const userRoutes = (app, fs) => {
  // variables
  const dataPath = './data/quotedUSshares.json';

  // READ
  app.get('/quotedUSshares', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
              throw err;
          }
          res.set('Access-Control-AlLow-Origin','http://localhost:3000');
          res.send(JSON.parse(data));
      });
  });
};

module.exports = userRoutes;