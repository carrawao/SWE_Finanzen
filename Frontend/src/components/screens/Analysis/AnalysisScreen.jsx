import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import AnalysisList from './AnalysisList';
import AnalysisStockSplit from './AnalysisStockSplit'
import AnalysisPie from './AnalysisPie';


const AnalysisScreen = props => {
  const renderBody = () => (
    <Grid container className='d-flex justify-content-center pt-2'>
      <Grid item className='col-12 col-md-5 col-xl-3'>
        <Typography variant='h6' noWrap component='div'>            
            Asset Distribution
            <AnalysisPie/>
        </Typography>
      </Grid>
      <Grid item className='col-12 col-md-7 col-xl-9'>
        <AnalysisList />
      </Grid>
      <Grid item xs={12} className='col-12 col-md-12 col-xl-12'>
        <AnalysisStockSplit />
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={5}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
    </React.Fragment>
  );
}

AnalysisScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array
};

export default AnalysisScreen;