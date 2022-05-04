import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import Stockchart from './Stockchart';
import StockchartCard from './StockchartCard';
import CryptochartCard from './CryptochartCard';
import data from '../../../exdata/daily_ABC.json';
import masterdata from '../../../exdata/overview_ABC.json';
const DashboardScreen = () => {
  const renderHeader = () => (
    <SearchField/>
  );

  const renderBody = () => {
    return <CryptochartCard symbol={"BTC"}></CryptochartCard>
  };

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