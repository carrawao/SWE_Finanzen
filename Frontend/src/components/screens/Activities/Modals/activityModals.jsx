import React from 'react';
import {CustomModal} from '../../../common';

export const renderRemoveActivityModal = (open, handleClose) => (
  
  <CustomModal
    open={open}
    size="big"
    handleClose={() => handleClose(false)}
    labelledby='add_activity-modal-title'
    describedby='add_activity-modal-description'
    modalTitle='Add new activity'
    modalBody={() => (
      <p>Hi</p>
    )}
    modalButton={() => (
      false
    )}
  />
);