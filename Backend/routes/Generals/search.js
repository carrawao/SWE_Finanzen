const userRoutes = (app, fs) => {
    // variables
    const shareDataPath = './data/quotedUSshares.json';
    const cryptoDataPath = './data/quotedCrypto.json';
  
    // READ
    app.get('/search', (req, res, accessURL) => {
        if(req.query.text){
            const searchText = req.query.text;
            const shareRawData = fs.readFileSync(shareDataPath);
            const cryptoRawData = fs.readFileSync(cryptoDataPath);
            const shareData = JSON.parse(shareRawData);
            const cryptoData = JSON.parse(cryptoRawData);

            let shareArrFound = shareData.filter(function(item) {
                let isPartOf = item.symbol.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase());
                return isPartOf;
            });
            let cryptoArrFound = cryptoData.filter(function(item) {
                let isPartOf = item.symbol.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase());
                return isPartOf;
            });

            let result = [...shareArrFound, ...cryptoArrFound];
            res.set('Access-Control-AlLow-Origin', accessURL);
            res.send(result);
            return;
        }
        res.send("NO search Text");
    });
  };
  
  module.exports = userRoutes;
