import React from 'react';
import {Button, TextField} from '@mui/material';
import {CustomModal} from '../../../common';

export const renderRemoveAssetModal = (open, handleClose, onClick ) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose()}
    labelledby='remove_asset-modal-title'
    describedby='remove_asset-modal-description'
    modalTitle='Remove asset?'
    modalButton={() => (
      <Button
        variant='outlined'
        onClick={() => onClick()}
        sx={{
          color: 'white',
          width: '5rem',
          backgroundColor: '#493f35',
          '&:hover': {
            backgroundColor: '#493f35',
          }
        }}
      >
        Remove
      </Button>
    )}
  />
);

export const renderAddAssetModal = (open, handleClose, errorModal, onChange, onClick) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose()}
    labelledby='add_asset-modal-title'
    describedby='add_asset-modal-description'
    modalTitle='New asset'
    modalBody={() => (
      <TextField
        variant='outlined'
        className='d-flex flex-grow-2 pb-3'
        label='Enter name'
        error={errorModal}
        helperText={errorModal ? '*Name cannot be empty' : false}
        defaultValue=''
        onChange={data => onChange(data.target.value)}
      />
    )}
    modalButton={() => (
      <Button
        variant='outlined'
        onClick={() => onClick()}
        sx={{
          color: 'white',
          width: '5rem',
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