import React from 'react';
import AnalysisScreen from '../AnalysisScreen';
import AnalysisDetailItem from '../AnalysisDetailitem';
import {shallow, mount, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

configure({adapter: new Adapter()});

it('AnalysisScreen renders without crashing', () => {
  const setSearchResult = jest.fn();
  const setPortfolioData = jest.fn();
  const setStatusMessage = jest.fn();
  const setMessageType = jest.fn();

  const portfolioData = {
    'Portfolio': {
      'name': 'Portfolio',
      'value': 0,
      'gains': 0,
      'realisedGains': 0,
      'totalGains': 0,
      'performanceWithRealisedGains': 0,
      'performanceWithoutRealisedGains': 0,
      'shares': [],
      'crypto': [],
      'cash': [],
      'activities': [],
      'activitiesLastId': -1,
      'dailyDataForValueDevelopment': {},
      'dailyDataForPerformanceGraph': {},
      'updated': '1970-01-01',
      'shareValue': 0,
      'cryptoValue': 0,
      'cashValue': 0
    }
  }

  const tree = shallow(<AnalysisScreen
    searchResult={[]}
    setSearchResult={setSearchResult}
    watchListsArray={[]}
    assetsListArray={[[]]}
    portfolioData={portfolioData}
    activePortfolio={'Portfolio'}
    setPortfolioData={setPortfolioData}
    setStatusMessage={setStatusMessage}
    setMessageType={setMessageType}
  />);

  expect(toJson(tree)).toMatchSnapshot();
});

it('Snapshot Test AnalysisDetailItem', () => {
  const tree = shallow(
    <AnalysisDetailItem asset='IBM' percentage='32'/>
  );

  expect(toJson(tree)).toMatchSnapshot();
});


it('Hover Test AnalysisDetailItem', () => {
  const tree = mount(
    <AnalysisDetailItem asset='IBM' percentage='32'/>
  );

  expect(tree.find('.hoverElement').first().hasClass('hovered')).toEqual(false);
  tree.find('.hoverElement').first().simulate('mouseenter');
  expect(tree.find('.hoverElement').first().hasClass('hovered')).toEqual(true);
});