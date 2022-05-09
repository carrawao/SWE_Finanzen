import React, { lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Impressum from '../components/screens/Impressum';
import AGB from '../components/screens/AGB';
import Privacy from '../components/screens/Privacy';

/**
 * Optional the component could load lazily, allowing to borrow more
 * time for it to completely load
 */
const Home = lazy(() => import('../components/screens/Home'));
const DashboardScreen = lazy(() => import('../components/screens/Dashboard/DashboardScreen'));
const ActivitiesScreen = lazy(() => import('../components/screens/Activities/ActivitiesScreen'));
const AddActivityScreen = lazy(() => import('../components/screens/Activities/AddActivity/AddActivityScreen'));
const WatchListsScreen = lazy(() => import('../components/screens/WatchLists/WatchListsScreen'));
const SettingsScreen = lazy(() => import('../components/screens/Settings/SettingsScreen'));
const AssetDetailsScreen = lazy(() => import('../components/screens/AssetDetails/AssetDetailsScreen'));
const AnalysisScreen = lazy(() => import('../components/screens/Analysis/AnalysisScreen'));

const emptyPortfolioData = {
  'Portfolio': {
    'name': 'Portfolio',
    'value': 0,
    'gains': 0,
    'realisedGains': 0,
    'totalGains': 0,
    'performanceWithRealisedGains': 0,
    'performanceWithoutRealisedGains': 0,
    'shares': [],
    'crypto': [],
    'cash': [],
    'activities': [],
    'activitiesLastId': -1,
    'dailyDataForValueDevelopment': {},
    'dailyDataForPerformanceGraph': {},
    'updated': '1970-01-01'
  }
};

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
 * Get string from key in local storage
 * @param keyName
 * @param defaultValue
 * @returns {string}
 */
const persistString = (keyName, defaultValue) => {
  const savedData = localStorage.getItem(keyName);
  return !savedData ? defaultValue : savedData;
};

/**
 * Defines the routes for the different pages
 * @constructor
 */
const AppRoutes = () => {
  const [watchListsArray, setWatchListsArray] = useState(() => persistState('watchListsArray', []));
  const [assetsListArray, setAssetsListArray] = useState(() => persistState('assetsListsArray', []));
  const [portfolioData, setPortfolioData] = useState(() => persistState('portfolioData', emptyPortfolioData));
  const [activePortfolio, setActivePortfolio] = useState(() => persistString('activePortfolio', 'Portfolio'));
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    localStorage.setItem('watchListsArray', JSON.stringify(watchListsArray));
    localStorage.setItem('assetsListsArray', JSON.stringify(assetsListArray));
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    localStorage.setItem('activePortfolio', activePortfolio);
  }, [watchListsArray, assetsListArray, portfolioData, activePortfolio]);

  const portfolio = portfolioData[activePortfolio];
  
  const updatePortfolioData = async () => {
    const updatedShares = await getUpdatedAssetData('shares');
    const updatedCrypto = await getUpdatedAssetData('crypto');
    const value = getValue(updatedShares, updatedCrypto, portfolioData[activePortfolio]['cash']);
    const todayDate = new Date();
    const todayString = `${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getDate()}`;

    setPortfolioData(prevPortfolioData => {
      let portfolioData = {...prevPortfolioData}
      portfolioData[activePortfolio] = {...portfolioData[activePortfolio],
        shares: updatedShares,
        crypto: updatedCrypto,
        value: value,
        updated: todayString
      };
      return portfolioData;
    });
    console.log('Portfolio Data updated!')
  };

  const getUpdatedAssetData = async (assettype) => {
    const updatedAssets = (async () => {
      let updatedAssets = portfolioData[activePortfolio][assettype];
      await Promise.all(updatedAssets.map(async (asset, index) => {
        const symbol = asset['symbol'];
        const data = assettype === 'shares' ? await getShareData(symbol) : await getCryptoData(symbol);
        updatedAssets[index] = {...asset, 
          value: data.value*updatedAssets[index].quantity
        }
      }))
      return updatedAssets;
    })();
    return updatedAssets;
  }

  const getShareData = async (symbol) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASEURL}/getShareForWatchlist?symbol=${symbol}`, {mode:'cors'});
      return await response.json();
    }
    catch (e) {
      console.log('fetching failed === ', e);
    }
  }

  const getCryptoData = async (symbol) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASEURL}/getCryptoForWatchlist?symbol=${symbol}`, {mode:'cors'});
      return await response.json();
    }
    catch (e) {
      console.log('fetching failed === ', e);
    }
  }

  const getValue = (shares, crypto, cash) => {
    let value = 0;
    shares.forEach(share => {
      value = value + share['value']*share['quantity'];
    });
    crypto.forEach(coin => {
      value = value + coin['value']*coin['quantity'];
    });
    cash.forEach(account => {
      value = value + account['value'];
    });
    return value;
  }

  const getAllAssets = () => {
    let assets = [];
    assets = assets.concat(portfolio['shares']);
    assets = assets.concat(portfolio['crypto']);
    assets = assets.concat(portfolio['cash']);
    return assets;
  }

  const updatedDate = new Date(portfolioData[activePortfolio]['updated']);
  const updated = '' + updatedDate.getDay() + updatedDate.getMonth() + updatedDate.getFullYear();
  const todayDate = new Date();
  const today = '' + todayDate.getDay() + todayDate.getMonth() + todayDate.getFullYear();

  if (updated !== today) {
    updatePortfolioData();
  }

  return (
      <Routes>
        <Route
          path='/'
          element={
          <Home
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            watchListsArray={watchListsArray}
            assetsListArray={assetsListArray}
          />
        }/>
        <Route 
          path='/dashboard' 
          element={
          <DashboardScreen
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            watchListsArray={watchListsArray}
            assetsListArray={assetsListArray}
            activePortfolio={activePortfolio}
            setActivePortfolio={setActivePortfolio}
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
            getAllAssets={getAllAssets}
          />}
        />
        <Route 
          path='/analysis' 
          element={
            <AnalysisScreen
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              watchListsArray={watchListsArray}
              assetsListArray={assetsListArray}
              activePortfolio={activePortfolio}
              setActivePortfolio={setActivePortfolio}
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
            />}
        />

        <Route 
          path='/activities' 
          element={
          <ActivitiesScreen
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            watchListsArray={watchListsArray}
            assetsListArray={assetsListArray}
            activePortfolio={activePortfolio}
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}      
          />
          }
        />

        <Route
          path='/activities/addActivity'
          element={
            <AddActivityScreen
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              watchListsArray={watchListsArray}
              assetsListArray={assetsListArray}
              activePortfolio={activePortfolio}
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
              getAllAssets={getAllAssets}
            />}
        />
        <Route
          path='/watchlists'
          element={
            <WatchListsScreen
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              watchListsArray={watchListsArray}
              setWatchListsArray={setWatchListsArray}
              assetsListArray={assetsListArray}
              setAssetsListArray={setAssetsListArray}
            />
          }
        />
        <Route
          path='/settings'
          element={
            <SettingsScreen
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              watchListsArray={watchListsArray}
              assetsListArray={assetsListArray}
              portfolioData={portfolioData}
              activePortfolio={activePortfolio}
              emptyPortfolioData={emptyPortfolioData}
              setWatchListsArray={setWatchListsArray}
              setAssetsListArray={setAssetsListArray}
              setPortfolioData={setPortfolioData}
              setActivePortfolio={setActivePortfolio}
            />}
        />
        <Route
          path='/asset/:assetType/:asset'
          element={
            <AssetDetailsScreen
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              watchListsArray={watchListsArray}
              assetsListArray={assetsListArray}
              portfolioData={portfolioData}
              activePortfolio={activePortfolio}
            />}
        />
        <Route
          path='/analysis'
          element={
            <AnalysisScreen
              searchResult={searchResult}
              setSearchResult={setSearchResult}
              watchListsArray={watchListsArray}
              assetsListArray={assetsListArray}
              activePortfolio={activePortfolio}
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
            />}
        />
        <Route path='/impressum' element={<Impressum />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/agb' element={<AGB />} />
      </Routes>
  );
}

export default AppRoutes;
