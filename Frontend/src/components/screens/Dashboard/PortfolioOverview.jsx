import React, {useState} from 'react';
import {
  Grid,
  Box,
  Select,
  MenuItem,
  InputBase,
  FormHelperText,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import {styled} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';


const PortfolioOverview = (props) => {
  const portfolio = props.portfolioData[props.activePortfolio];

  return (
      <Grid 
        container
        direction='column'
        justifyContent="space-evenly"
        alignContent="center"
        height = "100%"
      >
        <Box sx={{ marin: '10px', borderBottom: '1px solid #493f35' }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                marginBottom = "10px"
                alignItems="center"
            >
                <Grid item>
                    <FormControl size="small">
                        <Select
                            id="dashboard-activePortfolio-select"
                            name="dashboard-activePortfolio-select"
                            label="active Portfolio"
                            sx={{ ml: 1, flex: 1 }}
                            displayEmpty
                            variant="filled"
                            inputProps={{ 'aria-label': 'active Portfolio' }}
                            value={props.activePortfolio}
                            onChange={(e) => {props.setActivePortfolio(e.target.value)}}
                        >
                            {Object.keys(props.portfolioData).map((portfolioName) => (
                                <MenuItem key={portfolioName} value={portfolioName}>
                                {portfolioName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
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
                <Typography variant="h5" gutterBottom component="div">Gains</Typography>
                <Typography variant="h5" gutterBottom component="div">{portfolio["gains"]}</Typography>                
            </Grid>
            <Grid item >
                <Typography variant="h5" gutterBottom component="div">Realized Gains</Typography>
                <Typography variant="h5" gutterBottom component="div">{portfolio["realisedGains"]}</Typography>    
            </Grid>
            <Grid item >
                <Typography variant="h5" gutterBottom component="div" >Dividends</Typography> 
                <Typography variant="h5" gutterBottom component="div">0,00€</Typography>
                {/* <Typography>{portfolio["totalDividends"]}</Typography>      */}
            </Grid>
        </Grid>
      </Grid>
  );
}

PortfolioOverview.propTypes = {
    activePortfolio: PropTypes.string,
    setActivePortfolio: PropTypes.func,
    portfolioData: PropTypes.object,
  };

export default PortfolioOverview;