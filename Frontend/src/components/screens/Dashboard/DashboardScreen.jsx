import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import Stockchart from './Stockchart';
import StockchartCard from './StockchartCard';
import data from '../../../exdata/daily_ABC.json';

const DashboardScreen = () => {
  const renderHeader = () => (
    <SearchField/>
  );

  const renderBody = () => {
    return <StockchartCard stockdata={data}></StockchartCard>
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