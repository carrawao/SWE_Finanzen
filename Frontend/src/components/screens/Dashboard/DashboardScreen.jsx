import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid} from '@mui/material';
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
        direction='row'
      >
        <Grid item xs={3}>
          <AllocationGraph
            portfolioData={props.portfolioData[props.activePortfolio]}
            activePortfolio={props.activePortfolio}
            getAllAssets={props.getAllAssets}
          />
        </Grid>
        <Grid item container direction='column' xs={9}>
          <Grid item textAlign={"right"}>
            <ChartButtons view={view} setView={setView}/>
          </Grid>
          <Grid item>
            <PortfolioOverview
              portfolioData={props.portfolioData}
              activePortfolio={props.activePortfolio}
              setActivePortfolio={props.setActivePortfolio}
            />
          </Grid>
        </Grid>
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