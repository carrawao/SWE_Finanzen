import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import Stockchart from './Stockchart';
import StockchartCard from './StockchartCard';
import CryptochartCard from './CryptochartCard';
import data from '../../../exdata/daily_ABC.json';
import masterdata from '../../../exdata/overview_ABC.json';
import PropTypes from 'prop-types';
const DashboardScreen = props => {  

  const renderBody = () => {
    return <CryptochartCard symbol={"BTC"}></CryptochartCard>
  };


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