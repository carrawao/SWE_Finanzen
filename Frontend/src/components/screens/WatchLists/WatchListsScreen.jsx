import React, {useState} from 'react';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';

import WatchLists from './WatchLists';
import AssetsList from './AssetsList';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import SearchResultsTable from '../../common/SearchResultsTable';
import {RenderAddToWatchlistModal} from './Modals/watchlistModals';

/**
 * Component related to the watchLists page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchListsScreen = props => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultIndex, setSearchResultIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addToWatchlistModal, setAddToWatchlistModal] = useState(false);
  const [isAssetInWatchList, setIsAssetInWatchList] = useState(false);

  const renderHeader = () => (
      <SearchField
        searchQuery={searchQuery}
        onQueryChange={setSearchResult}
      />
  );

  const renderBody = () => (
    searchResult.length > 0 ? <Grid className='justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
        <SearchResultsTable
          searchResult={searchResult}
          watchListsArray={props.watchListsArray}
          selectedListIndex={props.selectedListIndex}
          assetsListArray={props.assetsListArray}
          addToWatchList={index => {
            setAddToWatchlistModal(true);
            setSearchResultIndex(index);
          }}
          onClose={() => {
            setSearchResult([]);
            setSearchQuery('');
          }}
        />
      </Grid>
    :  <Grid className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
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

  // Selects the index of the current watchlist
  const handleChange = event => {
    if (props.watchListsArray.includes(event.target.value)) {
      const index = props.watchListsArray.map(item => item).indexOf(event.target.value);
      setSelectedListIndex(index);
    }
  };

  // Function to close the modals
  const handleClose = () => {
    setIsAssetInWatchList(false)
    setAddToWatchlistModal(false);
  }

  // Asset will be added to the selected Watchlist
  const addAssetToWatchlist = async () => {
    const symbol = searchResult[searchResultIndex].symbol;
    const assetType = searchResult[searchResultIndex].assetType;

    try {
      return await fetch(
      `http://localhost:3001/${assetType === 'Crypto' ? 'getCryptoForWatchlist' : 'getShareForWatchlist'}?symbol=${symbol}`,
      {mode:'cors'})
      .then(response => response.json())
      .then(data => {
        props.setAssetsListArray(prevAssetsListArray => {
          const assetsListArray = [...prevAssetsListArray];
          assetsListArray[selectedListIndex] = [
            ...assetsListArray[selectedListIndex],
            {
              name: data.name ? data.name : symbol,
              symbol: symbol,
              price: `${Number.parseFloat(data.value).toFixed(2)}`,
              change: `${Number.parseFloat(data.percentChange).toFixed(2)}`
            }
          ];
          return assetsListArray;
        })
        setSearchResult([]);
        });
    }
    catch (e) {
      console.log('fetching failed === ', e);
    }
  };

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={2}
      />
      <RenderAddToWatchlistModal
        open={addToWatchlistModal}
        handleClose={() => handleClose()}
        watchListsArray={props.watchListsArray}
        assetsListArray={props.assetsListArray}
        resultAsset={searchResult[searchResultIndex]}
        selectedListIndex={selectedListIndex}
        onChange={event => handleChange(event)}
        onClick={() => addAssetToWatchlist()}
      />
    </React.Fragment>
  );
}

ScreensTemplate.propTypes = {
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  assetsListArray: PropTypes.array,
  setAssetsListArray: PropTypes.func,
};

export default WatchListsScreen;