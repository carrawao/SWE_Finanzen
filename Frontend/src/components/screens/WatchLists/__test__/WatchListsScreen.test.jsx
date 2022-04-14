import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import WatchListsScreen from '../WatchListsScreen';
import { BrowserRouter } from 'react-router-dom';

    

it("Watchlist renders without crashing", () => {
    const div = document.createElement("div");

    /**
     * Get value from key in local storage
     * @param keyName
     * @param defaultValue
     * @returns {any|string}
     */
    const persistState = (keyName, defaultValue) => {
        const savedData = localStorage.getItem(keyName);
        return !savedData ? defaultValue : JSON.parse(savedData);
    };
    

    const [watchListsArray, setWatchListsArray] = useState(() => persistState('watchListsArray', []));
    const [assetsListArray, setAssetsListArray] = useState(() => persistState('assetsListsArray', []));
    
    useEffect(() => {
      localStorage.setItem('watchListsArray', JSON.stringify(watchListsArray));
      localStorage.setItem('assetsListsArray', JSON.stringify(assetsListArray));
    }, [watchListsArray, assetsListArray]);

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