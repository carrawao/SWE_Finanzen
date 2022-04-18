import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';
import AllocationGraph from './AllocationGraph';
import PortfolioOverview from './PortfolioOverview';


const DashboardScreen = (props) => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const updatedDate = new Date(props.portfolioData[props.activePortfolio]["updated"]);
    const updated = "" + updatedDate.getDay() + updatedDate.getMonth() + updatedDate.getFullYear();
    const todayDate = new Date();
    const today = "" + todayDate.getDay() + todayDate.getMonth() + todayDate.getFullYear();

    if (updated !== today) {
      updatePortfolioData();
    }

    const updatePortfolioData = async () => {
      const shares = props.portfolioData[props.activePortfolio]["shares"];
      shares.forEach((share, index) => {
        symbol = share["symbol"];
        try {
          return await fetch(`http://localhost:3001/getShareForWatchlist?symbol=${symbol}`, {mode:'cors'})
            .then(response => response.json())
            .then(data => {
              let tempData = {...props.portfolioData};
              let updatedShare = {...share,
                "value": `${Number.parseFloat(data.value).toFixed(2)*share["quantity"]}`
              }
              tempData[props.activePortfolio]["shares"][index] = updatedShare;
              props.setPortfolioData(tempData);
            });
        }
        catch (e) {
          console.log('fetching failed === ', e);
        }
      });
    };
    
    const renderHeader = () => (
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        />
    );
  

  const renderBody = () => (
    
  <Grid className='d-lg-flex pt-2' >
      <React.Fragment>
      <Grid container spacing={2}>
        <Grid item className='col-12 col-lg-3' xs={4}>
          <AllocationGraph
            portfolioData={props.portfolioData}
            activePortfolio={props.portfolioData}
          />
        </Grid>
        <Grid item className='col-12 col-lg-3' xs={8}>
          <PortfolioOverview
          />
        </Grid>
        <Grid item className='col-12 col-lg-3' xs={6}>
          <AllocationGraph
          />
        </Grid>
        <Grid item className='col-12 col-lg-3' xs={6}>
          <AllocationGraph
          />
        </Grid>
      </Grid>
      </React.Fragment>
  </Grid>
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
};

export default DashboardScreen;