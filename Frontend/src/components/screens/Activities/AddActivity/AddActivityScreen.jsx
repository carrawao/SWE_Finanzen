import React from 'react';
import {useParams} from 'react-router-dom';
import {Container, Grid} from '@mui/material';
import PropTypes from 'prop-types';

import ScreensTemplate from '../../../ScreensTemplate';
import AddActivityForm from './AddActivityForm';

/**
 * Component related to the add activities page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AddActivityScreen = props => {
  
  const params = useParams();

  let initialAssetObj = {
    name: params.assetName,
    symbol: params.asset,
    assetType: params.assetType
  };

  if (!props.useParams) {
    initialAssetObj = null;
  }
  
  const portfolioData = props.portfolioData[props.activePortfolio];

  const renderBody = () => (
    <Grid className='d-flex justify-content-center pt-2'>
      <Container className='p-0'>
        <AddActivityForm
          addActivity={props.addActivity}
          portfolioData={portfolioData}
          initialAssetObj={initialAssetObj}
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
    </React.Fragment>
  );
}

AddActivityScreen.propTypes = {
  useParams: PropTypes.bool,
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
  getAllAssets: PropTypes.func,
  assetsListArray: PropTypes.array,
  addActivity: PropTypes.func
};

export default AddActivityScreen;
