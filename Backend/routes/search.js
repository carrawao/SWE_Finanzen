const userRoutes = (app, fs) => {
    // variables
    const dataPath = './data/quotedUSshares.json';
  
    // READ
    app.get('/search', (req, res) => {
        if(req.query.text){
            const searchText = req.query.text;
            const rawData = fs.readFileSync(dataPath);
            let result = JSON.parse(rawData);  
            let arrFound = result.filter(function(item) {
                let isPartOf = item.symbol.toLowerCase().includes(searchText.toLowerCase()) || item.name.toLowerCase().includes(searchText.toLowerCase());
                return isPartOf;
            });
            res.set('Access-Control-AlLow-Origin','http://localhost:3000');
            res.send(arrFound);
            return;
        }
        res.send("NO search Text");
    });
  };
  
  module.exports = userRoutes;
