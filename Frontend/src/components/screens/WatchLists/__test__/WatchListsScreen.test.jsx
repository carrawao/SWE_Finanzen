import React from 'react';
import ReactDom from 'react-dom';
import WatchListsScreen from '../WatchListsScreen';
import { BrowserRouter } from 'react-router-dom';

const addWatchlist = () => {
    if (watchlist !== undefined && watchlist !== '') {
      props.setWatchListsArray([...props.watchListsArray, watchlist]);
      props.setAssetsListArray([...props.assetsListArray, []])
      setAddListModal(false);
      setErrorModal(false);
      setWatchlist('');
      props.setSelectedListIndex(props.watchListsArray.length);
    } else {
      setErrorModal(true);
    }
  }

it("Watchlist renders without crashing", () => {
    const div = document.createElement("div");
    addWatchlist();
    ReactDom.render(
        <BrowserRouter>
            <WatchListsScreen></WatchListsScreen>
        </BrowserRouter>
    , div);
})