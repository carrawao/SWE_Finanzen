import React,{useState, useEffect} from 'react';
import Stockchart from "./Stockchart";
import ChartButtons from "./ChartButtons";
import Masterdata from './Masterdata';
import {Card, Divider, CardContent, CardHeader, Collapse, IconButton, CircularProgress} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material';


const StockchartCard = (props) =>{

  //Data loaded flags
  const [isShareLoaded, setShareLoaded] = useState(false);
  const [isMdLoaded, setMdLoaded] = useState(false);
  //Data from API
  const [stockdata, setStockdata] = useState({});
  const [masterdata, setMasterdata] = useState({});
  const [stockPrice, setStockPrice] = useState(0);
  //Chartview Variables
  const [view, setView] = useState('month');
  const [perf, setPerf] = useState(0);
  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    console.log("fetching share and masterdata...");

    fetch(`http://localhost:3001/dailyShare?symbol=${props.symbol}`)
    .then(res => res.json())
    .then(data => {
      setStockdata(data);
      setShareLoaded(true);
      console.log("Sharedata loaded!");
      }
    );

    fetch(`http://localhost:3001/companyOverview?symbol=${props.symbol}`)
    .then(res => res.json())
    .then(data => {
      setMasterdata(data);
      setMdLoaded(true);
      console.log("Masterdata loaded!");
    })

  }, []);

  const handleClick = () =>{
    setOpen(!open);
  }
  return (
  <Card sx={{maxWidth: 750, border:3, borderColor: 'primary.main', borderRadius: 3}} raised {...props}>
    <CardHeader
      action={<ChartButtons view={view} setView={setView}></ChartButtons>}
      title={props.symbol}
      subheader={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'})
      .format(stockPrice) + " | " + (perf * 100).toFixed(2) + "%"}
    />
    <Divider />
    <CardContent>        
      {
        isShareLoaded
        ? 
          <Stockchart stockdata={stockdata} symbol={props.symbol} view={view} setStockPrice={setStockPrice} setPerf={setPerf}></Stockchart>
        :
         <CircularProgress />
      }
    </CardContent>
    <Divider />
    <IconButton onClick={handleClick}>
      {open ? <ExpandLess/> : <ExpandMore/>}
    </IconButton>
    <Collapse in={open}>
      {
        isMdLoaded
        ? 
          <Masterdata masterdata={masterdata}/>
        :
          <CircularProgress />
      }
    </Collapse>
  </Card>
  );
}
export default StockchartCard;