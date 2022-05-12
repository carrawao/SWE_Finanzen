import React from 'react';
import DashboardScreen from '../DashboardScreen';
import toJson from 'enzyme-to-json';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()})


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
  const getAllAssets = jest.fn();
  const setStatusMessage = jest.fn();
  const setMessageType = jest.fn();

  const wrapper = shallow(
    <DashboardScreen
      searchResult={[]}
      setSearchResult={setSearchResult}
      watchListsArray={[]}
      assetsListArray={[[]]}
      activePortfolio={'Portfolio'}
      setActivePortfolio={setActivePortfolio}
      getAllAssets={getAllAssets}
      portfolioData={portfolioData}
      setPortfolioData={setPortfolioData}
      setStatusMessage={setStatusMessage}
      setMessageType={setMessageType}
    />);

  expect(toJson(wrapper)).toMatchSnapshot();
})