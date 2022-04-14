import React from 'react';
import ReactDom from 'react-dom';
import WatchLists from '../WatchListsScreen';
import { BrowserRouter } from 'react-router-dom';

    

it("Watchlist renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <WatchLists></WatchLists>
        </BrowserRouter>
    , div);
})