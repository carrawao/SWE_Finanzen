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
                let isPartOf = item.symbol.includes(searchText) || item.name.includes(searchText);
                return isPartOf;
            });
            
            res.send(arrFound);
            return;
        }
        res.send("NO search Text");
    });
  };
  
  module.exports = userRoutes;
