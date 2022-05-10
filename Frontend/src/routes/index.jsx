import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Impressum from '../components/screens/Impressum';
import AGB from '../components/screens/AGB';
import Privacy from '../components/screens/Privacy';

import { DailyDataArraysService } from '../services';

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
    'updated': '1970-01-01',
    'shareValue': 0,
    'cryptoValue': 0,
    'cashValue': 0
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
  const updatePortfolioData = async (lastUpdatedString) => {
    const updatedShares = await getUpdatedAssetsData('shares');
    const updatedCrypto = await getUpdatedAssetsData('crypto');
    const updatedCash = await getUpdatedAssetsData('cash');
    const shareValue = getValue(updatedShares);
    const cryptoValue = getValue(updatedCrypto);
    const cashValue = getValue(portfolioData[activePortfolio]['cash']);
    const portfolioValue = shareValue + cryptoValue + cashValue;
    const todayDate = new Date();
    const todayString = todayDate.getFormattedString();

    setPortfolioData(prevPortfolioData => {
      let portfolioData = {...prevPortfolioData}
      portfolioData[activePortfolio] = {
        ...portfolioData[activePortfolio],
        shares: updatedShares,
        crypto: updatedCrypto,
        cash: updatedCash,
        value: portfolioValue,
        updated: todayString,
        shareValue: shareValue,
        cryptoValue: cryptoValue,
        cashValue: cashValue
      };
      return portfolioData;
    });

    const updatedDatesKeys = DailyDataArraysService.createDailyKeys(lastUpdatedString, todayString);

    recalculatePortfolioDataForDates(updatedDatesKeys);

    console.log('Portfolio Data updated!');
  };

  /**
   * Gets updated information of a given asset type
   * @param assetType
   * @returns {Promise<*>}
   */
  const getUpdatedAssetsData = async (assetType) => {
    let updatedAssetsData = portfolioData[activePortfolio][assetType];
    if (assetType === 'cash') {
      await updatedAssetsData.forEach(async (assetData) => {
        //get updatedDailyDataArrays
        const dailyDataForValueDevelopment = DailyDataArraysService.updateDailyDataForValueDevelopmentCash(assetData, assetData.stateChanges, assetData.stateChanges.length-1);
        
        //save new Data in assetData
        const updatedAssetData = {...assetData,
          dailyDataForValueDevelopment: dailyDataForValueDevelopment
        }
        updatedAssetsData[assetData.id] = updatedAssetData;
      });
    } else {
      await updatedAssetsData.forEach(async (assetData) => {
        //get updatedDailyDataArrays
        const dailyDataArrays = await DailyDataArraysService.updateDailyDataArrays(assetData, assetData.stateChanges, assetData.stateChanges.length-1, {asset: assetData.symbol, assetType: assetType});
        const dailyDataForValueDevelopment = dailyDataArrays['dailyDataForValueDevelopment'];
        const dailyDataForPerformanceGraph = dailyDataArrays['dailyDataForPerformanceGraph'];
        
        const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
        //save new Data in assetData
        const updatedAssetData = {...assetData,
          value: dailyDataForValueDevelopment[latestDateWithData]['value'],
          gains: dailyDataForValueDevelopment[latestDateWithData]['gains'],
          totalGains: dailyDataForValueDevelopment[latestDateWithData]['totalGains'],
          performanceWithRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'],
          performanceWithoutRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'],
          dailyDataForValueDevelopment: dailyDataForValueDevelopment,
          dailyDataForPerformanceGraph: dailyDataForPerformanceGraph
        }
        updatedAssetsData[assetData.id] = updatedAssetData;
      });
    }
    return updatedAssetsData;
  }

  const recalculatePortfolioDataForDates = async (dateKeys) => {
		const dailyDataForValueDevelopment = await recalculateDailyDataForValueDevelopmentForDates(dateKeys);
		const dailyDataForPerformanceGraph = DailyDataArraysService.createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
		setPortfolioData(prevData => {
      let tempPortfolioData = {...prevData};
      tempPortfolioData[activePortfolio]['dailyDataForValueDevelopment'] = {...tempPortfolioData[activePortfolio]['dailyDataForValueDevelopment'], ...dailyDataForValueDevelopment};
			tempPortfolioData[activePortfolio]['dailyDataForPerformanceGraph'] = {...tempPortfolioData[activePortfolio]['dailyDataForPerformanceGraph'], ...dailyDataForPerformanceGraph};
			tempPortfolioData[activePortfolio]['value'] = dailyDataForValueDevelopment[latestDateWithData]['value'];
			tempPortfolioData[activePortfolio]['invested'] = dailyDataForValueDevelopment[latestDateWithData]['invested'];
			tempPortfolioData[activePortfolio]['gains'] = dailyDataForValueDevelopment[latestDateWithData]['gains'];
			tempPortfolioData[activePortfolio]['realisedGains'] = dailyDataForValueDevelopment[latestDateWithData]['realisedGains'];
			tempPortfolioData[activePortfolio]['totalGains'] = dailyDataForValueDevelopment[latestDateWithData]['totalGains'];
      tempPortfolioData[activePortfolio]['fees'] = dailyDataForValueDevelopment[latestDateWithData]['fees'];
			tempPortfolioData[activePortfolio]['taxes'] = dailyDataForValueDevelopment[latestDateWithData]['taxes'];
			tempPortfolioData[activePortfolio]['performanceWithRealisedGains'] = dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'];
			tempPortfolioData[activePortfolio]['performanceWithoutRealisedGains'] = dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'];
      console.log("updatedPortfolioData", tempPortfolioData);
      return tempPortfolioData;
    });
	}

	const recalculateDailyDataForValueDevelopmentForDates = async (dateKeys) => {
		const allAssetsArray = getAllAssets();

		const dailyDataForValueDevelopment = {};
		await allAssetsArray.forEach(asset => {
			const assetDailyDataForValueDevelopment = asset['dailyDataForValueDevelopment'];
			dateKeys.forEach((dateKey, index) => {
				if (assetDailyDataForValueDevelopment[dateKey] === undefined) return; //return equals continue in a forEach loop
      
        const portfolioDateData = dailyDataForValueDevelopment[dateKey] ? dailyDataForValueDevelopment[dateKey] :
														      {value: 0 , invested: 0, gains: 0, realisedGains: 0, totalGains: 0, taxes: 0, fees: 0};
        let assetDateData = assetDailyDataForValueDevelopment[dateKey];
        dailyDataForValueDevelopment[dateKey] = {};
				Object.keys(assetDateData).forEach(attribute => {
          if (attribute==='quantity') return; //equal to continue in forEach
          dailyDataForValueDevelopment[dateKey][attribute] = portfolioDateData[attribute] + assetDateData[attribute];
				});
			});
		});
    return dailyDataForValueDevelopment;
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

  const updated = new Date(portfolioData[activePortfolio]['updated']);
  const updatedString = updated.getFormattedString();
  const today = new Date();
  const todayString = today.getFormattedString();

  if (updatedString !== todayString) {
    updatePortfolioData(updatedString);
  }

  Date.prototype.getFormattedString = function() {
    const date = new Date(this.valueOf());
    const year = date.getFullYear();
    let month = `${date.getMonth()+1}`;
    if (month.length === 1) {
      month = `0${month}`;
    }
    let day = `${date.getDate()}`;
    if (day.length === 1) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
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
