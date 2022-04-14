import React from 'react';
import ReactDom from 'react-dom';
import SettingsScreen from '../SettingsScreen';
import { BrowserRouter } from 'react-router-dom';


it("Dashboard renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <SettingsScreen></SettingsScreen>
        </BrowserRouter>
    , div);
})