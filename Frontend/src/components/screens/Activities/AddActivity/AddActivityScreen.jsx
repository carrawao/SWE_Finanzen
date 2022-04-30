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

  const addActivity = (assetType, asset, type, date, quantity, sum, tax, fee) => {
    //define activityObject to push into activity array
    const activityObj = {
      id: portfolioData["activities"].length,
      assetType: assetType,
      shareType: assetType === "share" ? asset.assetType : undefined,
      asset: asset.symbol,
      assetName: asset.name,
      type: type,
      date: date,
      quantity: quantity,
      sum: sum,
      tax: tax,
      fee: fee
    }

    //update assetData
    let assetData = portfolioData[assetType === "share" ? "shares" : assetType].find(element => element.symbol === asset.symbol);
    if (assetType === "cash") {
      if (assetData === undefined) {
        assetData = {
          id: portfolioData[assetType === "share" ? "shares" : assetType].length,
          symbol: asset.symbol,
          name: asset.name,
          shareType: activityObj.shareType,
          value: sum,
          quantity: quantity,
          taxes: tax,
          fees: fee
        }
      } else {
        if (type === "deposit") {
          assetData = {
            ...assetData,
            value: assetData.value + sum,
            taxes: assetData.value.taxes + tax,
            fees: assetData.fees + fee
          }
        } else if (type === "payout") {
          assetData = {
            ...assetData,
            value: assetData.value - sum,
            taxes: assetData.value.taxes + tax,
            fees: assetData.fees + fee
          }
        }
      }
    } else {
      if (assetData === undefined) {
        assetData = {
          id: portfolioData[assetType === "share" ? "shares" : assetType].length,
          symbol: asset.symbol,
          name: asset.name,
          shareType: activityObj.shareType,
          value: sum,
          quantity: quantity,
          invested: sum,
          gains: 0,
          realisedGains: 0,
          performance: 0,
          taxes: tax,
          fees: fee
        }
      } else {
        if (type === "buy") {
          assetData = {
            ...assetData,
            quantity: assetData.quantity + quantity,
            invested: assetData.invested + sum,
            taxes: assetData.taxes + tax,
            fees: assetData.fees + fee
          }
        } 
      }
    }

    props.setPortfolioData(prevData => {
      const tempPortfolioData = {...prevData};
      tempPortfolioData[props.activePortfolio]["activities"].push(activityObj);
      tempPortfolioData[props.activePortfolio][assetType === "share" ? "shares" : assetType][assetData.id] = assetData;
      tempPortfolioData[props.activePortfolio]["updated"] = "1970-01-01";
      return tempPortfolioData;
    });
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

