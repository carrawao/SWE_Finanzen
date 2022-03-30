import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';

const DashboardScreen = () => {
  const renderHeader = () => (
    <SearchField/>
  );

  const renderBody = () => (
    <h1>Welcome to Dashboard!</h1>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={1}
      />
    </React.Fragment>

  );
}

export default DashboardScreen;