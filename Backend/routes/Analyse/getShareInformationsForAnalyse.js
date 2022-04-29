const updateDataFromAPI = require('../../module/updateGeneralDataFromAPI');
const safeNewSymbol = require('../../module/safeNewSymbol');

const dataPathCountryListData = './data/country.json';
const dataPathQuotedUSshares = './data/quotedUSshares.json';

const userRoutes = (app, fs, apiKey, accessURL) => {

    app.get('/getShareInformationsForAnalyse', (req, res) => {
        if(req.query.symbol){
            const symbol = req.query.symbol;
            const dataPathCompanyOverview = './data/CompanyOverview/companyOverview_' + symbol + '.json';

            fs.access(dataPathCompanyOverview, fs.F_OK, (err) => {
                if (err) {
                    updateDataFromAPI.updateCompanyOverview(symbol, apiKey).then(() => {
                        safeNewSymbol.saveShareSymbol(symbol);
                    }).then(() => {
                        setData();
                    });
                    return;
                }else{
                    setData();
                }
            });
            const setData = () => {
                const rawCompanyOverviewData = fs.readFileSync(dataPathCompanyOverview);
                const rawCountryList = fs.readFileSync(dataPathCountryListData);
                const rawQuotedUSshares = fs.readFileSync(dataPathQuotedUSshares);
                const quotedUSsharesData = JSON.parse(rawQuotedUSshares);
                
                const countryList = JSON.parse(rawCountryList);
                const companyOverviewData = JSON.parse(rawCompanyOverviewData);
                
                const country = companyOverviewData['Country'];
                let countryRegion = '';
                let countrySubRegion = '';

                for (const iterator of countryList) {
                    if(iterator['name'] == country || iterator['alpha2'] == country || iterator['alpha3'] == country){
                        countryRegion = iterator['region'];
                        countrySubRegion = iterator['sub_region'];
                    }
                }
                let typ = '';
                for(let share of quotedUSsharesData){
                    if(share['symbol'] === symbol){
                        typ = share['assetType'];
                        break;
                    }
                }
                

                const back = { 
                    "name": companyOverviewData['Name'],
                    "symbol": symbol, 
                    "exDividendDate": companyOverviewData['ExDividendDate'],
                    "dividendDate": companyOverviewData['DividendDate'],
                    "assetClass": companyOverviewData['AssetType'],
                    "sector": companyOverviewData['Sector'],
                    "branche": companyOverviewData['Industry'],
                    "region": countryRegion,
                    "sub_region": countrySubRegion,
                    "country": companyOverviewData['Country'],
                    "typ": typ,
                    "DividendPerShare" : companyOverviewData['DividendPerShare']
                };
                
                res.set('Access-Control-AlLow-Origin', accessURL);
                res.send(back);
            }

        }else
        { 
            res.send("NO Symbol");
        }
    });
  };

  module.exports = userRoutes;