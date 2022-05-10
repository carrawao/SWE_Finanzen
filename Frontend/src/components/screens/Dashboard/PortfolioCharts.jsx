import React, {useState} from 'react';
import { Grid, Card, CardHeader, CardContent} from '@mui/material';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioValuechart from './PortfolioValuechart';
import ChartButtons from '../AssetDetails/ChartButtons';

export const PortfolioCharts = (props) => {    
    const [view, setView] = useState('month');
    return (
    <Card raised sx={{border: 3,borderColor: 'rgb(0,0,100)', borderRadius: 3}}>
        <CardHeader style={{textAlign: 'center'}} title={<ChartButtons view={view} setView={setView}/>}/>
        <CardContent>
            <Grid container spacing={5} direction='row' justifyContent='center'>
                <Grid item xs={4}>            
                    <PortfolioValuechart {...props} view={view}/>            
                </Grid>
                <Grid item xs={4}>            
                    <PortfolioPerformance {...props} view={view}/>            
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    )
}

export default PortfolioCharts;