import React,{useState, useEffect} from 'react';
import Stockchart from "./Stockchart";
import ChartButtons from "./ChartButtons";
import Masterdata from './Masterdata';
import {Card, Divider, CardContent, CardHeader, Collapse, IconButton, CircularProgress} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import PropTypes from 'prop-types';


const StockchartCard = (props) =>{

  //Displayed after stockchart componet has loaded its data
  //Chartview Variables
  const [stockPrice, setStockPrice] = useState(0);
  const [view, setView] = useState('month');
  const [perf, setPerf] = useState(0);
  const [open, setOpen] = useState(true);    

  const handleClick = () =>{
    setOpen(!open);
  }
  return (
  <Card sx={{maxWidth: 750, border:3, borderColor: 'primary.main', borderRadius: 3}} raised {...props}>
    <CardHeader
      action={<ChartButtons view={view} setView={setView}></ChartButtons>}
      title={props.symbol}
      subheader={new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR'})
      .format(stockPrice) + " | " + (perf * 100).toFixed(2) + "%"}
    />
    <Divider />
    <CardContent>        
      <Stockchart {...props} view={view} setStockPrice={setStockPrice} setPerf={setPerf}/>
    </CardContent>
    <Divider />
    {
      props.assetType === "Stock" &&
        <>
          <IconButton onClick={handleClick}>
          {open ? <ExpandLess/> : <ExpandMore/>}
          </IconButton>
          <Collapse in={open}>      
            <Masterdata {...props}/>
          </Collapse>
        </>
    } 
  </Card>
  )
}
StockchartCard.propTypes = {
  symbol: PropTypes.string,
};
export default StockchartCard;