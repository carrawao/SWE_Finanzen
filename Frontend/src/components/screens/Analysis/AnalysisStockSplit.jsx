import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid,
        Button,
        List,
        ListItem
    } from '@mui/material';
import Typography from '@mui/material/Typography';

import AnalysisStockSplitDetailitem from './AnalysisStockSplitDetailitem';



const AnalysisDetailItem = () => {

    const props ={
        countries: [
            {
            
                "propertie" : "Germany",
                "percantage" : 30,
            },
            {
                "propertie" : "Turkey",
                "percantage" : 30,
            
            },
            {
                "propertie" : "Russia",
                "percantage" : 30,
            }
        ],
        crypto: [
            {
            
                "propertie" : "BTC",
                "percantage" : 30,
            },
            {
                "propertie" : "ETH",
                "percantage" : 30,
            
            },
            {
                "propertie" : "BLABLA",
                "percantage" : 30,
            }
        ],
        sector: [
            {
            
                "propertie" : "IT",
                "percantage" : 30,
            },
            {
                "propertie" : "Not IT",
                "percantage" : 20,
            
            },
            {
                "propertie" : "Gas",
                "percantage" : 10,
            }
        ]
    }

   

        




    return (
        <Grid container spacing={10}>
            <Grid item xs={6}>
                <List>
                {
                props.countries.map((share, index) => ( 
                    <AnalysisStockSplitDetailitem props={share}
                        key={`activity_${index}`}
                    ></AnalysisStockSplitDetailitem>
                ))
                }</List>
            </Grid>
            <Grid item xs={6}>
                <List>{
                props.crypto.map((share, index) => ( 
                    <AnalysisStockSplitDetailitem props={share}
                        key={`activity_${index}`}
                    ></AnalysisStockSplitDetailitem>
                ))
                }</List>
            </Grid>
            <Grid item xs={6}>
                <List>{
                props.sector.map((share, index) => ( 
                    <AnalysisStockSplitDetailitem props={share}
                        key={`activity_${index}`}
                    ></AnalysisStockSplitDetailitem>
                ))
                }</List>
            </Grid>
        </Grid>  

    );
}

export default AnalysisDetailItem;