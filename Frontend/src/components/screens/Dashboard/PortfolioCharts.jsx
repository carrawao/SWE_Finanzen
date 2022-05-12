import React from 'react';
import {Card, Container, CardContent, Box} from '@mui/material';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioValueChart from './PortfolioValuechart';

export const PortfolioCharts = props => {
  return (
    <Card raised className='col-12' sx={{border: 3, borderColor: 'rgb(0, 0, 100)', borderRadius: 3}}>
      <CardContent className='d-flex col-12 py-4'>
        <Container className='d-flex flex-column flex-xl-row justify-content-center align-items-center'>
          <Box className='col-12 col-xl-6 mb-4 mb-xl-0 me-xl-4'>
            <PortfolioValueChart {...props} view={props.view}/>
          </Box>
          <Box className='col-12 col-xl-6 ms-xl-4'>
            <PortfolioPerformance {...props} view={props.view}/>
          </Box>
        </Container>
      </CardContent>
    </Card>
  )
}

export default PortfolioCharts;