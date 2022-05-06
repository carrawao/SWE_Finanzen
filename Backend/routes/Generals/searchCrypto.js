const userRoutes = (app, fs, accessURL) => {
    // variables
    const shareDataPath = './data/quotedUSshares.json';
    const cryptoDataPath = './data/quotedCrypto.json';
  
    // READ
    app.get('/searchCrypto', (req, res) => {
        if(req.query.text){
            const searchText = req.query.text;
            const cryptoRawData = fs.readFileSync(cryptoDataPath);
            const cryptoData = JSON.parse(cryptoRawData);

            let cryptoArrFound = cryptoData.filter(function(item) {
                let isPartOf = item.symbol.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase());
                return isPartOf;
            });

            res.set('Access-Control-AlLow-Origin', accessURL);
            res.send(matchSorter(cryptoArrFound,searchText,{keys: ['name','symbol']}));
            return;
        }
        res.send("NO search Text");
    });
  };
  
  module.exports = userRoutes;
