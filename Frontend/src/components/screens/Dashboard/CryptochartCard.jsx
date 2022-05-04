import React,{useState, useEffect} from 'react';
import Cryptochart from "./Cryptochart";
import ChartButtons from "./ChartButtons";
import {Card, Divider, CardContent, CardHeader, CircularProgress} from '@mui/material'


const CryptochartCard = (props) =>{

  //Data loaded flags
  const [isCryptoLoaded, setCryptoLoaded] = useState(false);
  //Data from API
  const [cryptodata, setCryptodata] = useState({});
  const [cryptoPrice, setCryptoPrice] = useState(0);
  //Chartview Variables
  const [view, setView] = useState('month');
  const [perf, setPerf] = useState(0);
  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    console.log("fetching cryptodata...");

    fetch(`http://localhost:3001/dailyCrypto?symbol=${props.symbol}`)
    .then(res => res.json())
    .then(data => {
      setCryptodata(data);
      setCryptoLoaded(true);
      console.log("Cryptodata loaded!");
      }
    );
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
      .format(cryptoPrice) + " | " + (perf * 100).toFixed(2) + "%"}
    />
    <Divider />
    <CardContent>        
      {
        isCryptoLoaded
        ? 
          <Cryptochart cryptodata={cryptodata} symbol={props.symbol} view={view} setCryptoPrice={setCryptoPrice} setPerf={setPerf}></Cryptochart>
        :
         <CircularProgress />
      }
    </CardContent>
  </Card>
  );
}
export default CryptochartCard;