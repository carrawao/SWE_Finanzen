import React from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import Stockchart from './Stockchart';
import StockchartCard from './StockchartCard';
import data from '../../../exdata/daily_ABC.json';
import masterdata from '../../../exdata/overview_ABC.json';
const DashboardScreen = () => {
  const renderHeader = () => (
    <SearchField/>
  );

  const renderBody = () => {
    return <StockchartCard stockdata={data} masterdata={masterdata}></StockchartCard>
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