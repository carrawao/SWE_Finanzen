import React, {useState} from 'react';
import {
  Grid,
  Container,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from '@mui/material/styles';

const PortfolioOverview = (props) => {

  return (
      <Grid 
        container
        direction='column'
        justifyContent="space-evenly"
        alignContent="center"
        height = "100%"
      >

        <Box sx={{ margin: '10px', borderBottom: '1px solid #493f35' }}>     
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                marginBottom="-10px"
                alignContent="center"
            >
                <Grid item >
                    <p>Portfolio1 +30%</p>
                </Grid>
                <Grid item >
                    <AddIcon></AddIcon>
                    <SettingsIcon></SettingsIcon>
                </Grid>
            </Grid>
        </Box>
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignContent="center"
        >
            <Grid item >
                <p>Test</p>
            </Grid>
            <Grid item >
                <p>Test</p>
            </Grid>
            <Grid item >
                <p>Test</p>
            </Grid>
        </Grid>
      </Grid>

  );
}

export default PortfolioOverview;