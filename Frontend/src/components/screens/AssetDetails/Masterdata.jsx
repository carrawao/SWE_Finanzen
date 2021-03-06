import React, {useEffect, useState} from 'react';
import {Divider, List, ListItem, ListItemText, Grid, CircularProgress} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Shows Overview of Stock
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Masterdata = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [masterdata, setMasterdata] = useState({});

  useEffect(() => {
    console.log(`Fetching masterdata of ${props.symbol}...`);
    const base = process.env.REACT_APP_BASEURL;
    let url = new URL(`companyOverview?symbol=${encodeURIComponent(props.symbol)}`, base);
    fetch(url.toString())
      .then(res => res.json())
      .then(json => {
        setMasterdata(json);
        setIsLoading(false);
        props.setName(json['Name']);
        console.log('Masterdata fetched!');
      })
  }, []);

  if (isLoading) {
    return <CircularProgress/>
  }
  return (
    <Grid container spacing={2} alignItems='stretch' justifyContent='space-evenly' direction='row'>
      <Grid item xs={5}>
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
      <Grid item>
        <Divider orientation='vertical' flexItem xs={1} style={{height: '100%'}}/>
      </Grid>
      <Grid item xs={5}>
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
    </Grid>
  )
}

export default Masterdata;