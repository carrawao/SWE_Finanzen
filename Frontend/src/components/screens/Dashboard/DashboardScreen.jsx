import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import {Grid} from '@mui/material';
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
    
  <Grid className='d-lg-flex pt-2' >
      <React.Fragment>
      <Grid container spacing={2}>
        <Grid item className='col-12 col-lg-3' xs={4}>
          <AllocationGraph
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

export default DashboardScreen;