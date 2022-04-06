import React from 'react';
import ReactDom from 'react-dom';
import DashboardScreen from '../DashboardScreen';
import { BrowserRouter } from 'react-router-dom';


it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
        <BrowserRouter>
            <DashboardScreen></DashboardScreen>
        </BrowserRouter>
    , div);
})