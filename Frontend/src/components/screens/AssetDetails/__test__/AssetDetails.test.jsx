import React from 'react';
import ReactDom from 'react-dom';
import AssetDetailsScreen from '../AssetDetailsScreen';
import { BrowserRouter } from 'react-router-dom';


it("AssetDetailsScreen renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <AssetDetailsScreen></AssetDetailsScreen>
        </BrowserRouter>
    , div);
})