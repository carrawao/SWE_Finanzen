import React from 'react';
import ReactDom from 'react-dom';
import WatchListsScreen from '../WatchListsScreen';
import { BrowserRouter } from 'react-router-dom';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <WatchListsScreen></WatchListsScreen>
        </BrowserRouter>
    , div);
})