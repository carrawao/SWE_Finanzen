import React, { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemText, Grid, Typography, CircularProgress } from '@mui/material';

// Company Overview 
// Column 1
// Symbol, AssteType, Name, Description , CIK, Currency
// Column 2 
// Sektor, Industry , etc

const Masterdata = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [masterdata, setMasterdata] = useState({});
    useEffect(()=>{
        console.log("fetching stockdata...");
        const base = process.env.REACT_APP_BASEURL;
        let url = new URL(`companyOverview?symbol=${encodeURIComponent(props.symbol)}`, base);
        fetch(url.toString())
        .then(res => res.json())
        .then(data => {
          setMasterdata(data);
          setIsLoading(false);
          console.log("Masterdata loaded!");          
        })
    },[]);

    if(isLoading){
        return <CircularProgress/>
    }
    return <Grid container flex spacing={2} alignItems="stretch" justifyContent="space-evenly">
    <Grid item xs={4}>
        <List>
            <ListItem>
                <ListItemText
                    primary={masterdata['Name']}
                    secondary="Name">
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={masterdata['CIK']}
                    secondary="CIK">
                </ListItemText>
            </ListItem>
        </List>
    </Grid>
    <Grid>
        <Divider orientation="vertical" flexItem sx={1} style={{height:'100%'}}/>
    </Grid>
    <Grid item xs={4}>
        <List>
            <ListItem>
                <ListItemText
                    primary={masterdata['Sector']}
                    secondary="Sector"
                ></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={masterdata['Industry']}
                    secondary="Industry"    
                ></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={masterdata['DividendYield']}
                    secondary="Dividend Yield"    
                ></ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={masterdata['Exchange']}
                    secondary="Exchange"    
                ></ListItemText>
            </ListItem>
        </List>
    </Grid>
</Grid>
    
}

export default Masterdata;