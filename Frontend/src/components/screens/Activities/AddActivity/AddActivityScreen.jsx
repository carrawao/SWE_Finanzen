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
    //define activityObject to push into activity array
    const activityObj = {
      id: portfolioData["activities"].length,
      assetType: assetType,
      assetTypeForDisplay: asset.assetType,
      asset: asset.symbol,
      assetName: asset.name ? asset.name : asset.symbol,
      type: type,
      date: date,
      quantity: quantity,
      value: value,
      sum: sum,
      tax: tax,
      fee: fee
    }

    //update assetData
    let assetData = portfolioData[assetType === "share" ? "shares" : assetType].find(element => element.symbol === asset.symbol);
    let updatedAssetData = assetData === undefined ? await newAssetData(activityObj) : await updateAssetData(assetData, activityObj);

    console.log(activityObj);

    props.setPortfolioData(prevData => {
      const tempPortfolioData = {...prevData};
      tempPortfolioData[props.activePortfolio]["activities"].push(activityObj);
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
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={3}
      />
    </React.Fragment>
  );
}

AddActivityScreen.propTypes = {
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
  setPortfolioData: PropTypes.func,
};

export default AddActivityScreen;

