import React from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {CustomModal} from '../../../common';

export const renderAddWatchlistModal = (open, handleClose, errorModal, onChange, onClick) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose()}
    labelledby='add_list-modal-title'
    describedby='add_list-modal-description'
    modalTitle='New watchlist:'
    modalBody={() => (
      <TextField
        variant='outlined'
        className='d-flex flex-grow-2 pb-3'
        label='Enter name'
        error={errorModal}
        helperText={errorModal ? '*Name cannot be empty' : false}
        defaultValue=''
        onChange={data => onChange(data)}
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

export const renderEditListModal = (open, handleClose, errorModal, onChange, defaultValue, onCLick) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose()}
    labelledby='edit_list-modal-title'
    describedby='edit_list-modal-description'
    modalTitle='Rename watchlist:'
    modalBody={() => (
      <TextField
        id='outlined-basic'
        variant='outlined'
        className='d-flex flex-grow-2 pb-3'
        label='Rename'
        onChange={data => onChange(data)}
        error={errorModal}
        helperText={errorModal ? '*Name is the same or empty' : false}
        defaultValue={defaultValue}
      />
    )}
    modalButton={() => (
      <Button
        variant='outlined'
        onClick={() => onCLick()}
        sx={{
          color: 'white',
          width: '5rem',
          backgroundColor: '#493f35',
          '&:hover': {
            backgroundColor: '#493f35',
          }
        }}
      >
        Rename
      </Button>
    )}
  />
);

export const renderRemoveListModal = (open, handleClose, onClick) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose()}
    labelledby='remove_list-modal-title'
    describedby='remove_list-modal-description'
    modalTitle='Remove watchlist?'
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

export const renderAddToWatchlistModal = (open, handleClose, watchListsArray, selectedListIndex, onChange, onClick ) => (
  <CustomModal
    open={open}
    handleClose={() => handleClose(false)}
    labelledby='add_to_watchlist-modal-title'
    describedby='add_to_watchlist-modal-description'
    modalTitle='Add to watchlist:'
    modalBody={() => (
      <FormControl
        className='pb-3'
      >
        <InputLabel id='select_watchlist' className='d-flex'>Watchlist</InputLabel>
        <Select
          className='py-0'
          label='Watchlist'
          labelId='select_watchlist'
          value={watchListsArray.length > 0 ? watchListsArray[selectedListIndex] : 'Select watchlist'}
          onChange={(event) => onChange(event)}
          renderValue={(value) => `${value}`}
          MenuProps={{
            sx: {
              paddingBottom: '10px',
              '& ul': {paddingTop: 0, paddingBottom: 0},
              '&& .MuiMenuItem-root': {
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#493f35'
                }
              },
              '&& .Mui-selected': {
                color: 'white',
                backgroundColor: '#493f35'
              }
            }
          }}
        >
          {watchListsArray.map((element, index) => (
            <MenuItem
              key={`watchlist_${index}`}
              className='py-3'
              value={element}
              divider
            >
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
