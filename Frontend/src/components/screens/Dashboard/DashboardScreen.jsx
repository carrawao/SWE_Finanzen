import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid, Box} from '@mui/material';
import PropTypes from 'prop-types';
import AllocationGraph from './AllocationGraph';
import PortfolioOverview from './PortfolioOverview';


const DashboardScreen = (props) => {

  const renderBody = () => (
    
    <React.Fragment>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="space-evenly"
        marginTop= "10px"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={4}>
            <AllocationGraph
              portfolioData={props.portfolioData[props.activePortfolio]}
              getAllAssets={props.getAllAssets}
            />
          </Grid>
          <Grid item xs={8}>
            <PortfolioOverview
              portfolioData={props.portfolioData}
              activePortfolio={props.activePortfolio}
              setActivePortfolio={props.setActivePortfolio}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignContent="center"
        >
          <Grid item xs={6}>
            
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
    );

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={1}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
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
  assetsListArray: PropTypes.array
};

export default DashboardScreen;