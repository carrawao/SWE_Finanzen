import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Container,
  Button,
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';

import ActivitiesList from './ActivitiesList';
import ScreensTemplate from '../../ScreensTemplate';
import {renderRemoveActivityModal} from './Modals/activityModals';

/**
 * Component related to the activities page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ActivitiesScreen = props => {
  const [deleteActivityModal, setDeleteActivityModal] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const portfolioData = props.portfolioData[props.activePortfolio];

  let navigate = useNavigate();
  const routeChange = path => {
    navigate(path);
  }

  const clearActivities = () => {
    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]['activities'] = [];
      portfolioData[props.activePortfolio]['shares'] = [];
      portfolioData[props.activePortfolio]['crypto'] = [];
      portfolioData[props.activePortfolio]['cash'] = [];
      return portfolioData;
    });
  }

  const dummyCash = () => {
    const cash = [{
      id: 0,
      symbol: 'ING',
      name: 'ING Konto',
      assetTypeForDisplay: 'Cash',
      value: 0,
      quantity: 1,
      invested: 0,
      unrealisedGains: 0,
      realisedGains: 0,
      totalGains: 0,
      performanceWithRealisedGains: 0,
      performanceWithOutRealisedGains: 0,
      taxes: 0,
      fees: 0,
      dailyValues: [],
      dailyDataForPerformanceGraph: [],
      dailyDataForValueDevelopment: [],
      analysisInfo: undefined
    }]

    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]['cash'] = cash;
      return portfolioData;
    });
  }

  const deleteActivity = () => {
    if (portfolioData['activities'].length > 0) {
      props.setPortfolioData(prevData => {
        const portfolioData = {...prevData};
        portfolioData[props.activePortfolio]['activities'] =
          portfolioData[props.activePortfolio]['activities'].filter(
            (element) => element.id !== selectedActivityId
          );
        return portfolioData;
      });
      setDeleteActivityModal(false);
      setSelectedActivityId(null);
    }
  };

  const renderBody = () => (
    <Grid className='d-flex justify-content-center pt-2'>
      <Container className='p-0'>
        <Button onClick={() => dummyCash()}>Add a dummy cash account</Button>
        <Button onClick={() => routeChange('addActivity')}>Add Activity</Button>
        <Button onClick={() => clearActivities()}>Clear Activities</Button>
        <ActivitiesList
          activePortfolio={props.activePortfolio}
          portfolioData={props.portfolioData}
          setPortfolioData={props.setPortfolioData}
          setSelectedActivityId={setSelectedActivityId}
          setDeleteActivityModal={setDeleteActivityModal}
        />
      </Container>
    </Grid>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={3}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
      {renderRemoveActivityModal(deleteActivityModal, deleteActivity, setDeleteActivityModal)}
    </React.Fragment>
  );
}

ActivitiesScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
  setPortfolioData: PropTypes.func,
  assetsListArray: PropTypes.array
};

export default ActivitiesScreen;

