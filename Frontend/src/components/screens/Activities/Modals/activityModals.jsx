import React from 'react';
import {CustomModal} from '../../../common';
import AddActivityForm from '../AddActivityForm';

export const renderAddActivityModal = (open, handleClose, errorModal) => (
  
  <CustomModal
    open={open}
    size="big"
    handleClose={() => handleClose(false)}
    labelledby='add_activity-modal-title'
    describedby='add_activity-modal-description'
    modalTitle='Add new activity'
    modalBody={() => (
      <AddActivityForm></AddActivityForm>
    )}
    modalButton={() => (
      false
    )}
  />
);