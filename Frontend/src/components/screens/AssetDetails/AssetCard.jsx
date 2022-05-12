import React, {useEffect, useState} from 'react';
import AssetChart from './AssetChart';
import ChartButtons from './ChartButtons';
import Masterdata from './Masterdata';
import {Container, Card, Grid} from '@mui/material';
import PropTypes from 'prop-types';
import SwitchButtons from './SwitchButtons';
import AssetPerformance from './AssetPerfofmance';
import AssetValue from './AssetValue';

/**
 * Chart view with assets current price,
 * performance of selected range,
 * and if it's a stock master data
 */
const AssetCard = props => {
  //Displayed after AssetChart component has loaded its data
  //Chartview Variables  
  const [view, setView] = useState('month');
  const [name, setName] = useState(props.symbol);

  const [containsAssetData, setContainsAssetData] = useState(false);
  const [chartType, setChartType] = useState('price');

  //is 'Crypto', 'Stock' or 'ETF' we change it to access Object key 'crypto' or 'shares'
  const assetType = props.assetType === 'Crypto' ? 'crypto' : 'shares';
  // Get performance and value data of this asset
  const assetData = props.portfolioData[props.activePortfolio][assetType]
    .find(element => element.symbol === props.symbol);

  // Show no buttons and graphs
  useEffect(
    () => {
      if (typeof assetData !== 'undefined') {
        setContainsAssetData(true);
      }
    }, []
  )

  const renderContent = () => {
    switch (chartType) {
      case 'perf':
        return <AssetPerformance view={view} name={name} assetData={assetData}/>
      case 'value':
        return <AssetValue view={view} name={name} assetData={assetData}/>
      case 'price':
      default:
        return <AssetChart assetType={assetType} name={name} setName={setName} view={view} symbol={props.symbol}/>
    }
  }

  return (
    <Container className='d-flex flex-column px-1 pt-2 sm'>
      <Card>
        <Grid container direction='column'>
          <Grid xs={2} item container direction='row' justifyContent='space-between'>
            <>
              <SwitchButtons containsAssetData={containsAssetData} setChartType={setChartType} chartType={chartType}/>
              <ChartButtons view={view} setView={setView}/>
            </>
          </Grid>
          <Grid item xs={6} className='mt-2 mb-2'>
            {renderContent()}
          </Grid>
          <Grid item xs={4}>
            {
              props.assetType === 'Stock' &&
              <Masterdata assetType={props.assetType} symbol={props.symbol} setName={setName}/>
            }
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

AssetCard.propTypes = {
  symbol: PropTypes.string,
  assetType: PropTypes.string
};

export default AssetCard;