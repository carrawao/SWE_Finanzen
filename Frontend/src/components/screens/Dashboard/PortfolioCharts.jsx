import React from 'react';
import {Card, Container, CardContent, Box} from '@mui/material';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioValueChart from './PortfolioValuechart';

export const PortfolioCharts = props => {
  return (
        <Container className='d-flex flex-column flex-xl-row justify-content-center align-items-center'>
          <Box className='col-12 col-xl-6 mb-4 mb-xl-0'>
            <PortfolioValueChart {...props} view={props.view}/>
          </Box>
          <Box className='col-12 col-xl-6 ms-xl-4'>
            <PortfolioPerformance {...props} view={props.view}/>
          </Box>
        </Container>
  )
}

export default PortfolioCharts;