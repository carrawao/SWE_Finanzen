import React, {useEffect, useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';
import {Grid} from '@mui/material';
import WatchLists from './WatchLists';
import AssetsList from './AssetsList';
import PropTypes from 'prop-types';

/**
 * Component related to the watchLists page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchListsScreen = (props) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);

  const renderHeader = () => (
    <SearchField/>
  );

  const renderBody = () => (
    <Grid container spacing={2}>
      <Grid item className='col-sm-5 col-md-4'>
        <WatchLists
          watchListsArray={props.watchListsArray}
          setWatchListsArray={props.setWatchListsArray}
          selectedListIndex={selectedListIndex}
          setSelectedListIndex={setSelectedListIndex}
        />
      </Grid>
      <Grid item className='col-sm-12 col-md-8'>
        <AssetsList
          watchListsArray={props.watchListsArray}
          selectedListIndex={selectedListIndex}
        />
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={2}
      />
    </React.Fragment>

  );
}

ScreensTemplate.propTypes = {
  usePersistedState: PropTypes.func,
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
};

export default WatchListsScreen;