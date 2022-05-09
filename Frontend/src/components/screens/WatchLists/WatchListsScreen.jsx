import React, {useState} from 'react';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';

import WatchLists from './WatchLists';
import AssetsList from './AssetsList';
import ScreensTemplate from '../../ScreensTemplate';
import {RenderAddToWatchlistModal} from './Modals/watchlistModals';

/**
 * Component related to the watchLists page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchListsScreen = props => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [searchResultIndex, setSearchResultIndex] = useState(null);
  const [addToWatchlistModal, setAddToWatchlistModal] = useState(false);

  const renderBody = () => (
    <Grid className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
      <Grid item className='col-12 col-md-4 col-xl-3'>
        <WatchLists
          watchListsArray={props.watchListsArray}
          setWatchListsArray={props.setWatchListsArray}
          assetsListArray={props.assetsListArray}
          setAssetsListArray={props.setAssetsListArray}
          selectedListIndex={selectedListIndex}
          setSelectedListIndex={setSelectedListIndex}
        />
      </Grid>
      <Grid item className='col-12 col-md-8 col-xl-9 pt-0'>
        <AssetsList
          watchListsArray={props.watchListsArray}
          setWatchListsArray={props.setWatchListsArray}
          assetsListArray={props.assetsListArray}
          setAssetsListArray={props.setAssetsListArray}
          selectedListIndex={selectedListIndex}
          setSelectedListIndex={setSelectedListIndex}
        />
      </Grid>
    </Grid>
  );

  /**
   * Selects the index of the current watchlist
   * @param event
   */
  const handleChange = event => {
    if (props.watchListsArray.includes(event.target.value)) {
      const index = props.watchListsArray.map(item => item).indexOf(event.target.value);
      setSelectedListIndex(index);
    }
  };

  // Function to close the modals
  const handleClose = () => {
    setAddToWatchlistModal(false);
  }

  /**
   * Asset will be added to the selected Watchlist
   * @returns {Promise<any>}
   */
  const addAssetToWatchlist = async () => {
    const symbol = props.searchResult[searchResultIndex].symbol;
    const assetType = props.searchResult[searchResultIndex].assetType;

    try {
      return await fetch(
        `${process.env.REACT_APP_BASEURL}/${assetType === 'Crypto' ? 'getCryptoForWatchlist' : 'getShareForWatchlist'}?symbol=${symbol}`,
        {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
          props.setAssetsListArray(prevAssetsListArray => {
            const assetsListArray = [...prevAssetsListArray];
            assetsListArray[selectedListIndex] = [
              ...assetsListArray[selectedListIndex],
              {
                name: data.name ? data.name : symbol,
                symbol: symbol,
                assetType: assetType,
                price: `${Number.parseFloat(data.value).toFixed(2)}`,
                change: `${Number.parseFloat(data.percentChange).toFixed(2)}`
              }
            ];
            return assetsListArray;
          })
          props.setSearchResult([]);
        });
    } catch (error) {
      console.log('fetching failed === ', error);
    }
  };

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={2}
        addToWatchList={index => {
          setAddToWatchlistModal(true);
          setSearchResultIndex(index);
        }}
        watchListsArray={props.watchListsArray}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
      <RenderAddToWatchlistModal
        open={addToWatchlistModal}
        handleClose={() => handleClose()}
        watchListsArray={props.watchListsArray}
        assetsListArray={props.assetsListArray}
        resultAsset={props.searchResult[searchResultIndex]}
        selectedListIndex={selectedListIndex}
        onChange={event => handleChange(event)}
        onClick={() => addAssetToWatchlist()}
      />
    </React.Fragment>
  );
}

WatchListsScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  assetsListArray: PropTypes.array,
  setAssetsListArray: PropTypes.func
};

export default WatchListsScreen;