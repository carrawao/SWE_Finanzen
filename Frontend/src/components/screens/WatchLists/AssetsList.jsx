import React, {useState} from 'react';
import {
  Container,
  Typography,
  Stack
} from '@mui/material';
import PropTypes from 'prop-types';
import AssetListItem from './AssetListItem';
import {renderRemoveAssetModal, renderAddAssetModal} from './Modals/assetModals';

/**
 * Show all the assets corresponding a watchlist
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AssetsList = props => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [removeAssetModal, setRemoveAssetModal] = useState(false);
  const [asset, setAsset] = useState('');
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
  const [errorModal, setErrorModal] = useState(false);

  // Function to close the modals
  const handleClose = () => {
    setErrorModal(false);
    setShowAssetModal(false);
    setRemoveAssetModal(false);
  }

  const addAsset = () => {
    if (asset !== '') {
      setShowAssetModal(false);
      setErrorModal(false);
      setAsset('');
      props.setStatusMessage('Asset was successfully added');
      props.setMessageType('success');
    } else {
      setErrorModal(true);
    }
  }

  const removeAsset = () => {
    if (props.assetsListArray.length > 0) {
      props.setAssetsListArray(prevAssetsListArray => {
        const assetsListArray = [...prevAssetsListArray];
        assetsListArray[props.selectedListIndex] =
          assetsListArray[props.selectedListIndex].filter(
            (element, index) => index !== selectedAssetIndex
          );
        return assetsListArray;
      });
      setRemoveAssetModal(false);
      setSelectedAssetIndex(0);
      props.setStatusMessage('Asset was successfully removed');
      props.setMessageType('success');
    }
  };

  return props.watchListsArray.length === 0 ? (
    <Container className='mt-4 mt-md-0 px-3 px-sm-5 justify-content-center'>
      <Typography
        variant='h6'
        fontWeight='bold'
        fontSize={{
          lg: 24,
          xs: 18
        }}
      >
        Start off by creating a Watchlist
      </Typography>
      <Typography
        className='mt-2'
        fontSize={{
          lg: 20,
          xs: 16
        }}
      >
        With watchlists you can keep an eye on assets before you make any buying decisions.
      </Typography>
      <Typography
        className='mt-2'
        fontSize={{
          lg: 20,
          xs: 16
        }}
      >
        Group different assets into watchlists like your top 5 US stocks or 10 sustainable ETFs.
        Create your first watchlist by adding a name on the above form and add later the assets you desire to follow.
      </Typography>
    </Container>
  ) : props.assetsListArray[props.selectedListIndex].length === 0 ? (
    <Container className='mt-4 mt-md-0 px-3 px-sm-4 justify-content-center'>
      <Typography
        variant='h6'
        fontWeight='bold'
        fontSize={{
          lg: 24,
          xs: 18
        }}
      >
        Continue by adding an Asset to the Watchlist
      </Typography>
      <Typography
        className='mt-2'
        fontSize={{
          lg: 20,
          xs: 16
        }}
      >
        In order to find an asset please type in its name or acronym on the search field above. The search will be
        limited to 10 assets per attempt,
        so keep typing until the desired one is on the screen.
      </Typography>
      <Typography
        className='mt-2'
        fontSize={{
          lg: 20,
          xs: 16
        }}
      >
        Once the wanted asset shows up in the list, please click the "bookmark" icon and select the Watchlist you wish
        to add it to.
      </Typography>
    </Container>
  ) : (
    <Container className='px-1 px-sm-3 px-md-3 px-lg-2 ps-xl-5 me-xl-0'>
      <Stack
        id='assets-stack'
        className='d-none d-md-flex mb-3 justify-content-between'
        direction='row'
        alignItems='center'
        gap={1}
      >
        <Typography variant='h6' noWrap>
          {props.watchListsArray[props.selectedListIndex]}:
        </Typography>
      </Stack>

      <AssetListItem
        assetsListArray={props.assetsListArray}
        selectedListIndex={props.selectedListIndex}
        watchListsArray={props.watchListsArray}
        setSelectedAssetIndex={setSelectedAssetIndex}
        setRemoveAssetModal={setRemoveAssetModal}
      />

      {renderAddAssetModal(showAssetModal, handleClose, errorModal, setAsset, addAsset)}
      {renderRemoveAssetModal(removeAssetModal, handleClose, removeAsset)}
    </Container>
  );
}

AssetsList.propTypes = {
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  assetsListArray: PropTypes.array,
  setAssetsListArray: PropTypes.func,
  selectedListIndex: PropTypes.number,
  setSelectedListIndex: PropTypes.func,
  setStatusMessage: PropTypes.func,
  setMessageType: PropTypes.func
};

export default AssetsList;