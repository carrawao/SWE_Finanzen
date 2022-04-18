import React, {useState} from 'react';
import {
  Container,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography,
  Button,
  IconButton,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

import ActivitiesList from './ActivitiesList';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField, CustomTable, SearchResultsTable} from '../../common';
import { renderRemoveActivityModal, renderAddActivityModal } from './Modals/activityModals';

/**
 * Component related to the activities page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ActivitiesScreen = (props) => {
  
  const [addActivityModal, setActivityModal] = useState(false);
  const [activity, setActivity] = useState('');

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
        "quantity": 900 
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

  // const addActivity = (assettype, asset, type, date, time, quantity, sum, tax, fee) => {
  //   var obj = JSON.parse(userData['portfolios'][activePortfolio]["activities"]);
  //   obj['theTeam'].push({"teamId":"4","status":"pending"});
  //   jsonStr = JSON.stringify(obj);
  //   activityObj = {
  //     "assettype": assettype,
  //     "asset": asset,
  //     "type": type,
  //     "date": date,
  //     "time": time,
  //     "quantity": quantity,
  //     "sum": sum,
  //     "tax": tax,
  //     "fee": fee
  //   }
  //   userData['portfolios'][activePortfolio]["activities"].add(activityObj);
  // }

  const renderHeader = () => (
      <SearchField

      />
  );

  const renderBody = () => (
    <Grid className='d-flex justify-content-center pt-2'>
      <Container className='p-0'>
        <Button onClick={() => setDummyActivities()}>Set Dummy Activities</Button>
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
    </React.Fragment>
  );
}

ScreensTemplate.propTypes = {
  activePortfolio: PropTypes.array,
  portfolioData: PropTypes.array,
  setPortfolioData: PropTypes.func,
};

export default ActivitiesScreen;

