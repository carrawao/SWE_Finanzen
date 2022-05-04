import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import PropTypes from 'prop-types';

const DashboardScreen = props => {
  const renderBody = () => (
    <h1>Welcome to Dashboard!</h1>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={1}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
    </React.Fragment>

  );
}

DashboardScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array
};

export default DashboardScreen;