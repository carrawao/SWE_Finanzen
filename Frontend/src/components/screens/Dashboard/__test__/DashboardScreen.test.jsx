import React from 'react';
import ReactDom from 'react-dom';
import DashboardScreen from '../DashboardScreen';
import { BrowserRouter } from 'react-router-dom';

it('DashboardScreen renders without crashing', () => {
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
  const setPortfolioData = jest.fn();
  const setActivePortfolio = jest.fn();

    const div = document.createElement('div');
    ReactDom.render(
        <BrowserRouter>
            <DashboardScreen
              searchResult={[]}
              setSearchResult={setSearchResult}
              watchListsArray={[]}
              assetsListArray={[[]]}
              activePortfolio={'Portfolio'}
              setActivePortfolio={setActivePortfolio}
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
            />
        </BrowserRouter>
    , div);
})