import React from 'react';
import ReactDom from 'react-dom';
import AssetDetailsScreen from '../AssetDetailsScreen';
import { BrowserRouter } from 'react-router-dom';

it('AssetDetailsScreen renders without crashing', () => {
  const portfolioData = {
    "Portfolio": {
      "name": "Portfolio",
      "value": 0,
      "gains": 0,
      "realisedGains": 0,
      "performance": 0,
      "shares": [],
      "crypto": [],
      "cash": [],
      "activities": [],
      "updated": "1970-01-01"
    },
  };

  const setSearchResult = jest.fn();

    const div = document.createElement('div');
    ReactDom.render(
        <BrowserRouter>
            <AssetDetailsScreen
              searchResult={[]}
              setSearchResult={setSearchResult}
              watchListsArray={[]}
              assetsListArray={[[]]}
              portfolioData={portfolioData}
              activePortfolio={'Portfolio'}
            />
        </BrowserRouter>
    , div);
})