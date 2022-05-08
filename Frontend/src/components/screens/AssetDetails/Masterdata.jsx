import React, { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemText, Grid, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Company Overview 
// Column 1
// Symbol, AssteType, Name, Description , CIK, Currency
// Column 2 
// Sektor, Industry , etc

const Masterdata = props => {
    const [isMdLoaded, setMdLoaded] = useState(false);
    const [masterdata, setMasterdata] = useState({});
    useEffect(()=>{
        console.log('fetching stockdata...');
        fetch(`${process.env.REACT_APP_BASEURL}/companyOverview?symbol=${props.symbol}`)
        .then(res => res.json())
        .then(data => {
          setMasterdata(data);
          setMdLoaded(true);
          console.log('Masterdata loaded!');
        })
    },[]);

    let body = <Grid container flex spacing={2} alignItems='stretch' justifyContent='space-evenly'>
        <Grid item xs={4}>
            <List>
                <ListItem>
                    <ListItemText
                        primary={masterdata['Name']}
                        secondary='Name'>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={masterdata['CIK']}
                        secondary='CIK'>
                    </ListItemText>
                </ListItem>
            </List>
        </Grid>
        <Grid>
            <Divider orientation='vertical' flexItem style={{height:'100%'}}/>
        </Grid>
        <Grid item xs={4}>
            <List>
                <ListItem>
                    <ListItemText
                        primary={masterdata['Sector']}
                        secondary='Sector'
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={masterdata['Industry']}
                        secondary='Industry'
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={masterdata['DividendYield']}
                        secondary='Dividend Yield'
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={masterdata['Exchange']}
                        secondary='Exchange'
                    />
                </ListItem>
            </List>
        </Grid>
    </Grid>;

    if(isMdLoaded){
        return body;
    }
    return <CircularProgress/>
}

Masterdata.propTypes = {
    symbol: PropTypes.string
};

export default Masterdata;