import React from 'react';
import {useParams} from 'react-router-dom';
import ScreensTemplate from '../../ScreensTemplate';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const AssetDetailsScreen = (props) => {
  let {asset, assetType} = useParams();

  //data that we saved for this asset --> undefined if asset is not in the portfolio
  const savedAssetData = asset === undefined ? undefined : props.portfolioData[props.activePortfolio][assetType === "Crypto" ? "crypto" : "shares"].find(element => element.symbol === asset);
  
  const renderHeader = () => (
    <Typography variant='h6' noWrap component='div' sx={{color: '#493f35'}}>
      Asset Details Screen
    </Typography>
  );

  const renderBody = () => (
    <h1>Details of asset: {asset}</h1>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        selectedNavLinkIndex={-1}
      />
    </React.Fragment>
  );
}

AssetDetailsScreen.propTypes = {
  portfolioData: PropTypes.object,
  activePortfolio: PropTypes.string
};

export default AssetDetailsScreen;
