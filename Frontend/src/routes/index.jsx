import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
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

  /**
   * Updates all information of assets in portfolio
   * @returns {Promise<void>}
   */
  const updatePortfolioData = async () => {
    const updatedShares = await getUpdatedAssetData('shares');
    const updatedCrypto = await getUpdatedAssetData('crypto');
    const shareValue = getValue(updatedShares);
    const cryptoValue = getValue(updatedCrypto);
    const cashValue = getValue(portfolioData[activePortfolio]['cash']);
    const portfolioValue = shareValue + cryptoValue + cashValue;
    const todayDate = new Date();
    const todayString = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;

    setPortfolioData(prevPortfolioData => {
      let portfolioData = {...prevPortfolioData}
      portfolioData[activePortfolio] = {
        ...portfolioData[activePortfolio],
        shares: updatedShares,
        crypto: updatedCrypto,
        value: portfolioValue,
        updated: todayString,
        shareValue: shareValue,
        cryptoValue: cryptoValue,
        cashValue: cashValue
      };
      return portfolioData;
    });
    console.log('Portfolio Data updated!');
  };

  /**
   * Gets updated information of a given asset type
   * @param assetType
   * @returns {Promise<*>}
   */
  const getUpdatedAssetData = async assetType => {
    return (async () => {
      let updatedAssets = portfolioData[activePortfolio][assetType];
      await Promise.all(updatedAssets.map(async (asset, index) => {
        const symbol = asset['symbol'];
        const data = assettype === 'shares' ? await getShareData(symbol) : await getCryptoData(symbol);
        updatedAssets[index] = {...asset, 
          value: data.value*updatedAssets[index].quantity
        }
      }))
      return updatedAssets;
    })();
  }

  /**
   * Gets information given a share symbol
   * @param symbol
   * @returns {Promise<any>}
   */
  const getShareData = async symbol => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASEURL}/getShareForWatchlist?symbol=${symbol}`, {mode:'cors'});
      return await response.json();
    } catch (e) {
      console.log('fetching failed === ', e);
    }
  }

  /**
   * Gets information given a crypto symbol
   * @param symbol
   * @returns {Promise<any>}
   */
  const getCryptoData = async symbol => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BASEURL}/getCryptoForWatchlist?symbol=${symbol}`, {mode:'cors'});
      return await response.json();
    } catch (error) {
      console.log('fetching failed === ', error);
    }
  }

  /**
   * Returns the totalValue of the assetArray
   * @param assetArray
   * @returns {number}
   */
  const getValue = (assetArray) => {
    let value = 0;
    assetArray.forEach(asset => {
      value = value + asset['value'];
    });
    return value;
  }

  /**
   * Returns array containing all assets
   * @returns {*[]}
   */
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
