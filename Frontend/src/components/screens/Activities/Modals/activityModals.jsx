import React from 'react';
import {Button, Typography} from '@mui/material';
import {CustomModal} from '../../../common';

export const renderRemoveActivityModal = (open, onClick, handleClose) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose(false)}
    labelledby='remove_activity-modal-title'
    describedby='remove_activity-modal-description'
    modalTitle='Remove activity?'
    modalBody={() => (
      <Typography sx={{marginBottom: '1rem'}}>We won't be able to retrieve the data</Typography>
    )}
    modalButton={() => (
      <Button
        variant='outlined'
        onClick={() => onClick()}
        sx={{
          color: 'white',
          width: '5rem',
          borderColor: '#e47e25',
          backgroundColor: '#e47e25',
          '&:hover': {
            borderColor: '#c96208',
            backgroundColor: '#e47e25',
          }
        }}
      >
        Remove
      </Button>
    )}
  />
);
