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

  const addActivity = async (assetType, asset, type, date, quantity, sum, value, tax, fee) => {
    //find assetData related to activity
    let assetData = portfolioData[assetType === "share" ? "shares" : assetType].find(element => element.symbol === asset.symbol);
    //format the date to YYYY-MM-DD string
    const formattedDateString = ((new Date(date)).toISOString()).slice(0,10);
    const dependsOn = type === "sell" ? findDependsOn(assetData, quantity) : 
                      type === "dividend" ? findDependsOn(assetData, quantity) : 
                      type === "payout" ? findDependsOnCash(assetData, sum) :
                      type === "interest" ? findDependsOnCash(assetData, sum) :
                      []; //leer für buy oder deposit
    
    //define activityObject to push into activity array
    const activityObj = {
      id: portfolioData["activities"].length,
      assetType: assetType,
      assetTypeForDisplay: asset.assetType,
      asset: asset.symbol,
      assetName: asset.name ? asset.name : asset.symbol,
      type: type,
      date: formattedDateString,
      quantity: quantity,
      value: value,
      sum: sum,
      tax: tax,
      fee: fee,
      dependsOn: []
    }

    //update assetData
    let updatedAssetData = assetData === undefined ? await newAssetData(activityObj) : await updateAssetData(assetData, activityObj);

    //update activitesArray
    let newActivities = portfolioData["activities"];
    newActivities.push(activityObj);
    newActivities = sortActivities(newActivities);

    props.setPortfolioData(prevData => {
      const tempPortfolioData = {...prevData};
      tempPortfolioData[props.activePortfolio]["activities"] = newActivities;
      if (assetData === undefined) {
        tempPortfolioData[props.activePortfolio][assetType === "share" ? "shares" : assetType].push(updatedAssetData);
      } else {
        tempPortfolioData[props.activePortfolio][assetType === "share" ? "shares" : assetType][assetData.id] = updatedAssetData;
      }
      tempPortfolioData[props.activePortfolio]["updated"] = "1970-01-01";
      return tempPortfolioData;
    });
  }

  const findDependsOn = () => {

  }

  const findDependsOnCash = () => {

  }
  
  const updateAssetData = async (assetData, activityObj) => {
    if (activityObj.assetType === "cash") {
      //Work in progress...
      const newValue = activityObj.type === "payout" ? (assetData.value + activityObj.sum) : (assetData.value - activityObj.sum);
      const newInvested = activityObj.type === "deposit" ? (assetData.invested + activityObj.sum) : activityObj.type === "payout" ?  (assetData.invested - activityObj.sum) : assetData.invested;
      let newGains = activityObj.type === "interest" ? (assetData.gains + activityObj.sum) : assetData.gains;
      //tax and fees are negative gains
      newGains = newGains - activityObj.tax - activityObj.fee;
      //realisedGains same as gains for cash
      const newRealisedGains = newGains;
      const newPerformance = (newGains/newInvested)*100;
      
      const updatedAssetData = {
        ...assetData,
        value: newValue,
        invested: newInvested,
        gains: newGains,
        realisedGains: newRealisedGains,
        performance: newPerformance,
        taxes: assetData.taxes + activityObj.tax,
        fees: assetData.fees + activityObj.fee
      }
      return updatedAssetData;
    } else {
      //Work in progress...
      return assetData;
      //Crypto or Share
      const newInvested = activityObj.type === "buy" ? (assetData.invested + activityObj.sum) : activityObj.type === "payout" ?  (assetData.invested - activityObj.sum) : assetData.invested;
      let newGains = activityObj.type === "dividend" ? (assetData.gains + activityObj.sum) : assetData.gains;
      //tax and fees are negative gains
      newGains = newGains - activityObj.tax - activityObj.fee;
      //realisedGains same as gains for cash
      const newRealisedGains = newGains;
      const newPerformance = (newGains/newInvested)*100;
      
      const updatedAssetData = {
        ...assetData,
        invested: newInvested,
        gains: newGains,
        realisedGains: newRealisedGains,
        performance: newPerformance,
        taxes: assetData.taxes + activityObj.tax,
        fees: assetData.fees + activityObj.fee
      }
      return updatedAssetData;
      
    }
  }
  
  const newAssetData = async (activityObj) => {
    const analysisInfo = activityObj.assetType === "share" ? await fetchAnalysisInfo(activityObj.asset) : undefined;
    const dailyDataArrays = await createDailyDataArrays(activityObj);
    const dailyDataForPerformanceGraph = dailyDataArrays["dailyDataForPerformanceGraph"];
    const dailyDataForValueDevelopment = dailyDataArrays["dailyDataForValueDevelopment"];
        
    const newAssetData = {
      id: portfolioData[activityObj.assetType === "share" ? "shares" : activityObj.assetType].length,
      firstActivity: activityObj.date, 
      symbol: activityObj.asset,
      name: activityObj.assetName,
      assetTypeForDisplay: activityObj.assetTypeForDisplay,
      value: activityObj.sum,
      quantity: activityObj.quantity,
      invested: activityObj.sum,
      unrealisedGains: 0,
      realisedGains: 0,
      totalGains: 0,
      performanceWithRealisedGains: 0,
      performanceWithOutRealisedGains: 0,
      taxes: activityObj.tax,
      fees: activityObj.fee,
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph,
      dailyDataForValueDevelopment: dailyDataForValueDevelopment,
      bought: [{date: activityObj.date, price: activityObj.price, quantity: activityObj.quantity}],
      analysisInfo: analysisInfo
    }

    return newAssetData;
  }

  const createDailyDataArrays = async (activityObj) => {
    const dailyValuesData = await fetchDailyValues(activityObj.asset, activityObj.assetType);
    const dailyValues = dailyValuesData["Time Series (Daily)"];
    const dailyDataForValueDevelopment = await createDailyDataForValueDevelopment(dailyValues, activityObj);
    const dailyDataForPerformanceGraph = await createDailyDataForPerformanceGraph(dailyDataForValueDevelopment);
    const dailyDataArrays = {
      dailyDataForPerformanceGraph: dailyDataForPerformanceGraph,
      dailyDataForValueDevelopment: dailyDataForValueDevelopment
    }
    console.log(dailyDataArrays);
    return dailyDataArrays;
  }
  
  const createDailyDataForValueDevelopment = async (dailyValues, activityObj) => {
    const dailyValuesKeys = Object.keys(dailyValues);
    let dateString = activityObj.date;
    if (dateString === ((new Date()).toISOString()).slice(0,10)) {
      const date = new Date(dateString);
      let yesterday = new Date(date.getTime());
      yesterday.setDate(date.getDate() - 1);
      dateString = yesterday.toISOString().slice(0,10);
    }
    const dailyDataKeys = sliceKeysAtDate(dailyValuesKeys, dateString);
    let dailyDataForValueDevelopment = {};
    await dailyDataKeys.forEach((key) => {
      const value = (dailyValues[key]["4. close"]*activityObj.quantity).toFixed(2);
      const invested = activityObj.sum;
      const gains = (value-invested-activityObj.tax-activityObj.fee).toFixed(2);
      
      dailyDataForValueDevelopment[key] = {
        value: value,
        invested: invested,
        gains: gains,
        realisedGains: 0,
        totalGains: gains,
        taxes: activityObj.tax,
        fees: activityObj.fee
      }
    });
    return dailyDataForValueDevelopment;
  }

  const createDailyDataForPerformanceGraph = async (dailyDataForValueDevelopment) => {
    const dailyDataKeys = Object.keys(dailyDataForValueDevelopment);
    const dailyDataForPerformanceGraph = {};
    await dailyDataKeys.forEach((key) => {
      const dailyDataFVD = dailyDataForValueDevelopment[key];
      const performanceWithRealisedGains = (dailyDataFVD.totalGains/dailyDataFVD.invested*100).toFixed(2);
      const performanceWithoutRealisedGains = (dailyDataFVD.gains/dailyDataFVD.invested*100).toFixed(2);
      dailyDataForPerformanceGraph[key] = {
        performanceWithRealisedGains: performanceWithRealisedGains,
        performanceWithoutRealisedGains: performanceWithoutRealisedGains
      }
    });
    return dailyDataForPerformanceGraph;
  }

  const sliceKeysAtDate = (keys, date) => {
    const index = keys.indexOf(date);
    return keys.slice(0,index+1);
  }

  const updateDailyDataArrays = async (activityObj) => {
    
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

  const fetchAnalysisInfo = async (symbol) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/getShareInformationsForAnalyse?symbol=${symbol}`, {mode:'cors'})
        const json = await response.json();
        let results = json;
        return results;
    }
    catch (e) {
        console.log('fetching failed === ', e);
    };
  }

  const fetchDailyValues = async (symbol, assetType) => {
    const fetchFunc = assetType === "crypto" ? "dailyCrypto" : "dailyShare";
    try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/${fetchFunc}?symbol=${symbol}`, {mode:'cors'})
        const json = await response.json();
        let results = json;
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
  assetsListArray: PropTypes.array
};

export default AddActivityScreen;

