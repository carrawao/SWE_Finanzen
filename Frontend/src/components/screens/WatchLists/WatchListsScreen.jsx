import React, {useState} from 'react';
import {Grid} from '@mui/material';
import PropTypes from 'prop-types';

import WatchLists from './WatchLists';
import AssetsList from './AssetsList';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import SearchResultsTable from '../../common/SearchResultsTable';
import {renderAddToWatchlistModal} from './Modals/watchlistModals';

/**
 * Component related to the watchLists page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchListsScreen = (props) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultIndex, setSearchResultIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addToWatchlistModal, setAddToWatchlistModal] = useState(false);

  const renderHeader = () => (
      <SearchField
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
  );

  const renderBody = () => (
    <Grid className='d-lg-flex flex-lg-row justify-content-lg-around px-lg-2 px-xl-5 justify-content-center pt-2'>
      {searchResult.length > 0 ?
        <SearchResultsTable
          searchResult={searchResult}
          selectedListIndex={props.selectedListIndex}
          addToWatchList={index => {
            setAddToWatchlistModal(true);
            setSearchResultIndex(index);
          }}
          onClose={() => {
            setSearchResult([]);
            setSearchQuery('');
          }}
        /> :
      <React.Fragment>
        <Grid item className='col-12 col-lg-3 col-xl-3'>
          <WatchLists
            watchListsArray={props.watchListsArray}
            setWatchListsArray={props.setWatchListsArray}
            assetsListArray={props.assetsListArray}
            setAssetsListArray={props.setAssetsListArray}
            selectedListIndex={selectedListIndex}
            setSelectedListIndex={setSelectedListIndex}
          />
        </Grid>
        <Grid item className='col-12 col-lg-9 col-xl-8 pt-0'>
          <AssetsList
            watchListsArray={props.watchListsArray}
            setWatchListsArray={props.setWatchListsArray}
            assetsListArray={props.assetsListArray}
            setAssetsListArray={props.setAssetsListArray}
            selectedListIndex={selectedListIndex}
            setSelectedListIndex={setSelectedListIndex}
          />
        </Grid>
      </React.Fragment>
      }
    </Grid>
  );

  // Selects the index of the current watchlist
  const handleChange = (event) => {
    if (props.watchListsArray.includes(event.target.value)) {
      const index = props.watchListsArray.map(item => item).indexOf(event.target.value);
      setSelectedListIndex(index);
    }
  };

  const addAssetToWatchlist = async () => {
    const symbol = searchResult[searchResultIndex].symbol;
    try {
      return await fetch(`http://localhost:3001/getShareForWatchlist?symbol=${symbol}`, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
          props.setAssetsListArray(prevAssetsListArray => {
            const assetsListArray = [...prevAssetsListArray];
            assetsListArray[selectedListIndex] = [
              ...assetsListArray[selectedListIndex],
              {
                name: data.name ? data.name : symbol,
                price: `${Number.parseFloat(data.value).toFixed(2)}`,
                change: `${Number.parseFloat(data.percentChange).toFixed(2)}`
              }
            ];
            return assetsListArray;
          })
          setSearchResult([]);
          setAddToWatchlistModal(false);
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
      {renderAddToWatchlistModal(addToWatchlistModal, setAddToWatchlistModal, props.watchListsArray, selectedListIndex, handleChange, addAssetToWatchlist)}
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