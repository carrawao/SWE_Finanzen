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

  const addActivity = (assettype, assetSymbol, type, date, quantity, sum, tax, fee) => {
    
    const activityObj = {
      "id": portfolioData["activities"].length,
      "assettype": assettype,
      "asset": assetSymbol,
      "type": type,
      "date": date,
      "quantity": quantity,
      "sum": sum,
      "tax": tax,
      "fee": fee
    }

    let assetData = portfolioData[assettype].find(element => element.symbol === assetSymbol);
    if (assetData === undefined) {
      const assetObj = {
        "id": portfolioData[assettype].length,
        "symbol": assetSymbol,
        "name": "",
        "value": "",
        "quantity": quantity
      }
    }

    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]["activities"].push(activityObj);
      return portfolioData;
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
  activePortfolio: PropTypes.array,
  portfolioData: PropTypes.array,
  setPortfolioData: PropTypes.func,
};

export default AddActivityScreen;

