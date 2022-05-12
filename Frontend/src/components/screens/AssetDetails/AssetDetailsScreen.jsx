import React from 'react';
import {useParams} from 'react-router-dom';
import ScreensTemplate from '../../ScreensTemplate';
import AssetCard from './AssetCard';
import PropTypes from 'prop-types';

/**
 * Component related to a specific asset (including corresponding chart)
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AssetDetailsScreen = props => {
  let {asset, assetType} = useParams();
  
  const renderBody = () => <AssetCard
    {...props}
    assetType={assetType}
    symbol={asset}
  />;

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={-1}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
    </React.Fragment>
  );
}

AssetDetailsScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  portfolioData: PropTypes.object,
  activePortfolio: PropTypes.string,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array,
};

export default AssetDetailsScreen;
