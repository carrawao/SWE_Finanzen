import React from 'react';
import {Button} from '@mui/material';
import {CustomModal} from '../../../common';

export const renderDeleteDataModal = (open, handleClose, onClick) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose()}
    labelledby='delete_data-modal-title'
    describedby='delete_data-modal-description'
    modalTitle='Delete all data'
    modalButton={() => (
      <Button
        variant='outlined'
        onClick={() => onClick()}
        sx={{
          color: 'white',
          width: '5rem',
          borderColor: 'rgb(228 126 37)',
          backgroundColor: 'rgb(228 126 37)',
          '&:hover': {
            backgroundColor: 'rgb(228 126 37)',
          }
        }}
      >
        Confirm
      </Button>
    )}
  />
);
