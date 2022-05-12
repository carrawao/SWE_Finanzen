import React from 'react';
import {Grid, Card, CardHeader, CardContent} from '@mui/material';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioValueChart from './PortfolioValuechart';

export const PortfolioCharts = props => {
  return (
    <Card raised xs={12} sx={{border: 3, borderColor: 'rgb(0,0,100)', borderRadius: 3}}>
      <CardHeader style={{textAlign: 'center'}}/>
      <CardContent>
        <Grid container spacing={5} direction='row' justifyContent='center'>
          <Grid item xs={6}>
            <PortfolioValueChart {...props} view={props.view}/>
          </Grid>
          <Grid item xs={6}>
            <PortfolioPerformance {...props} view={props.view}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PortfolioCharts;