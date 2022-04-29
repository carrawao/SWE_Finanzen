import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import {Grid, Box} from '@mui/material';
import PropTypes from 'prop-types';
import AllocationGraph from './AllocationGraph';
import PortfolioOverview from './PortfolioOverview';


const DashboardScreen = (props) => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const renderHeader = () => (
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
    );
  

  const renderBody = () => (
    
    <React.Fragment>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="space-evenly"
        marginTop= "10px"
        spacing={2}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={3}>
            <AllocationGraph
              portfolioData={props.portfolioData[props.activePortfolio]}
              getAllAssets={props.getAllAssets}
            />
          </Grid>
          <Grid item xs={7}>
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
          spacing={2}
        >
          <Grid item xs={6}>
            <Box border='1px solid black'>
              <AllocationGraph
                portfolioData={props.portfolioData[props.activePortfolio]}
                getAllAssets={props.getAllAssets}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box border='1px solid black'>
              <AllocationGraph
                portfolioData={props.portfolioData[props.activePortfolio]}
                getAllAssets={props.getAllAssets}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
    );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={1}
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
};

export default DashboardScreen;