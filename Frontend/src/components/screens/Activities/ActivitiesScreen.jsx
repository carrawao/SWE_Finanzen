import React, {useState} from 'react';
import {
  Container,
  Button,
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';

import ActivitiesList from './ActivitiesList';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField, CustomTable, SearchResultsTable} from '../../common';
import { renderRemoveActivityModal, renderAddActivityModal } from './Modals/activityModals';
import AddActivityForm from './AddActivityForm';

/**
 * Component related to the activities page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ActivitiesScreen = (props) => {
  
  const [addActivityModal, setAddActivityModal] = useState(false);

  const portfolioData = props.portfolioData[props.activePortfolio];

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
        "symbol": "IBM",
        "quantity": 2
      }
    ];
    const crypto = [
      {
        "symbol": "BTC",
        "quantity": 2
      }
    ];
    const cash = [
      {
        "symbol": "ING",
        "name": "ING Konto",
        "value": 900,
        "quantity": 1
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
        <Button onClick={() => setDummyActivities()}>Set Dummy Activities</Button>
        <Button onClick={() => setAddActivityModal(true)}>Add Activity</Button>
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
      {renderAddActivityModal(addActivityModal, setAddActivityModal, addActivity, props.portfolioData[props.activePortfolio])}
    </React.Fragment>
  );
}

ScreensTemplate.propTypes = {
  activePortfolio: PropTypes.array,
  portfolioData: PropTypes.array,
  setPortfolioData: PropTypes.func,
};

export default ActivitiesScreen;

