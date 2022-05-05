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
    //format the date to YYYY-MM-DD string
    const formattedDateString = ((new Date(date)).toISOString()).slice(0,10);
    
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
      fee: fee
    }

    //update assetData
    let assetData = portfolioData[assetType === "share" ? "shares" : assetType].find(element => element.symbol === asset.symbol);
    let updatedAssetData = assetData === undefined ? await newAssetData(activityObj) : await updateAssetData(assetData, activityObj);

    //update activitesArray
    let newActivities = portfolioData["activities"];
    //push activitiesObject
    newActivities.push(activityObj);
    //sort array by date (latest date at start of array)
    newActivities.sort((element1, element2) => {
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
      dailyValues: [],
      dailyDataForPerformanceGraph: [],
      dailyDataForValueDevelopment: [],
      analysisInfo: analysisInfo
    }

    return newAssetData;
  }

  const computeDailyValues = (symbol) => {
    //Work in progress...
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

  const renderHeader = () => (
      <SearchField

      />
  );

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

