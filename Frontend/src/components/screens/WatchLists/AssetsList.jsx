import React, {useState} from 'react';
import {
  Container,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import {CustomTable} from '../../common/index';
import {renderRemoveAssetModal, renderAddAssetModal} from './Modals/assetModals';

/**
 * Show all the assets corresponding a watchlist
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AssetsList = (props) => {
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
    }
  };

  return props.watchListsArray.length > 0 && (
    <Container className='px-1 px-sm-3 px-md-5 px-lg-2 pe-xl-3'>
      <Stack
        className='d-none d-lg-flex mb-3 justify-content-between'
        direction='row'
        alignItems='center'
        gap={1}
      >
        <Typography variant='h6' noWrap>
          {props.watchListsArray[props.selectedListIndex]}:
        </Typography>
        <IconButton
          onClick={() => {
          }}
        >
          <AddIcon style={{color: '#493f35'}}/>
        </IconButton>
      </Stack>

      <Container className='d-flex d-lg-none col-12 justify-content-end pe-2'>
        <IconButton
          onClick={() => setShowAssetModal(true)}
          className='pe-0'
        >
          <AddIcon style={{color: '#493f35'}}/>
        </IconButton>
      </Container>

      <CustomTable
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
  setSelectedListIndex: PropTypes.func
};

export default AssetsList;