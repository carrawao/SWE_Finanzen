import React, {lazy, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Impressum from '../components/screens/Impressum';
import AGB from '../components/screens/AGB';
import Privacy from '../components/screens/Privacy';

import {
  DailyDataArraysService,
  FindDependsOnService,
  SortActivitiesService,
  UpdateBuysArrayService,
  UpdateDepositsArrayService,
  UpdateStateChangesService
} from '../services';

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
    'dividends': 0,
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
  const [statusMessage, setStatusMessage] = useState(undefined);
  const [messageType, setMessageType] = useState(undefined);

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
  const updatePortfolioData = async lastUpdatedString => {
    const todayDate = new Date();
    const todayString = todayDate.getFormattedString();

    if (portfolio['activities'].length === 0) {
      //set updated to today but don't do anything else
      setPortfolioData(prevPortfolioData => {
        let portfolioData = {...prevPortfolioData}
        portfolioData[activePortfolio] = {
          ...portfolioData[activePortfolio],
          updated: todayString,
        };
        return portfolioData;
      });
      return;
    }
    const updatedShares = await getUpdatedAssetsData('shares');
    const updatedCrypto = await getUpdatedAssetsData('crypto');
    const updatedCash = await getUpdatedAssetsData('cash');
    const shareValue = getValue(updatedShares);
    const cryptoValue = getValue(updatedCrypto);
    const cashValue = getValue(updatedCash);
    const portfolioValue = shareValue + cryptoValue + cashValue;

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

    await recalculatePortfolioDataForDates(updatedDatesKeys);

    console.log('Portfolio Data updated!');
  };

  /**
   * Gets updated information of a given asset type
   * @param assetType
   * @returns {Promise<*>}
   */
  const getUpdatedAssetsData = async assetType => {
    let updatedAssetsData = portfolioData[activePortfolio][assetType];
    if (assetType === 'cash') {
      for (let assetData of updatedAssetsData) {
        //get updatedDailyDataArrays
        const dailyDataForValueDevelopment = await DailyDataArraysService.updateDailyDataForValueDevelopmentCash(assetData, assetData.stateChanges, assetData.stateChanges.length - 1);

        //save new Data in assetData
        updatedAssetsData[assetData.id] = {
          ...assetData,
          dailyDataForValueDevelopment: dailyDataForValueDevelopment
        };
      }
    } else {
      for (let assetData of updatedAssetsData) {
        //get updatedDailyDataArrays
        const dailyDataArrays = await DailyDataArraysService.updateDailyDataArrays(assetData, assetData.stateChanges, assetData.stateChanges.length - 1, {
          asset: assetData.symbol,
          assetType: assetType
        });
        const dailyDataForValueDevelopment = dailyDataArrays['dailyDataForValueDevelopment'];
        const dailyDataForPerformanceGraph = dailyDataArrays['dailyDataForPerformanceGraph'];

        const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
        //save new Data in assetData
        updatedAssetsData[assetData.id] = {
          ...assetData,
          value: dailyDataForValueDevelopment[latestDateWithData]['value'],
          gains: dailyDataForValueDevelopment[latestDateWithData]['gains'],
          totalGains: dailyDataForValueDevelopment[latestDateWithData]['totalGains'],
          performanceWithRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'],
          performanceWithoutRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'],
          dailyDataForValueDevelopment: dailyDataForValueDevelopment,
          dailyDataForPerformanceGraph: dailyDataForPerformanceGraph
        };
      }
    }
    return updatedAssetsData;
  }

  const addActivity = async (assetType, asset, type, date, quantity, sum, value, taxes, fees) => {
    //find assetData related to activity
    let assetData = portfolio[assetType === 'share' ? 'shares' : assetType].find(element => element.symbol === asset.symbol);

    //format the date to YYYY-MM-DD string
    const formattedDateString = date.getFormattedString();
    const dependsOn = type === 'sell' ? FindDependsOnService.findDependsOn(assetData.buys, quantity) :
      type === 'dividend' ? FindDependsOnService.findDependsOn(assetData.buys, quantity) :
        type === 'payout' ? FindDependsOnService.findDependsOnCash(assetData.deposits, sum) :
          type === 'interest' ? FindDependsOnService.findDependsOnCash(assetData.deposits, sum) :
            []; //leer für buy oder deposit

    //define activityObject to push into activity array
    const activityObj = {
      id: portfolio['activitiesLastId'] + 1,
      assetType: assetType,
      assetTypeForDisplay: asset.assetType,
      asset: asset.symbol,
      assetName: asset.name ? asset.name : asset.symbol,
      type: type,
      date: formattedDateString,
      quantity: parseFloat(quantity),
      value: parseFloat(value),
      sum: parseFloat(sum),
      taxes: parseFloat(taxes),
      fees: parseFloat(fees),
      dependsOn: dependsOn
    }
    console.log('new activityObj', activityObj);

    //update assetData
    let updatedAssetData = assetData === undefined ? await createNewAssetData(activityObj) : //create newAssetData if doesn't exist
      await updateAssetData(assetData, activityObj); //update existing assetData

    console.log('updatedAssetData', updatedAssetData);

    //update activitesArray
    let newActivities = portfolio['activities'];
    newActivities.push(activityObj);
    newActivities = SortActivitiesService.sortActivities(newActivities);

    setPortfolioData(prevData => {
      let tempPortfolioData = {...prevData};
      tempPortfolioData[activePortfolio]['activities'] = newActivities;
      tempPortfolioData[activePortfolio]['activitiesLastId'] = activityObj.id;
      if (assetData === undefined) {
        tempPortfolioData[activePortfolio][assetType === 'share' ? 'shares' : assetType].push(updatedAssetData);
      } else {
        tempPortfolioData[activePortfolio][assetType === 'share' ? 'shares' : assetType][assetData.id] = updatedAssetData;
      }
      tempPortfolioData[activePortfolio]['updated'] = new Date(activityObj.date).addDays(-1).getFormattedString(); //update Portfolio Data automatically recalculates the dailyValues for the whole portfolio from this date on
      return tempPortfolioData;
    });

    setStatusMessage('Activity saved');
    setMessageType('success');
  }

  /**
   * updates the assetData according to the new activityObj
   * @param assetData
   * @param activityObj
   * @returns {Promise<(*&{fees: *, performance: number, realisedGains: number, taxes: *, value: (*|number), gains: number, invested: (*|number|number)})|(*&{fees: *, performance: number, realisedGains: number, taxes: *, gains: number, invested: (*|number|number)})|*>}
   */
  const updateAssetData = async (assetData, activityObj) => {
    const firstActivity = new Date(assetData.firstActivity) > new Date(activityObj.date) ? activityObj.date : assetData.firstActivity;
    if (activityObj.assetType === 'cash') {
      //update stateChangesArray
      const [newStateChanges, newStateIndex] = UpdateStateChangesService.updateStateChangesCash(assetData, activityObj);
      console.log('newStateChanges', newStateChanges);
      //updateDailyDataArrays
      const dailyDataForValueDevelopment = DailyDataArraysService.updateDailyDataForValueDevelopmentCash(assetData, newStateChanges, newStateIndex);

      //update deposits
      const newDeposits = UpdateDepositsArrayService.updateDepositsArray(assetData.deposits, activityObj);

      const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];

      return {
        ...assetData,
        firstActivity: firstActivity,
        value: dailyDataForValueDevelopment[latestDateWithData]['value'],
        realisedGains: dailyDataForValueDevelopment[latestDateWithData]['realisedGains'],
        totalGains: dailyDataForValueDevelopment[latestDateWithData]['realisedGains'],
        taxes: dailyDataForValueDevelopment[latestDateWithData]['taxes'],
        fees: dailyDataForValueDevelopment[latestDateWithData]['fees'],
        dailyDataForValueDevelopment: dailyDataForValueDevelopment,
        stateChanges: newStateChanges,
        deposits: newDeposits
      };
    } else {
      //Crypto or Share
      //update stateChangesArray
      const [newStateChanges, newStateIndex] = UpdateStateChangesService.updateStateChanges(assetData, activityObj);
      console.log('newStateChanges', newStateChanges);
      //updateDailyDataArrays
      const dailyDataArrays = await DailyDataArraysService.updateDailyDataArrays(assetData, newStateChanges, newStateIndex, activityObj);
      const dailyDataForValueDevelopment = dailyDataArrays['dailyDataForValueDevelopment'];
      const dailyDataForPerformanceGraph = dailyDataArrays['dailyDataForPerformanceGraph'];

      //update buys and sort them by date
      const newBuys = UpdateBuysArrayService.updateBuysArray(assetData.buys, activityObj);

      const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];

      return {
        ...assetData,
        firstActivity: firstActivity,
        value: dailyDataForValueDevelopment[latestDateWithData]['value'],
        quantity: dailyDataForValueDevelopment[latestDateWithData]['quantity'],
        invested: dailyDataForValueDevelopment[latestDateWithData]['invested'],
        gains: dailyDataForValueDevelopment[latestDateWithData]['gains'],
        realisedGains: dailyDataForValueDevelopment[latestDateWithData]['realisedGains'],
        totalGains: dailyDataForValueDevelopment[latestDateWithData]['totalGains'],
        performanceWithRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'],
        performanceWithoutRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'],
        taxes: dailyDataForValueDevelopment[latestDateWithData]['taxes'],
        fees: dailyDataForValueDevelopment[latestDateWithData]['fees'],
        dailyDataForValueDevelopment: dailyDataForValueDevelopment,
        dailyDataForPerformanceGraph: dailyDataForPerformanceGraph,
        stateChanges: newStateChanges,
        buys: newBuys
      };
    }
  }

  const createNewAssetData = async activityObj => {
    const analysisInfo = activityObj.assetType === 'share' ? await fetchAnalysisInfo(activityObj.asset) : undefined;
    const dailyDataArrays = await DailyDataArraysService.createDailyDataArrays(activityObj);
    const dailyDataForValueDevelopment = dailyDataArrays['dailyDataForValueDevelopment'];
    const dailyDataForPerformanceGraph = dailyDataArrays['dailyDataForPerformanceGraph'];

    const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
    return {
      id: portfolio[activityObj.assetType === 'share' ? 'shares' : activityObj.assetType].length,
      firstActivity: activityObj.date,
      symbol: activityObj.asset,
      name: activityObj.assetName,
      assetTypeForDisplay: activityObj.assetTypeForDisplay,
      value: dailyDataForValueDevelopment[latestDateWithData]['value'],
      quantity: activityObj.quantity,
      invested: activityObj.sum,
      gains: dailyDataForValueDevelopment[latestDateWithData]['gains'],
      realisedGains: dailyDataForValueDevelopment[latestDateWithData]['realisedGains'],
      totalGains: dailyDataForValueDevelopment[latestDateWithData]['totalGains'],
      performanceWithRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'],
      performanceWithoutRealisedGains: dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'],
      taxes: activityObj.taxes,
      fees: activityObj.fees,
      dailyDataForValueDevelopment: dailyDataForValueDevelopment,
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph,
      stateChanges: [{
        date: activityObj.date,
        assetType: activityObj.assetType,
        quantity: activityObj.quantity,
        sum: activityObj.sum,
        realisedGains: 0,
        dividends: 0,
        taxes: activityObj.taxes,
        fees: activityObj.fees
      }],
      buys: [{id: activityObj.id, date: activityObj.date, price: activityObj.value, quantity: activityObj.quantity}],
      analysisInfo: analysisInfo
    };
  }

  const fetchAnalysisInfo = async (symbol) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/getShareInformationsForAnalyse?symbol=${symbol}`, {mode: 'cors'})
      return await response.json();
    } catch (e) {
      setStatusMessage('Lost connection to server. Please try again later');
      setMessageType('error');
      console.log('fetching failed === ', e);
    }
  }

  const recalculatePortfolioDataForDates = async dateKeys => {
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
      tempPortfolioData[activePortfolio]['dividends'] = dailyDataForValueDevelopment[latestDateWithData]['dividends'];
      tempPortfolioData[activePortfolio]['fees'] = dailyDataForValueDevelopment[latestDateWithData]['fees'];
      tempPortfolioData[activePortfolio]['taxes'] = dailyDataForValueDevelopment[latestDateWithData]['taxes'];
      tempPortfolioData[activePortfolio]['performanceWithRealisedGains'] = dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'];
      tempPortfolioData[activePortfolio]['performanceWithoutRealisedGains'] = dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'];
      console.log('updatedPortfolioData', tempPortfolioData);
      return tempPortfolioData;
    });
  }

  const recalculateDailyDataForValueDevelopmentForDates = async dateKeys => {
    const allAssetsArray = getAllAssets();

    const dailyDataForValueDevelopment = {};
    await allAssetsArray.forEach(asset => {
      const assetDailyDataForValueDevelopment = asset['dailyDataForValueDevelopment'];
      dateKeys.forEach((dateKey, index) => {
        if (assetDailyDataForValueDevelopment[dateKey] === undefined) return; //return equals continue in a forEach loop

        const portfolioDateData = dailyDataForValueDevelopment[dateKey] ? dailyDataForValueDevelopment[dateKey] :
          {value: 0, invested: 0, gains: 0, realisedGains: 0, totalGains: 0, dividends: 0, taxes: 0, fees: 0};
        let assetDateData = assetDailyDataForValueDevelopment[dateKey];
        dailyDataForValueDevelopment[dateKey] = {};
        Object.keys(assetDateData).forEach(attribute => {
          if (attribute === 'quantity') return; //equal to continue in forEach
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

  Date.prototype.getFormattedString = function () {
    const date = new Date(this.valueOf());
    const year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    if (month.length === 1) {
      month = `0${month}`;
    }
    let day = `${date.getDate()}`;
    if (day.length === 1) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  // eslint-disable-next-line no-extend-native
  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  return (
    <Routes>
      <Route
        path='/'
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            addActivity={addActivity}
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            addActivity={addActivity}
            getAllAssets={getAllAssets}
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
          />}
      />
      <Route
        path='/activities/addActivity/:assetType/:asset/:assetName'
        element={
          <AddActivityScreen
            useParams
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            watchListsArray={watchListsArray}
            assetsListArray={assetsListArray}
            activePortfolio={activePortfolio}
            portfolioData={portfolioData}
            addActivity={addActivity}
            getAllAssets={getAllAssets}
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
          />}
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
            statusMessage={statusMessage}
            setStatusMessage={setStatusMessage}
            messageType={messageType}
            setMessageType={setMessageType}
          />}
      />
      <Route path='/about' element={<Home/>}/>
      <Route path='/impressum' element={<Impressum/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='/agb' element={<AGB/>}/>
    </Routes>
  );
}

export default AppRoutes;
