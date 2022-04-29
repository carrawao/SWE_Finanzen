import React from 'react';
import {CustomModal} from '../../../common';

export const renderRemoveActivityModal = (open, handleClose) => (
  
  <CustomModal
    open={open}
    handleClose={() => handleClose(false)}
    labelledby='remove_activity-modal-title'
    describedby='remove_activity-modal-description'
    modalTitle='Remove activity'
    modalBody={() => (
      <p>Hi</p>
    )}
    modalButton={() => (
      false
    )}
  />
);
