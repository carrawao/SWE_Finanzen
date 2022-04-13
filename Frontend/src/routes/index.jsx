import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

/**
 * Optional the component could load lazily, allowing to borrow more
 * time for it to completely load
 */
const Home = lazy(() => import('../components/screens/Home'));
const DashboardScreen = lazy(() => import('../components/screens/Dashboard/DashboardScreen'));
const WatchListsScreen = lazy(() => import('../components/screens/WatchLists/WatchListsScreen'));
const SettingsScreen = lazy(() => import('../components/screens/Settings/SettingsScreen'));
const AssetDetailsScreen = lazy(() => import('../components/screens/AssetDetails/AssetDetailsScreen'));

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

/**
 * Defines the routes for the different pages
 * @constructor
 */
const AppRoutes = () => {
  const [watchListsArray, setWatchListsArray] = useState(() => persistState('watchListsArray', []));
  const [assetsListArray, setAssetsListArray] = useState(() => persistState('assetsListsArray', []));

  useEffect(() => {
    localStorage.setItem('watchListsArray', JSON.stringify(watchListsArray));
    localStorage.setItem('assetsListsArray', JSON.stringify(assetsListArray));
  }, [watchListsArray, assetsListArray]);

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<DashboardScreen/>}/>
      <Route
        path='/watchlists'
        element={
        <WatchListsScreen
          watchListsArray={watchListsArray}
          setWatchListsArray={setWatchListsArray}
          assetsListArray={assetsListArray}
          setAssetsListArray={setAssetsListArray}
          />
        }
      />
      <Route path='/settings' element={<SettingsScreen/>}/>
      <Route path='/watchlists/:asset' element={<AssetDetailsScreen/>}/>
    </Routes>
  );
}

export default AppRoutes;