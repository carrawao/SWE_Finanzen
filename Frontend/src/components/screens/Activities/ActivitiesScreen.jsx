import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';

import ActivitiesList from './ActivitiesList';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField, CustomTable, SearchResultsTable} from '../../common';
import { renderRemoveActivityModal } from './Modals/activityModals';

/**
 * Component related to the activities page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ActivitiesScreen = (props) => {

  const portfolioData = props.portfolioData[props.activePortfolio];

  let navigate = useNavigate(); 
  const routeChange = (path) =>{ 
    navigate(path);
  }

  const setDummyActivities = () => {  
    const activities = [
      {
          "assettype": "share", //,crypto oder cash
          "asset": "IBM", //symbol des assets
          "type": "buy", //mögliche Werte: buy (nicht für cash), sell (nicht für cash), dividend (nur für share), deposit (nur für cash), payout (nur für cash)
          "date": "Apr 12 2020 21:56 GMT+0200",
          "quantity": 2,
          "sum": 60.24,
          "tax": 0,
          "fee": 0
      },
      {
        "assettype": "share", //,crypto oder cash
        "asset": "IBM", //symbol des assets
        "type": "buy", //mögliche Werte: buy (nicht für cash), sell (nicht für cash), dividend (nur für share), deposit (nur für cash), payout (nur für cash)
        "date": "Apr 12 2021 21:56 GMT+0200",
        "quantity": 1,
        "sum": 35.24,
        "tax": 0,
        "fee": 0
      },
      {
        "assettype": "share", //,crypto oder cash
        "asset": "IBM", //symbol des assets
        "type": "sell", //mögliche Werte: buy (nicht für cash), sell (nicht für cash), dividend (nur für share), deposit (nur für cash), payout (nur für cash)
        "date": "Apr 12 2022 21:56 GMT+0200",
        "quantity": 1,
        "sum": 40.00,
        "tax": 0,
        "fee": 0
      },
      {
          "assettype": "crypto",
          "asset": "BTC", //symbol des assets
          "type": "buy", 
          "date": "Apr 12 2022 21:56 GMT+0200",
          "quantity": 2,
          "sum": 6000.24,
          "fee": 0,
          "tax": 0
      },
      {
          "assettype": "share", //nur für share
          "asset": "IBM", //symbol des assets
          "type": "dividend", //nur für assets die man davor im besitz hatte
          "date": "May 15 2021 21:56 GMT+0200",
          "quantity": 3,
          "sum": 20.24,
          "tax": 4.05,
          "fee": 0
      },
      {
          "assettype": "cash", //nur für cash
          "asset": "ING", //symbol des assets
          "type": "deposit",
          "date": "May 10 2021 21:56 GMT+0200",
          "quantity": 1,
          "sum": 1000.23,
          "tax": 0,
          "fee": 0
      },
      {
          "assettype": "cash", //nur für cash
          "asset": "ING", //symbol des assets
          "type": "payout",
          "date": "May 15 2021 21:56 GMT+0200",
          "quantity": 1,
          "sum": 100.23,
          "tax": 0,
          "fee": 0
      }
    ];
    const shares = [
      {
        id: 0,
        symbol: "IBM",
        name: "International Business Machines Corp",
        type: "Stock",
        value: 100,
        quantity: 2,
        invested: 100,
        gains: 0,
        realisedGains: 0,
        performance: 0,
        taxes: 0,
        fees: 0
      }
    ];
    const crypto = [
      {
        id: 0,
        symbol: "BTC",
        name: "Bitcoin",
        type: "Crypto",
        value: 1000,
        quantity: 2,
        invested: 1000,
        gains: 0,
        realisedGains: 0,
        performance: 0,
        taxes: 0,
        fees: 0
      }
    ];
    const cash = [
      {
        id: 0,
        symbol: "ING",
        name: "ING Konto",
        type: "Cash",
        value: 900,
        quantity: 1,
        invested: 900,
        gains: 0,
        realisedGains: 0,
        performance: 0,
        taxes: 0,
        fees: 0
      }
    ];
    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]["activities"]=activities;
      portfolioData[props.activePortfolio]["shares"]= shares;
      portfolioData[props.activePortfolio]["crypto"]= crypto;
      portfolioData[props.activePortfolio]["cash"]= cash;
      return portfolioData;
    });
    console.log(props.portfolioData); 
  }

  const clearActivities = () => {  
    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]["activities"]=[];
      portfolioData[props.activePortfolio]["shares"]= [];
      portfolioData[props.activePortfolio]["crypto"]= [];
      portfolioData[props.activePortfolio]["cash"]= [];
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
        <Button onClick={() => setDummyActivities()}>Set Dummy Activities</Button>
        <Button onClick={() => routeChange('addActivity')}>Add Activity</Button>
        <Button onClick={() => clearActivities()}>Clear Activities</Button>
        <ActivitiesList
          activePortfolio={props.activePortfolio}
          portfolioData={props.portfolioData}
          setPortfolioData={props.setPortfolioData}
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
      {renderRemoveActivityModal()}
    </React.Fragment>
  );
}

ScreensTemplate.propTypes = {
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
  setPortfolioData: PropTypes.func,
};

export default ActivitiesScreen;

