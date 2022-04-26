import React from 'react';
import { Divider, List, ListItem, ListItemText, Grid, Typography } from '@mui/material';

// Company Overview 
// Column 1
// Symbol, AssteType, Name, Description , CIK, Currency
// Column 2 
// Sektor, Industry , etc

const Masterdata = (props) => {


    return (
    <Grid container flex spacing={2} alignItems="stretch" justifyContent="space-evenly">
        <Grid item xs={4}>
            <List>
                <ListItem>
                    <ListItemText
                        primary={props.masterdata['Name']}
                        secondary="Name">
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={props.masterdata['CIK']}
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
                        primary={props.masterdata['Sector']}
                        secondary="Sector"
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={props.masterdata['Industry']}
                        secondary="Industry"    
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={props.masterdata['DividendYield']}
                        secondary="Dividend Yield"    
                    ></ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={props.masterdata['Exchange']}
                        secondary="Exchange"    
                    ></ListItemText>
                </ListItem>
            </List>
        </Grid>
    </Grid>
    );

}

export default Masterdata;