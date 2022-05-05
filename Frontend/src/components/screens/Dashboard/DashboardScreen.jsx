import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import PropTypes from 'prop-types';
const DashboardScreen = props => {  

  const renderBody = () => (
    <h1>Hello this is dashboad</h1>
    );


  return (
    <>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={1}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
    </>

  );
}

DashboardScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array
};

export default DashboardScreen;