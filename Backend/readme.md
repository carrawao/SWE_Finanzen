
## Setup

To avoid incompatibility's issues it is recommended to [install](https://nodejs.org/en/download/):
- Node (version 16.14.2)
- npm (version 8.5.0)

Once the installation is finished, for load the used dependencies it is required to run:
####`npm install`

## Available Scripts

In the project directory, you can run:

#### `npm start`:
[http://localhost:3000](http://localhost:3000)k
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

URL: [http://localhost:3001](http://localhost:3001)
is thus allowed to query data.

#### `npm start prod`:

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

URL: [http://swe-bench--market.germanywestcentral.cloudapp.azure.com:3001](http://swe-bench--market.germanywestcentral.cloudapp.azure.com:3001)
is thus allowed to query data.


#### `npm start ent`:

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Any URL is allowed to query data.


## Available Data from the Backend

#### Share
##### `/intradayShare?symbol=...`:
returns a JSON list of the intraday Share data of the passed symbol. (USD)
##### `/dailyShare?symbol=...`:
returns a JSON list of the daily Share data of the passed symbol. (EUR)
##### `/weeklyShare?symbol=...`:
returns a JSON list of the weekly Share data of the passed symbol. (EUR)
##### `/monthlyShare?symbol=...`:
returns a JSON list of the monthly Share data of the passed symbol. (EUR)

#### Crypto
##### `/intradaCrypto?symbol=...`:
returns a JSON list of the intraday Crypto data of the passed symbol. (EUR)
##### `/dailyCrypto?symbol=...`:
returns a JSON list of the daily Crypto data of the passed symbol. (EUR)
##### `/weeklyCrypto?symbol=...`:
returns a JSON list of the weekly Crypto data of the passed symbol. (EUR)
##### `/monthlyCrypto?symbol=...`:
returns a JSON list of the daily Crypto data of the passed symbol. (EUR)

#### General
##### `/companyOverview?symbol=...`:
##### `/quotedUSshares`:
returns a json of all quoted US shares about which we provide information.
##### `/search?text=...`:
returns a JSON list of share and crypto data depending on the search text
##### `/searchShare?text=...`:
returns a JSON list of share data depending on the search text
##### `/searchCrypto?text=...`:
returns a JSON list of Crypto data depending on the search text

#### Watchlist
##### `/getShareForWatchlist?symbol=...`:
returns a customized JSON list of a Share for the watchlist. (EUR)
-> 
{
    "name":"", 
    "symbol":"symbol", 
    "value": "",
    "percentChange":""
}
##### `/getCryptoForWatchlist?symbol=...`:
returns a customized JSON list of a Crypto for the watchlist. (EUR)
-> 
{
    "name":"", 
    "symbol":"", 
    value": "", 
    "percentChange":""
}

#### Analyse
##### `/getShareInformationsForAnalyse?symbol=...`:
returns a customized JSON of a Share for the Analyse page.
-> 
{
    "name":"", 
    "symbol":"symbol", 
    "exDividendDate":"", 
    "dividendDate":"", 
    "assetClass":"", 
    "sector":"", 
    "branche":"", 
    "region":"", 
    "sub_region":"", 
    "country":"",
    "typ":"", 
    "DividendPerShare":""
}

#### Activities
##### `/getShareDataFromDateForActivities?symbol=...&date=year-month-day`:
returns a customized JSON of a Share for the Activities page. (EUR)
->
{
  "symbol": "symbol",
  "date": "year-month-day",
  "1. open": "",
  "2. high": "",
  "3. low": "",
  "4. close": "",
  "5. volume": ""
}
##### `/getCryptoDataFromDateForActivities?symbol=...&date=year-month-day`:
returns a customized JSON of a Crypto for the Activities page. (EUR)
-> 
{
  "symbol": "symbol",
  "date": "year-month-day",
  "1. open": "",
  "2. high": "",
  "3. low": "",
  "4. close": "",
  "5. volume": ""
}