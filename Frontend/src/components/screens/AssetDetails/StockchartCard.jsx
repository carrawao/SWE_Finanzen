import React, { useState } from 'react';
import Stockchart from "./Stockchart";
import ChartButtons from "./ChartButtons";
import Masterdata from './Masterdata';
import { Card, Divider, CardContent, CardHeader, Collapse, IconButton, Grid } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PropTypes from 'prop-types';

/**
 * Chartview with assets current price,
 * performance of selected range,
 * and if it's a stock masterdata 
 */
const StockchartCard = (props) => {

  //Displayed after stockchart componet has loaded its data
  //Chartview Variables
  const [stockPrice, setStockPrice] = useState(0);
  const [view, setView] = useState('month');
  const [perf, setPerf] = useState(0);
  const [open, setOpen] = useState(true);

  //Expandbutton handler
  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <Grid container className='d-flex justify-content-center pt-2'>
      <Grid item xs={10}>
        <Card raised sx={{ border: 3, borderColor: 'rgb(228 126 37)', borderRadius: 3 }}>
          <CardHeader
            title={props.assetType + " | " + props.symbol}
            subheader={new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
              .format(stockPrice) + ` | ${(perf * 100).toFixed(2)}%`}
            action={<ChartButtons view={view} setView={setView}></ChartButtons>}
          />
          <Divider />
          <CardContent>
            <Stockchart {...props} view={view} setStockPrice={setStockPrice} setPerf={setPerf} />
          </CardContent>
          <Divider />
          {
            // Show masterdata card
            props.assetType === "Stock" &&
            <>
              <IconButton onClick={handleClick}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Collapse in={open}>
                <Masterdata {...props} />
              </Collapse>
            </>
          }
        </Card>
      </Grid>
    </Grid>
  )
}

StockchartCard.propTypes = {  
  /**
   * Symbol, Abbrevation of Asset
   */
  symbol: PropTypes.string,
  /**
   * The type of the asset
   */ 
  assetType: PropTypes.string
};

export default StockchartCard;