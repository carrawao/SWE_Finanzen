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

import { SortActivitiesService } from '../../../services';

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

  const dummyCash = () => {
    const cash = [{
      firstActivity: '2900-01-01',     
      id: 0,
      symbol: 'ING',
      name: 'ING Konto',
      assetTypeForDisplay: 'Cash',
      value: 0,
      quantity: 1,
      gains: 0,
      realisedGains: 0,
      totalGains: 0,
      performanceWithRealisedGains: 0,
      performanceWithOutRealisedGains: 0,
      taxes: 0,
      fees: 0,
      dailyDataForPerformanceGraph: [],
      dailyDataForValueDevelopment: [],
      stateChanges: [],
      deposits: [],
      analysisInfo: undefined
    }]

    props.setPortfolioData(prevData => {
      const portfolioData = {...prevData};
      portfolioData[props.activePortfolio]['cash'] = cash;
      return portfolioData;
    });
  }

  const deleteActivity = async () => {
    if (portfolioData['activities'].length <= 1) {
      alert(`You need at least one activity in your portfolio!`);
      return;
    }
    const dependedOn = checkIfDependedOn(selectedActivityId);
    if (dependedOn) {
      alert(`Activity can't be deleted because others depend on it!`);
      return;
    }
    
    const activityObj = portfolioData['activities'].find(element => element.id === selectedActivityId);
    //find assetData related to activity
    const assetData = portfolioData[activityObj.assetType === 'share' ? 'shares' : activityObj.assetType].find(element => element.symbol === activityObj.asset);

    //delete activity from activitesArray
    let newActivities = portfolioData['activities'].filter(
      element => element.id !== selectedActivityId
    );
    //get activities related to assetData
    let assetRelatedActivities = newActivities.filter(
      (element) => element.asset === assetData.symbol
    );
    assetRelatedActivities = SortActivitiesService.sortActivities(assetRelatedActivities);
    //get activities without activities related to assetData
    let activitiesWithoutAssetActivities = newActivities.filter(
      (element) => element.asset !== assetData.symbol
    );
    activitiesWithoutAssetActivities = SortActivitiesService.sortActivities(activitiesWithoutAssetActivities);
    //clear assetData
    let clearedAssetData = clearAssetData(assetData);

    props.setPortfolioData(prevData => {
      let tempPortfolioData = {...prevData};
      tempPortfolioData[props.activePortfolio]['activities'] = activitiesWithoutAssetActivities;
      tempPortfolioData[props.activePortfolio][activityObj.assetType === 'share' ? 'shares' : activityObj.assetType][assetData.id] = clearedAssetData;
      return tempPortfolioData;
    });

    //build up assetData again from the remaining activities
    buildUpAssetDataFromActivities(assetRelatedActivities);

    setDeleteActivityModal(false);
    setSelectedActivityId(null);
  };

  const checkIfDependedOn = (activityId) => {
    for (let index = 0; index < portfolioData['activities'].length; index++) {
      const activity = portfolioData['activities'][index];
      for (let i = 0; i < activity.dependsOn.length; i++) {
        const dependedId = activity.dependsOn[i];
        if (activityId === dependedId) {
          return true;
        }
      }
    }
    return false;
  }

  const clearAssetData = (assetData) => {
    const clearedAssetData = {
      ...assetData,
      firstActivity: '2900-01-01', 
      value: 0,
      quantity: 0,
      invested: 0,
      gains: 0,
      realisedGains: 0,
      totalGains: 0,
      performanceWithRealisedGains: 0,
      performanceWithoutRealisedGains: 0,
      taxes: 0,
      fees: 0,
      dailyDataForValueDevelopment: [],
      dailyDataForPerformanceGraph: [],
      stateChanges: [],
      buys: []
    }
    return clearedAssetData;
  }

  const buildUpAssetDataFromActivities = async (activitiesArray) => {
    for (let index = 0; index < activitiesArray.length; index++) {
      const activity = activitiesArray[index];
      const assetObj = {assetType: activity.assetTypeForDisplay, symbol: activity.asset, name: activity.assetName};
      await props.addActivity(activity.assetType, assetObj, activity.type, new Date(activity.date), `${activity.quantity}`, `${activity.sum}`, `${activity.value}`, `${activity.taxes}`, `${activity.fees}`);
    }
  }

  const renderBody = () => (
    <Grid className='d-flex justify-content-center pt-2'>
      <Container className='p-0'>
        <Button onClick={() => dummyCash()}>Add a dummy cash account</Button>
        <Button
          className='my-3'
          variant='outlined'
          onClick={() => routeChange('addActivity')}
          sx={{
            color: 'white',
            borderColor: '#4eb96f',
            backgroundColor: '#4eb96f',
            '&:hover': {
              borderColor: '#068930',
              backgroundColor: '#4eb96f',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgb(228 231 235)',
            }
          }}
        >
          Add Activity
        </Button>
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
  assetsListArray: PropTypes.array,
  addActivity: PropTypes.func
};

export default ActivitiesScreen;

