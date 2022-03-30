import React, {useState} from 'react';
import {CustomModal} from '../../common/index';
import {
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import {CustomTable} from '../../common/index';


const createData = (name, price, change) => {
  return { name, price, change };
}

const assetsArrayTest = [
  [
    createData('Allianz', '212.25$', '-1.80%'),
    createData('Fuijitsu', '212.25$', '-1.80%'),
    createData('Capgemini', '212.25$', '-1.80%'),
    createData('IBM', '212.25$', '-1.80%'),
  ],
  [
    createData('Thales', '212.25$', '-1.80%'),
    createData('WW', '212.25$', '-1.80%'),
    createData('DHBW', '212.25$', '-1.80%'),
    createData('Netto', '212.25$', '-1.80%'),
  ]
];

/**
 * Show all the assets corresponding a watchlist
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AssetsList = (props) => {
  //const [assetsArray, setAssetsArray] = useState([]);
  //const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [asset, setAsset] = useState('');
  const [errorModal, setErrorModal] = useState(false);


  const handleClose = () => {
    setErrorModal(false);
    setShowAssetModal(false);
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

  const renderAddAssetModal = () => (
    <CustomModal
      open={showAssetModal}
      handleClose={() => handleClose()}
      labelledby='add_asset-modal-title'
      modalTitle='New asset'
      modalBody={() => (
        <TextField
          id='outlined-basic'
          variant='outlined'
          label='Enter name'
          error={errorModal}
          helperText={errorModal ? '*Field cannot be empty' : false}
          defaultValue=''
          sx={{display: 'flex', flexGrow: 2}}
          onChange={data => setAsset(data.target.value)}
        />
      )}
      modalButton={() => (
        <Button
          variant='outlined'
          onClick={() => addAsset()}
          sx={{
            color: 'white',
            backgroundColor: '#493f35',
            '&:hover': {
              backgroundColor: '#493f35',
            }
          }}
        >
          Add
        </Button>
      )}
    />
  );

  return (
    <Container className='pe-2 pe-xl-5'>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography variant='h6' noWrap>
          {props.watchListsArray[props.selectedListIndex]}:
        </Typography>
        <IconButton
          onClick={() => {
          }}
          className='pe-0'
        >
          <AddIcon style={{color: '#493f35'}}/>
        </IconButton>
      </Stack>
      <CustomTable
        assetsArray={assetsArrayTest}
        selectedListIndex={props.selectedListIndex}
        watchListsArray={props.watchListsArray}
      />

      {renderAddAssetModal()}
    </Container>
  );
}

AssetsList.propTypes = {
  watchListsArray: PropTypes.array,
  selectedListIndex: PropTypes.number,
};

export default AssetsList;