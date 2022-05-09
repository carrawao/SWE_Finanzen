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

  const tree = shallow(<AnalysisScreen
    searchResult={[]}
    setSearchResult={setSearchResult}
    watchListsArray={[]}
    assetsListArray={[[]]}
    portfolioData={{}}
    activePortfolio={'Portfolio'}
    setPortfolioData={setPortfolioData}
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