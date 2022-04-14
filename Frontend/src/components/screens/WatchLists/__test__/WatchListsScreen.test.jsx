import React from 'react';
import ReactDom from 'react-dom';
import WatchListsScreen from '../WatchListsScreen';
import { BrowserRouter } from 'react-router-dom';

    

it("Watchlist renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <WatchListsScreen
            watchListsArray={watchListsArray}
            setWatchListsArray={setWatchListsArray}
            assetsListArray={assetsListArray}
            setAssetsListArray={setAssetsListArray}
            />
        </BrowserRouter>
    , div);
})