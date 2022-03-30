import React from 'react';
import ScreensTemplate from '../ScreensTemplate';
import Typography from '@mui/material/Typography';

const Home = () => {
  const renderHeader = () => (
    <Typography variant='h6' noWrap component='div'>
      Header of Home Page
    </Typography>
  );

  const renderBody = () => (
    <h1>Welcome to Finance App SWE- DHBW!</h1>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        selectedNavLinkIndex={0}
      />
    </React.Fragment>

  );
}

export default Home;