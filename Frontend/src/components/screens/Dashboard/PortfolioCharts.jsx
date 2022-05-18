import React from 'react';
import {Grid, Box} from '@mui/material';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioValueChart from './PortfolioValuechart';

export const PortfolioCharts = props => {
  return (
    <Grid
      container
      className='col-12 d-flex flex-column flex-xl-row justify-content-center align-items-center'
    >
      <Box className='col-12 col-xl-6' sx={{padding: '1rem'}}>
        <PortfolioValueChart {...props} view={props.view}/>
      </Box>
      <Box className='col-12 col-xl-6' sx={{padding: '1rem'}}>
        <PortfolioPerformance {...props} view={props.view}/>
      </Box> 
    </Grid>
  )
}

export default PortfolioCharts;