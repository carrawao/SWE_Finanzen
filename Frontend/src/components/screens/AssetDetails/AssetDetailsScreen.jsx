import React from 'react';
import {useParams} from 'react-router-dom';
import ScreensTemplate from '../../ScreensTemplate';
import Typography from "@mui/material/Typography";

const AssetDetailsScreen = () => {
  let {asset} = useParams();

  const renderHeader = () => (
    <Typography variant='h6' noWrap component='div'>
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
        selectedNavLinkIndex={2}
      />
    </React.Fragment>
  );
}

export default AssetDetailsScreen;