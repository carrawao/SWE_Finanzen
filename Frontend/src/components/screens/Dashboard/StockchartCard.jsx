import React,{useState} from 'react';
import Stockchart from "./Stockchart";
import StockchartButtons from "./StockchartButtons";
import Masterdata from './Masterdata';
import {Card, Divider, CardContent, CardHeader, Collapse, IconButton} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material';


const StockchartCard = (props) =>{
  //Fetch stockdata with share id
  const symbol = props.stockdata['Meta Data']['2. Symbol'];
  const [view, setView] = useState('month');
  const [stockPrice, setStockPrice] = useState(0);
  const [perf, setPerf] = useState(0);
  const [open, setOpen] = useState(true);
  const handleClick = () =>{
    setOpen(!open);
  }

  return (
  <Card sx={{maxWidth: 750, border:3, borderColor: 'primary.main', borderRadius: 3}} raised {...props}>
    <CardHeader
      action={<StockchartButtons view={view} setView={setView}></StockchartButtons>}
      title={symbol}
      subheader={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'})
      .format(stockPrice) + " | " + (perf * 100).toFixed(2) + "%"}
    />
    <Divider />
    <CardContent>        
      <Stockchart stockdata={props.stockdata} symbol={symbol} view={view} setStockPrice={setStockPrice} setPerf={setPerf}></Stockchart>        
    </CardContent>
    <Divider />
    <IconButton onClick={handleClick}>
      {open ? <ExpandLess/> : <ExpandMore/>}
    </IconButton>
    <Collapse in={open}>
      <Masterdata masterdata={props.masterdata}/>
    </Collapse>
  </Card>
  );
}
export default StockchartCard;