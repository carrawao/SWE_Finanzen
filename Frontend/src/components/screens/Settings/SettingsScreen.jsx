import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const SettingsScreen = () => {
  const renderHeader = () => (
    <Typography variant='h6' noWrap component='div'>
      Header of Settings Page
    </Typography>
  );

  const renderBody = () => (
    <Button>Export Data (noch ohne Funktion)</Button>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        selectedNavLinkIndex={4}
      />
    </React.Fragment>

  );
}

export default SettingsScreen;