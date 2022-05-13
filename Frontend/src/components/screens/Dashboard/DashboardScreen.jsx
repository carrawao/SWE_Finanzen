import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid, Typography, Box, Button} from '@mui/material';
import PropTypes from 'prop-types';
import AllocationGraph from './AllocationGraph';
import PortfolioOverview from './PortfolioOverview';
import PortfolioCharts from './PortfolioCharts';
import ChartButtons from '../AssetDetails/ChartButtons';

/**
 * Component related to the dashboard screen
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DashboardScreen = props => {
  const [view, setView] = useState('month');

  const dummyCash = () => {
    const cash = [{
      firstActivity: '2900-01-01',     
      id: 0,
      symbol: 'ING',
      name: 'ING Konto',
      assetTypeForDisplay: 'Cash',
      value: 0,
      quantity: 1,
      gains: 0,
      realisedGains: 0,
      totalGains: 0,
      performanceWithRealisedGains: 0,
      performanceWithOutRealisedGains: 0,
      taxes: 0,
      fees: 0,
      dailyDataForPerformanceGraph: [],
      dailyDataForValueDevelopment: [],
      stateChanges: [],
      deposits: [],
      analysisInfo: undefined
    }]

    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]['cash'] = cash;
      return portfolioData;
    });
  }

  const renderBody = () => (
    <React.Fragment>
      <Grid
        container
        className=' col-12 d-flex flex-column flex-xl-row justify-content-center align-items-center'
      >
        <Grid item className='col-11 col-sm-7 col-md-5 col-xl-4'>
          <AllocationGraph
            portfolioData={props.portfolioData[props.activePortfolio]}
            activePortfolio={props.activePortfolio}
            getAllAssets={props.getAllAssets}
          />
        </Grid>
        <Box className='col-12 col-md-10 flex-xl-column col-xl-8'>
          <Box className='d-flex justify-content-center mb-4'>
            <PortfolioOverview
              portfolioData={props.portfolioData}
              activePortfolio={props.activePortfolio}
              setActivePortfolio={props.setActivePortfolio}
            />
          </Box>
          <Box className='d-flex justify-content-center mb-2'>
            <ChartButtons view={view} setView={setView}/>
          </Box>
        </Box>
      </Grid>
      {Object.keys(props.portfolioData[props.activePortfolio]['dailyDataForValueDevelopment']).length === 0 ? 
        <Typography></Typography>
        :
        <PortfolioCharts view={view} {...props}/>
      }
      <Button
        variant='outlined'
        type='submit'
        onClick={() => dummyCash()}
        sx={{
          margin: '1rem',
          color: '#4eb96f',
          borderColor: '#4eb96f',
          backgroundColor: 'white',
          '&:hover': {
            borderColor: '#068930',
            backgroundColor: 'white',
            color: '#068930',
          },
        }}
      >
        Add a dummy cash account
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={0}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
        statusMessage={props.statusMessage}
        setStatusMessage={props.setStatusMessage}
        messageType={props.messageType}
        setMessageType={props.setMessageType}
      />
    </React.Fragment>

  );
}

DashboardScreen.propTypes = {
  activePortfolio: PropTypes.string,
  setActivePortfolio: PropTypes.func,
  portfolioData: PropTypes.object,
  setPortfolioData: PropTypes.func,
  getAllAssets: PropTypes.func,
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array,
  statusMessage: PropTypes.string,
  setStatusMessage: PropTypes.func,
  messageType: PropTypes.string,
  setMessageType: PropTypes.func
};

export default DashboardScreen;