import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from '@mui/material';
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
          backgroundColor: 'rgb(78 185 111)',
          '&:hover': {
            backgroundColor: 'rgb(78 185 111)',
          }
        }}
      >
        Add
      </Button>
    )}
  />
);

export const renderEditListModal = (open, handleClose, errorModal, onChange, defaultValue, onCLick) => {
  return (
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
          helperText={errorModal ? '*Name cannot be empty' : false}
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
            backgroundColor: 'rgb(78 185 111)',
            '&:hover': {
              backgroundColor: 'rgb(78 185 111)',
            }
          }}
        >
          Rename
        </Button>
      )}
    />
  );
}

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
          borderColor: 'rgb(228 126 37)',
          backgroundColor: 'rgb(228 126 37)',
          '&:hover': {
            backgroundColor: 'rgb(228 126 37)',
          }
        }}
      >
        Remove
      </Button>
    )}
  />
);

export const RenderAddToWatchlistModal = ({
  open,
  handleClose,
  watchListsArray,
  assetsListArray,
  resultAsset,
  selectedListIndex,
  onChange,
  onClick
}) => {
  const [error, setError] = useState(false);
  const [selectedWatchListIndex, setSelectedWatchListIndex] = useState(selectedListIndex);

  useEffect(() => {
    if (selectedWatchListIndex !== selectedListIndex) {
      setSelectedWatchListIndex(selectedListIndex);
    }

    if (resultAsset !== undefined) {
      const name = resultAsset.name;
      assetsListArray[selectedWatchListIndex].forEach(element => {
        if (element.name === name) {
          setError(true);
        }
      });
    }
  }, [assetsListArray, error, resultAsset, selectedWatchListIndex]);

  return (
    <CustomModal
      open={open}
      className='p-0'
      handleClose={() => {
        handleClose();
        setError(false);
      }}
      labelledby='add_to_watchlist-modal-title'
      describedby='add_to_watchlist-modal-description'
      modalTitle='Add to watchlist:'
      modalBody={() => (
        <FormControl
          className='pb-3'
          error={error}
        >
          <InputLabel id='select_watchlist' className='d-flex'>Watchlist</InputLabel>
          <Select
            className='py-0'
            label='Watchlist'
            labelId='select_watchlist'
            value={watchListsArray.length > 0 ? watchListsArray[selectedWatchListIndex] : 'Select watchlist'}
            onChange={(event) => {
              const eventIndex = watchListsArray.map(item => item).indexOf(event.target.value);
              setSelectedWatchListIndex(eventIndex);
              setError(false);
              onChange(event);
            }}
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
          {error && <FormHelperText error>*Asset already in selected Watchlist</FormHelperText>}
        </FormControl>
      )}
      modalButton={() => (
        <Button
          variant='outlined'
          onClick={() => {
            if (!error) {
              onClick();
              handleClose();
            }
          }}
          sx={{
            color: 'white',
            width: '5rem',
            backgroundColor: 'rgb(78 185 111)',
            '&:hover': {
              backgroundColor: 'rgb(78 185 111)',
            }
          }}
        >
          Add
        </Button>
      )}
    />
  );
}
