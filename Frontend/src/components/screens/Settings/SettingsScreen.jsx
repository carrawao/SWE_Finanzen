import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import Typography from '@mui/material/Typography';

const SettingsScreen = () => {
  const renderHeader = () => (
    <Typography variant='h6' noWrap component='div'>
      Header of Settings Page
    </Typography>
  );

  const renderBody = () => (
    <h1>Welcome to Settings!</h1>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        selectedNavLinkIndex={3}
      />
    </React.Fragment>

  );
}

export default SettingsScreen;