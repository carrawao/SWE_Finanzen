const userRoutes = (app, fs, accessURL) => {
    // variables
    const shareDataPath = './data/quotedUSshares.json';
    const cryptoDataPath = './data/quotedCrypto.json';
  
    // READ
    app.get('/searchShare', (req, res) => {
        if(req.query.text){
            const searchText = req.query.text;
            const shareRawData = fs.readFileSync(shareDataPath);
            const shareData = JSON.parse(shareRawData);

            let shareArrFound = shareData.filter(function(item) {
                let isPartOf = item.symbol.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase());
                return isPartOf;
            });

            res.set('Access-Control-AlLow-Origin', accessURL);
            res.send(shareArrFound);
            return;
        }
        res.send("NO search Text");
    });
  };
  
  module.exports = userRoutes;
