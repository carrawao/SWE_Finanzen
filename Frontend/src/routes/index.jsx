import { getValue } from '@testing-library/user-event/dist/utils';
import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

/**
 * Optional the component could load lazily, allowing to borrow more
 * time for it to completely load
 */
const Home = lazy(() => import('../components/screens/Home'));
const DashboardScreen = lazy(() => import('../components/screens/Dashboard/DashboardScreen'));
const ActivitiesScreen = lazy(() => import('../components/screens/Activities/ActivitiesScreen'));
const WatchListsScreen = lazy(() => import('../components/screens/WatchLists/WatchListsScreen'));
const SettingsScreen = lazy(() => import('../components/screens/Settings/SettingsScreen'));
const AssetDetailsScreen = lazy(() => import('../components/screens/AssetDetails/AssetDetailsScreen'));

const emptyPortfolioData = {
  "Portfolio": {
    "name": "Portfolio",
    "value": 0,
    "gains": 0,
    "realisedGains": 0,
    "performance": 0,
    "shares": [],
    "crypto": [],
    "cash": [],
    "activities": [],
    "updated": "1970-01-01"
  },
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
  const [activePortfolio, setActivePortfolio] = useState(() => persistString('activePortfolio', "Portfolio"));

  useEffect(() => {
    localStorage.setItem('watchListsArray', JSON.stringify(watchListsArray));
    localStorage.setItem('assetsListsArray', JSON.stringify(assetsListArray));
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    localStorage.setItem('activePortfolio', activePortfolio);
  }, [watchListsArray, assetsListArray, portfolioData, activePortfolio]);

  const updatePortfolioData = async () => {
    const updatedShares = await getUpdatedAssetData("shares");
    const updatedCrypto = await getUpdatedAssetData("crypto");
    const value = getValue(updatedShares, updatedCrypto, portfolioData[activePortfolio]["cash"]);
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
    
  };

  const getUpdatedAssetData = async (assettype) => {
    const updatedAssets = (async () => {
      let updatedAssets = portfolioData[activePortfolio][assettype];
      await Promise.all(updatedAssets.map(async (asset, index) => {
        const symbol = asset["symbol"];
        let data;
        assettype === "shares" ? data = await getShareData(symbol) : data = await getCryptoData(symbol);
        updatedAssets[index] = {...asset, 
          name: data.name ? data.name : symbol,
          value: `${Number.parseFloat(data.value).toFixed(2)}`
        }
      }))
      return updatedAssets;
    })();
    return updatedAssets;
  }

  const getShareData = async (symbol) => {
    try {
      let response = await fetch(`http://localhost:3001/getShareForWatchlist?symbol=${symbol}`, {mode:'cors'});
      return await response.json();
    }
    catch (e) {
      console.log('fetching failed === ', e);
    }
  }

  const getCryptoData = async (symbol) => {
    try {
      let response = await fetch(`http://localhost:3001/getCryptoForWatchlist?symbol=${symbol}`, {mode:'cors'});
      return await response.json();
    }
    catch (e) {
      console.log('fetching failed === ', e);
    }
  }

  const getValue = (shares, crypto, cash) => {
    let value = 0;
    shares.forEach(share => {
      value = value + share["value"]*share["quantity"];
    });
    crypto.forEach(coin => {
      value = value + coin["value"]*coin["quantity"];
    });
    cash.forEach(account => {
      value = value + account["value"];
    });
    return value;
  }

  const updatedDate = new Date(portfolioData[activePortfolio]["updated"]);
  const updated = "" + updatedDate.getDay() + updatedDate.getMonth() + updatedDate.getFullYear();
  const todayDate = new Date();
  const today = "" + todayDate.getDay() + todayDate.getMonth() + todayDate.getFullYear();

  if (updated !== today) {
    updatePortfolioData();
  }

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route 
        path='/dashboard' 
        element={
        <DashboardScreen
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
          activePortfolio={activePortfolio}
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />}
      />
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