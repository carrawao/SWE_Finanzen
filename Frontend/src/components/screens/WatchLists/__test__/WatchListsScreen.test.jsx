import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import SearchResultsTable from '../../../common/SearchResultsTable';
import Watchlists from '../WatchLists';
import {FormControl, ListItem, Stack} from '@mui/material';
import AssetsList from '../AssetsList';

Enzyme.configure({adapter: new Adapter()})

const watchListsArray = ['Crypto'];
const assetsListArray = [
  [
    {'name': 'Bitcoin', 'symbol': 'BTC', 'price': '37890.48', 'change': '0.54'},
    {'name': 'Ethereum', 'symbol': 'ETH', 'price': '2815.80', 'change': '0.47'},
    {'name': 'EOS', 'symbol': 'EOS', 'price': '2.21', 'change': '-0.81'},
    {'name': 'Binance-USD', 'symbol': 'BUSD', 'price': '0.93', 'change': '0.00'},
    {'name': 'Binance-Coin', 'symbol': 'BNB', 'price': '385.86', 'change': '-0.15'}
  ]
];

describe('Tests regarding WatchList screen', () => {
  const addToWatchList = jest.fn();
  const setWatchListsArray = jest.fn();
  const setAssetsListArray = jest.fn();
  const setSelectedListIndex = jest.fn();
  const onClose = jest.fn();

  it('search results are not shown', () => {
    const wrapper = shallow(<SearchResultsTable
      searchResult={[]}
      watchListsArray={watchListsArray}
      selectedListIndex={0}
      assetsListArray={assetsListArray}
      addToWatchList={addToWatchList}
      onClose={onClose}
    />);

    expect(wrapper.find(<ListItem/>).exists()).toBeFalsy();
  });

  it('search results are shown', () => {
    const searchResult = [
      {
        symbol: 'A', name: 'Agilent Technologies Inc',
        exchange: 'NYSE', assetType: 'Stock',
        ipoDate: '1999-11-18', delistingDate: 'null', status: 'Active'
      },
      {
        symbol: 'A', name: 'Agilent Technologies Inc',
        exchange: 'NYSE', assetType: 'Stock',
        ipoDate: '1999-11-18', delistingDate: 'null', status: 'Active'
      }
    ]

    const wrapper = shallow(<SearchResultsTable
      searchResult={searchResult}
      watchListsArray={watchListsArray}
      selectedListIndex={0}
      assetsListArray={assetsListArray}
      addToWatchList={addToWatchList}
      onClose={onClose}
    />);

    expect(wrapper.children().find(ListItem).length).toEqual(2);
  });

  it('List of Watchlists are shown', () => {
    const wrapper = shallow(<Watchlists
      watchListsArray={watchListsArray}
      setWatchListsArray={setWatchListsArray}
      assetsListArray={assetsListArray}
      setAssetsListArray={setAssetsListArray}
      selectedListIndex={0}
      setSelectedListIndex={setSelectedListIndex}
    />);

    expect(wrapper.find(Stack).exists()).toBeTruthy();
  });

  it('List of Watchlists won\'t be shown', () => {
    const wrapper = shallow(<Watchlists
      watchListsArray={[]}
      setWatchListsArray={setWatchListsArray}
      assetsListArray={[]}
      setAssetsListArray={setAssetsListArray}
      selectedListIndex={0}
      setSelectedListIndex={setSelectedListIndex}
    />);

    expect(wrapper.find(FormControl).exists()).toBeTruthy();
  });

  it('List of Assets are shown', () => {
    const wrapper = shallow(<AssetsList
      watchListsArray={watchListsArray}
      setWatchListsArray={setWatchListsArray}
      assetsListArray={assetsListArray}
      setAssetsListArray={setAssetsListArray}
      selectedListIndex={0}
      setSelectedListIndex={setSelectedListIndex}
    />);

    expect(wrapper.find('#assets-stack').exists()).toBeTruthy();
  });

  it('List of Assets won\'t be shown', () => {
    const wrapper = shallow(<AssetsList
      watchListsArray={watchListsArray}
      setWatchListsArray={setWatchListsArray}
      assetsListArray={[[]]}
      setAssetsListArray={setAssetsListArray}
      selectedListIndex={0}
      setSelectedListIndex={setSelectedListIndex}
    />);

    expect(wrapper.find('#assets-stack').exists()).toBeFalsy();
  });
});