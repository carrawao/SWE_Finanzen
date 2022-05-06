import React from 'react';
import AssetDetailsScreen from '../AssetDetailsScreen';
import toJson from 'enzyme-to-json';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

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

  const wrapper = shallow(
    <AssetDetailsScreen
      searchResult={[]}
      setSearchResult={setSearchResult}
      watchListsArray={[]}
      assetsListArray={[[]]}
      portfolioData={portfolioData}
      activePortfolio={'Portfolio'}
    />);

  expect(toJson(wrapper)).toMatchSnapshot();
})