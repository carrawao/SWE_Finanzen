import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import SettingsScreen from '../SettingsScreen';
import toJson from 'enzyme-to-json';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()})

it('SettingsScreen renders without crashing', () => {
  const emptyPortfolioData = {
    'Portfolio': {
      'name': 'Portfolio',
      'value': 0,
      'gains': 0,
      'realisedGains': 0,
      'performance': 0,
      'shares': [],
      'crypto': [],
      'cash': [],
      'activities': [],
      'updated': '1970-01-01'
    },
  };

  const setSearchResult = jest.fn();
  const setWatchListsArray = jest.fn();
  const setAssetsListArray = jest.fn();
  const setPortfolioData = jest.fn();
  const setActivePortfolio = jest.fn();
  const setStatusMessage = jest.fn();
  const setMessageType = jest.fn();

  const wrapper = shallow(<BrowserRouter>
    <SettingsScreen
      searchResult={[]}
      setSearchResult={setSearchResult}
      watchListsArray={[]}
      assetsListArray={[[]]}
      portfolioData={{}}
      activePortfolio={'Portfolio'}
      emptyPortfolioData={emptyPortfolioData}
      setWatchListsArray={setWatchListsArray}
      setAssetsListArray={setAssetsListArray}
      setPortfolioData={setPortfolioData}
      setActivePortfolio={setActivePortfolio}
      setStatusMessage={setStatusMessage}
      setMessageType={setMessageType}
    />
  </BrowserRouter>);

  expect(toJson(wrapper)).toMatchSnapshot();
})