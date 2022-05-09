import React, {useState} from 'react';
import {
  Container,
  Button,
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';

import ScreensTemplate from '../../../ScreensTemplate';
import {SearchField, CustomTable, SearchResultsTable} from '../../../common';
import AddActivityForm from './AddActivityForm';

/**
 * Component related to the activities page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AddActivityScreen = (props) => {

  const portfolioData = props.portfolioData[props.activePortfolio];

  const addActivity = async (assetType, asset, type, date, quantity, sum, value, taxes, fees) => {
    
    //find assetData related to activity
    let assetData = portfolioData[assetType === 'share' ? 'shares' : assetType].find(element => element.symbol === asset.symbol);

    //format the date to YYYY-MM-DD string
    const formattedDateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const dependsOn = type === 'sell' ? findDependsOn(assetData.buys, quantity) : 
                      type === 'dividend' ? findDependsOn(assetData.buys, quantity) : 
                      type === 'payout' ? findDependsOnCash(assetData.deposits, sum) :
                      type === 'interest' ? findDependsOnCash(assetData.deposits, sum) :
                      []; //leer für buy oder deposit

    //define activityObject to push into activity array
    const activityObj = {
      id: portfolioData['activitiesLastId']+1,
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
    console.log("activityObj", activityObj);

    //update assetData
    let updatedAssetData = assetData === undefined ? await createNewAssetData(activityObj) : //create newAssetData if doesn't exist
                           await updateAssetData(assetData, activityObj); //update existing assetData

    console.log("updatedAssetData", updatedAssetData);

    //update activitesArray
    let newActivities = portfolioData['activities'];
    newActivities.push(activityObj);
    newActivities = sortActivities(newActivities);

    props.setPortfolioData(prevData => {
      let tempPortfolioData = {...prevData};
      tempPortfolioData[props.activePortfolio]['activities'] = newActivities;
      tempPortfolioData[props.activePortfolio]['activitiesLastId'] = activityObj.id;
      if (assetData === undefined) {
        tempPortfolioData[props.activePortfolio][assetType === 'share' ? 'shares' : assetType].push(updatedAssetData);
      } else {
        tempPortfolioData[props.activePortfolio][assetType === 'share' ? 'shares' : assetType][assetData.id] = updatedAssetData;
      }
      return tempPortfolioData;
    });
    recalculatePortfolioDataFromDate(updatedAssetData);
  }

  const findDependsOn = (buys, quantity) => {
    let dependsOn = [];
    for (let index = 0; index < buys.length; index++) {
      const buy = buys[index];
      quantity -= buy.quantity;
      dependsOn.push(buy.id);
      if (quantity <= 0) {
        return dependsOn;
      }
    }
  }

  const findDependsOnCash = (deposits, sum) => {
    let dependsOn = [];
    for (let index = 0; index < deposits.length; index++) {
      const deposit = deposits[index];
      sum -= deposit.sum;
      dependsOn.push(deposit.id);
      if (sum <= 0) {
        return dependsOn;
      }
    }
  }
  
  const updateAssetData = async (assetData, activityObj) => {
    if (activityObj.assetType === 'cash') {
      const firstActivity = new Date(assetData.firstActivity) > new Date(activityObj.date) ? activityObj.date : assetData.firstActivity;
      //update stateChangesArray
      const [newStateChanges, newStateIndex] = updateStateChangesCash(assetData, activityObj);
      console.log('newStateChanges', newStateChanges);
      //updateDailyDataArrays
      const dailyDataForValueDevelopment = updateDailyDataForValueDevelopmentCash(assetData, newStateChanges, newStateIndex);

      //update deposits
      const newDeposits = updateDepositsArray(assetData.deposits, activityObj);

      const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
    
      const updatedAssetData = {...assetData,
        firstActivity: firstActivity, 
        value: dailyDataForValueDevelopment[latestDateWithData]['value'],
        realisedGains: dailyDataForValueDevelopment[latestDateWithData]['realisedGains'],
        totalGains: dailyDataForValueDevelopment[latestDateWithData]['realisedGains'],
        taxes: dailyDataForValueDevelopment[latestDateWithData]['taxes'],
        fees: dailyDataForValueDevelopment[latestDateWithData]['fees'],
        dailyDataForValueDevelopment: dailyDataForValueDevelopment,
        stateChanges: newStateChanges,
        deposits: newDeposits
      }
      return updatedAssetData;
    } else {
      //Crypto or Share
      const firstActivity = new Date(assetData.firstActivity) > new Date(activityObj.date) ? activityObj.date : assetData.firstActivity;
      //update stateChangesArray
      const [newStateChanges, newStateIndex] = updateStateChanges(assetData, activityObj);
      console.log('newStateChanges', newStateChanges);
      //updateDailyDataArrays
      const dailyDataArrays = await updateDailyDataArrays(assetData, newStateChanges, newStateIndex, activityObj);
      const dailyDataForValueDevelopment = dailyDataArrays['dailyDataForValueDevelopment'];
      const dailyDataForPerformanceGraph = dailyDataArrays['dailyDataForPerformanceGraph'];

      //update buys and sort it by date
      const newBuys = updateBuysArray(assetData.buys, activityObj);

      const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
    
      const updatedAssetData = {...assetData,
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
      }
      return updatedAssetData;
    }
  }

  const updateStateChanges = (assetData, activityObj) => {
    let stateChanges = assetData.stateChanges;
    const previousStateObj = findPreviousState(stateChanges, activityObj);
    //no previousState
    if (previousStateObj.index === -1) {
      //can only be a buy
      const stateChange = {quantity: activityObj.quantity, sum: activityObj.sum, realisedGains: -activityObj.fees, taxes: activityObj.taxes, fees: activityObj.fees};
      stateChanges.unshift({date: activityObj.date, assetType: activityObj.assetType, quantity: 0, sum: 0, realisedGains: 0, taxes: 0, fees: 0});
      stateChanges = addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, 0);
      return [stateChanges, 0];
    }
    const quantityChange = activityObj.type === 'buy' ? activityObj.quantity : activityObj.type === 'sell' ? -activityObj.quantity : 0;
    let investedChange = activityObj.type === 'buy' ? activityObj.sum : 0;
    let realisedGains = activityObj.type === 'dividend' ? activityObj.sum : 0;
    if (activityObj.type === 'sell') {
      investedChange = calculateInvestedChange(assetData.buys, activityObj.quantity);
      realisedGains = (activityObj.sum + investedChange);
    }
    const stateChange = {quantity: quantityChange, sum: investedChange, realisedGains: (realisedGains-activityObj.fees), taxes: activityObj.taxes, fees: activityObj.fees};
    //previous State is on the same date
    if (previousStateObj.overwrite) {
      stateChanges = addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index);
      return [stateChanges, previousStateObj.index];
    } else {
      const newState = {...stateChanges[previousStateObj.index], date: activityObj.date};
      stateChanges.splice(previousStateObj.index+1, 0, newState);
      stateChanges = addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index+1);
      return [stateChanges, previousStateObj.index+1];
    }
  }

  const updateStateChangesCash = (assetData, activityObj) => {
    let stateChanges = assetData.stateChanges;
    const previousStateObj = findPreviousState(stateChanges, activityObj);
    //no previousState
    if (previousStateObj.index === -1) {
      //can only be a deposit
      const stateChange = {sum: activityObj.sum, quantity: 0, realisedGains: -activityObj.fees, taxes: activityObj.taxes, fees: activityObj.fees};
      stateChanges.unshift({date: activityObj.date, assetType: activityObj.assetType, quantity: 1, sum: 0, realisedGains: 0, taxes: 0, fees: 0});
      stateChanges = addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, 0);
      return [stateChanges, 0];
    }
    const sumChange = activityObj.type === 'deposit' ? activityObj.sum : -activityObj.sum;
    const stateChange = {sum: sumChange, quantity: 0, realisedGains: (-activityObj.fees), taxes: activityObj.taxes, fees: activityObj.fees};
    //previous State is on the same date
    if (previousStateObj.overwrite) {
      stateChanges = addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index);
      return [stateChanges, previousStateObj.index];
    } else {
      const newState = {...stateChanges[previousStateObj.index], date: activityObj.date};
      stateChanges.splice(previousStateObj.index+1, 0, newState);
      stateChanges = addStateChangeToEachStateFromIndexOn(stateChange, stateChanges, previousStateObj.index+1);
      return [stateChanges, previousStateObj.index+1];
    }
  }

  const findPreviousState = (stateChanges, activityObj) => {
    if (stateChanges.length === 0) {
      const returnObj = {index: -1, overwrite: false};
      return returnObj;
    }
    for (let index = 0; index < stateChanges.length; index++) {
      const state = stateChanges[index];
      const activityDate = new Date(activityObj.date);
      const stateDate = new Date(state.date);
      if (activityDate < stateDate) {
        //state before this state is the previous state
        const returnObj = {index: index-1, overwrite: false};
        return returnObj;
      } else if (activityDate.valueOf() === stateDate.valueOf()) {
        //this state is the previous state
        const returnObj = {index: index, overwrite: true};
        return returnObj;
      }
      if (index === (stateChanges.length-1)) {
        //if previous state wasn't found until the last state is reached then it must be the previous state
        const returnObj = {index: index, overwrite: false};
        return returnObj;
      }
    }
  }

  const addStateChangeToEachStateFromIndexOn = (stateChange, stateChanges, index) => {
    for (let i = index; i < stateChanges.length; i++) {
      let state = stateChanges[i];
      Object.keys(state).forEach(attribute => {
        if (attribute==='date' || attribute==='assetType') return; //equal to continue in forEach
        stateChanges[i][attribute] = state[attribute] + stateChange[attribute];
      });
    }
    return stateChanges;
  }

  const calculateInvestedChange = (buys, quantity) => {
    let investedChange = 0;
    for (let i = 0; i < buys.length; i++) {
      const buy = buys[i];
      let newQuantity = quantity - buy.quantity;
      if (newQuantity <= 0) {
        investedChange = investedChange - buy.price*quantity;
        return investedChange;
      } else {
        investedChange = investedChange - buy.price*buy.quantity;
        quantity = newQuantity;
      }
    }
  }

  const updateDailyDataArrays = async (assetData, stateChanges, newStateIndex, activityObj) => {
    const stateChangesForUpdate = stateChanges.slice(newStateIndex);
    const dailyValues = await fetchDailyValues(activityObj.asset, activityObj.assetType);
    let dailyDataForValueDevelopment = {...assetData.dailyDataForValueDevelopment}
    await stateChangesForUpdate.forEach((state, index) => {
      const cutOffDate = stateChangesForUpdate[index+1] ? stateChangesForUpdate[index+1].date : undefined;
      const stateDailyData = createDailyDataForValueDevelopment(dailyValues, state, cutOffDate);
      dailyDataForValueDevelopment = {...dailyDataForValueDevelopment, ...stateDailyData};
    });
    const dailyDataForPerformanceGraph = createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const dailyDataArrays = {
      dailyDataForValueDevelopment: dailyDataForValueDevelopment,
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph
    }
    return dailyDataArrays;
  }

  const updateDailyDataForValueDevelopmentCash = (assetData, stateChanges, newStateIndex) => {
    const stateChangesForUpdate = stateChanges.slice(newStateIndex);
    let dailyDataForValueDevelopment = {...assetData.dailyDataForValueDevelopment};
    for (let index = 0; index < stateChangesForUpdate.length; index++) {
      const state = stateChangesForUpdate[index];
      const cutOffDate = stateChangesForUpdate[index+1] ? stateChangesForUpdate[index+1].date : undefined;
      const stateDailyData = createDailyDataForValueDevelopment({'1900-01-01': {value: state.sum}}, state, cutOffDate);
      dailyDataForValueDevelopment = {...dailyDataForValueDevelopment, ...stateDailyData};
    }
    return dailyDataForValueDevelopment;
  }

  const updateBuysArray = (oldBuys, activityObj) => {
    let newBuys = oldBuys;
    if (activityObj.type === "buy") {
      newBuys = addToBuysArray(oldBuys, activityObj);
    } else if (activityObj.type === "sell") {
      newBuys = deleteFromBuysArray(oldBuys, activityObj.quantity);
    }
    console.log("newBuys", newBuys)
    return newBuys;
  }

  const addToBuysArray = (buys, activityObj) => {
    buys.push({id: activityObj.id, date: activityObj.date, price: activityObj.value, quantity: activityObj.quantity});
    buys.sort((buy1, buy2) => new Date(buy1.date) - new Date(buy2.date));
    return buys;
  }

  const deleteFromBuysArray = (buys, quantity) => {
    const buysInitialLength = buys.length;
    for (let index = 0; index < buysInitialLength; index++) {
      //we work with the first buy in every iteration (because we only get to the next iteration when the original first buy in the array is deleted)
      const buy = buys[0];
      if (buy.quantity <= quantity) {
        quantity -= buy.quantity;
        buys.shift();
        if(quantity === 0) {
          return buys;
        }
      } else {
        buys[0].quantity = buys[0].quantity - quantity;
        return buys;
      }
    }
  }

  const updateDepositsArray = (oldDeposits, activityObj) => {
    let newDeposits = oldDeposits;
    if (activityObj.type === "deposit") {
      newDeposits = addToDepositsArray(oldDeposits, activityObj);
    } else if (activityObj.type === "payout") {
      newDeposits = deleteFromDepositsArray(oldDeposits, activityObj.sum);
    }
    console.log("newDeposits", newDeposits)
    return newDeposits;
  }

  const addToDepositsArray = (deposits, activityObj) => {
    deposits.push({id: activityObj.id, date: activityObj.date, sum: activityObj.sum});
    deposits.sort((deposit1, deposit2) => new Date(deposit1.date) - new Date(deposit2.date));
    return deposits;
  }

  const deleteFromDepositsArray = (deposits, sum) => {
    const depositsInitialLength = deposits.length;
    for (let index = 0; index < depositsInitialLength; index++) {
      //we work with the first buy in every iteration (because we only get to the next iteration when the original first buy in the array is deleted)
      const deposit = deposits[0];
      if (deposit.sum <= sum) {
        sum -= deposit.sum;
        deposits.shift();
        if(sum === 0) {
          return deposits;
        }
      } else {
        deposits[0].sum = deposits[0].sum - sum;
        return deposits;
      }
    }
  }
  
  const createNewAssetData = async (activityObj) => {
    const analysisInfo = activityObj.assetType === 'share' ? await fetchAnalysisInfo(activityObj.asset) : undefined;
    const dailyDataArrays = await createDailyDataArrays(activityObj);
    const dailyDataForValueDevelopment = dailyDataArrays['dailyDataForValueDevelopment'];
    const dailyDataForPerformanceGraph = dailyDataArrays['dailyDataForPerformanceGraph'];

    const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
    const newAssetData = {
      id: portfolioData[activityObj.assetType === 'share' ? 'shares' : activityObj.assetType].length,
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
      stateChanges: [{date: activityObj.date, assetType: activityObj.assetType, quantity: activityObj.quantity, sum: activityObj.sum, realisedGains: -activityObj.fees, taxes: activityObj.taxes, fees: activityObj.fees}],
      buys: [{id: activityObj.id, date: activityObj.date, price: activityObj.value, quantity: activityObj.quantity}],
      analysisInfo: analysisInfo
    }
    return newAssetData;
  }

  const createDailyDataArrays = async (activityObj) => {
    const dailyValues = await fetchDailyValues(activityObj.asset, activityObj.assetType);
    const dailyDataForValueDevelopment = createDailyDataForValueDevelopment(dailyValues, activityObj);
    const dailyDataForPerformanceGraph = createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const dailyDataArrays = {
      dailyDataForValueDevelopment: dailyDataForValueDevelopment,
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph
    }
    return dailyDataArrays;
  }
  
  const createDailyDataForValueDevelopment = (dailyValues, state, cutOffDate) => {
    if (cutOffDate === undefined) {
      const today = new Date();
      cutOffDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    }
    let dailyDataKeys = createDailyKeys(state.date, cutOffDate);
    let dailyValueKeys = Object.keys(dailyValues);
    let dailyDataForValueDevelopment = {};
    dailyDataKeys.forEach((key, index) => {
      let dateData = dailyValues[key];
      if (dateData === undefined) {
        for (let i = 0; i < dailyValueKeys.length; i++) {
          if (new Date(key) > new Date(dailyValueKeys[i])) {
            dateData = dailyValues[dailyValueKeys[i]];
            break;
          }
        }
      }
      const value = dateData[state.assetType === 'crypto' ? '4a. close (EUR)' : state.assetType === 'share' ? '4. close' : 'value']*state.quantity;
      const invested = state.sum;
      const gains = value - invested;
      const realisedGains = -state.fees;
      
      dailyDataForValueDevelopment[key] = {
        value: value,
        quantity: state.quantity,
        invested: invested,
        gains: gains,
        realisedGains: realisedGains,
        totalGains: gains+realisedGains,
        taxes: state.taxes,
        fees: state.fees
      }
    });
    return dailyDataForValueDevelopment;
  }

  Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
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

  const createDailyKeys = (startDateString, cutOffDateString) => {
    let dailyKeys = [];
    let currentDate = new Date(startDateString);
    const cutOffDate = new Date(cutOffDateString);
    if (currentDate.getTime() === cutOffDate.getTime()) {
      currentDate = currentDate.addDays(-1);
    }
    while (currentDate < cutOffDate) {
      dailyKeys.push(currentDate.getFormattedString());
      currentDate = currentDate.addDays(1);
    }
    return dailyKeys.reverse();
  }

  const createDailyDataForPerformanceGraph = (dailyDataForValueDevelopment) => {
    const dailyDataKeys = Object.keys(dailyDataForValueDevelopment);
    const dailyDataForPerformanceGraph = {};
    dailyDataKeys.forEach((key) => {
      const dailyDataFVD = dailyDataForValueDevelopment[key];
      const performanceWithRealisedGains = (dailyDataFVD.totalGains/dailyDataFVD.invested)*100;
      const performanceWithoutRealisedGains = (dailyDataFVD.gains/dailyDataFVD.invested)*100;
      dailyDataForPerformanceGraph[key] = {
        performanceWithRealisedGains: performanceWithRealisedGains,
        performanceWithoutRealisedGains: performanceWithoutRealisedGains
      }
    });
    return dailyDataForPerformanceGraph;
  }

  //sort activitiesArray by date (latest date at start of array), by name (alphabetical) and by type (alphabetical)
  const sortActivities = (activitesArray) => {
    activitesArray.sort((element1, element2) => {
      const dateResult = (new Date(element2.date)) - (new Date(element1.date));
      if (dateResult === 0) {
        //if date is the same sort by assetName
        const nameResult = element1.assetName > element2.assetName ? 1 : element2.assetName > element1.assetName ? -1 : 0;
        if (nameResult === 0) {
          //if name is the same sort by activityType
          const typeResult = element1.type > element2.type ? 1 : element2.type > element1.type ? -1 : 0;
          return typeResult;
        }
        return nameResult;
      }
      return dateResult;
    });
    return activitesArray;
  }

  const recalculatePortfolioDataFromDate = async (assetData) => {
		const dailyDataForValueDevelopment = await recalculateDailyDataForValueDevelopmentFromDate(assetData);
		const dailyDataForPerformanceGraph = createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const latestDateWithData = (Object.keys(dailyDataForValueDevelopment))[0];
		props.setPortfolioData(prevData => {
      let tempPortfolioData = {...prevData};
      tempPortfolioData[props.activePortfolio]['dailyDataForValueDevelopment'] = {...tempPortfolioData[props.activePortfolio]['dailyDataForValueDevelopment'], ...dailyDataForValueDevelopment};
			tempPortfolioData[props.activePortfolio]['dailyDataForPerformanceGraph'] = {...tempPortfolioData[props.activePortfolio]['dailyDataForPerformanceGraph'], ...dailyDataForPerformanceGraph};
			tempPortfolioData[props.activePortfolio]['value'] = dailyDataForValueDevelopment[latestDateWithData]['value'];
			tempPortfolioData[props.activePortfolio]['invested'] = dailyDataForValueDevelopment[latestDateWithData]['invested'];
			tempPortfolioData[props.activePortfolio]['gains'] = dailyDataForValueDevelopment[latestDateWithData]['gains'];
			tempPortfolioData[props.activePortfolio]['realisedGains'] = dailyDataForValueDevelopment[latestDateWithData]['realisedGains'];
			tempPortfolioData[props.activePortfolio]['totalGains'] = dailyDataForValueDevelopment[latestDateWithData]['totalGains'];
      tempPortfolioData[props.activePortfolio]['fees'] = dailyDataForValueDevelopment[latestDateWithData]['fees'];
			tempPortfolioData[props.activePortfolio]['taxes'] = dailyDataForValueDevelopment[latestDateWithData]['taxes'];
			tempPortfolioData[props.activePortfolio]['performanceWithRealisedGains'] = dailyDataForPerformanceGraph[latestDateWithData]['performanceWithRealisedGains'];
			tempPortfolioData[props.activePortfolio]['performanceWithoutRealisedGains'] = dailyDataForPerformanceGraph[latestDateWithData]['performanceWithoutRealisedGains'];
      tempPortfolioData[props.activePortfolio]['updated'] = '1970-01-01';
      console.log("updatedPortfolioData", tempPortfolioData);
      return tempPortfolioData;
    });
	}

	const recalculateDailyDataForValueDevelopmentFromDate = async (assetData) => {
		const allAssetsArray = props.getAllAssets();
		const dateKeys = Object.keys(assetData['dailyDataForValueDevelopment']);

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

  const fetchAnalysisInfo = async (symbol) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/getShareInformationsForAnalyse?symbol=${symbol}`, {mode:'cors'})
        const json = await response.json();
        return json;
    }
    catch (e) {
        console.log('fetching failed === ', e);
    };
  }

  const fetchDailyValues = async (symbol, assetType) => {
    const fetchFunc = assetType === 'crypto' ? 'dailyCrypto' : 'dailyShare';
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/${fetchFunc}?symbol=${symbol}`, {mode:'cors'})
        const json = await response.json();
        let results = json[assetType === 'crypto' ? 'Time Series (Digital Currency Daily)' : 'Time Series (Daily)'];
        return results;
    }
    catch (e) {
        console.log('fetching failed === ', e);
    };
  }

  const renderBody = () => (
    <Grid className='d-flex justify-content-center pt-2'>
      <Container className='p-0'>
        <AddActivityForm
          addActivity={addActivity} 
          portfolioData={portfolioData}
        />
      </Container>
    </Grid>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={3}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
    </React.Fragment>
  );
}

AddActivityScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
  setPortfolioData: PropTypes.func,
  getAllAssets: PropTypes.func,
  assetsListArray: PropTypes.array,
};

export default AddActivityScreen;

