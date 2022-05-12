import React from 'react';
import {
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import PropTypes from 'prop-types';

/**
 * Component related to the portfolio overview
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PortfolioOverview = props => {
  const portfolio = props.portfolioData[props.activePortfolio];

  return (
    <Grid
      container
      className='d-flex flex-column justify-content-evenly p-0 p-lg-4'
    >
      <Box className='m-3' sx={{borderBottom: '1px solid #493f35'}}>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          marginBottom='10px'
          alignItems='center'
        >
          <Grid item>
            <FormControl size='small'>
              <Select
                id='dashboard-activePortfolio-select'
                name='dashboard-activePortfolio-select'
                label='active Portfolio'
                sx={{ml: 1, flex: 1}}
                displayEmpty
                variant='filled'
                inputProps={{'aria-label': 'active Portfolio'}}
                value={props.activePortfolio}
                onChange={(e) => {
                  props.setActivePortfolio(e.target.value)
                }}
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
            <AddIcon/>
            <SettingsIcon/>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        className='d-flex flex-row justify-content-around align-items-center ps-0'
      >
        <Grid item className='d-flex flex-column col-3 align-items-center'>
          <Typography variant='h6' gutterBottom display='block'>Gains</Typography>
          <Typography variant='h6' gutterBottom >{
            new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR',}).format(portfolio['gains'])
          }</Typography>
        </Grid>
        <Grid item className='d-flex flex-column col-5 align-items-center'>
          <Typography variant='h6' gutterBottom display='block'>Realised Gains</Typography>
          <Typography variant='h6' gutterBottom>{portfolio['realisedGains']}</Typography>
        </Grid>
        <Grid item className='d-flex flex-column col-3 align-items-center'>
          <Typography variant='h6' gutterBottom>Dividends</Typography>
          <Typography variant='h6' gutterBottom>0,00€</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

PortfolioOverview.propTypes = {
  activePortfolio: PropTypes.any,
  setActivePortfolio: PropTypes.func,
  portfolioData: PropTypes.object,
};

export default PortfolioOverview;