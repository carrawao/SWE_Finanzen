import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid, Box} from '@mui/material';
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
          <Box className='d-flex justify-content-center mb-2'>
            <ChartButtons view={view} setView={setView}/>
          </Box>
          <Box className='d-flex justify-content-center mb-4'>
            <PortfolioOverview
              portfolioData={props.portfolioData}
              activePortfolio={props.activePortfolio}
              setActivePortfolio={props.setActivePortfolio}
            />
          </Box>
        </Box>
      </Grid>
      <PortfolioCharts view={view} {...props}/>
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