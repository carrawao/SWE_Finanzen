import React, {useEffect, useState} from 'react';
import {Button, FormControl, FormHelperText, InputLabel} from '@mui/material';
import {CustomModal, StyledTextField} from '../../../common';

export const RenderAddPortfolioModal = ({
    open,
    portfolioData,
    handleClose,
    onClick
  }) => {
    const [error, setError] = useState(false);
    const [errorDescripton, setErrorDescripton] = useState('');
    const [newPortfolioName, setNewPortfolioName] = useState('');
  
    useEffect(() => {
      if (open) {
        if (newPortfolioName === '') {
          setError(true);
          setErrorDescripton('Can not be empty');
          return;
        }
        const existingPortfolios = Object.keys(portfolioData);
        for (let index = 0; index < existingPortfolios.length; index++) {
          const element = existingPortfolios[index];
          if (element === newPortfolioName) {
            setError(true);
            setErrorDescripton('Name is already used');
            return;
          }
        }
        setError(false);
      }
    }, [open, newPortfolioName]);
  
    return (
      <CustomModal
        open={open}
        className='p-0'
        handleClose={() => {
          handleClose();
          setError(false);
        }}
        labelledby='add_portfolio-modal-title'
        describedby='add_portfolio-modal-description'
        modalTitle='Add a new portfolio:'
        modalBody={() => (
          <FormControl
            className='pb-3'
            error={error}
          >
            <StyledTextField
              className='py-0'
              label='Portfolioname'
              value={newPortfolioName}
              onChange={(event) => {
                setNewPortfolioName(event.target.value);
              }}
            />
            {error && <FormHelperText error>*{errorDescripton}</FormHelperText>}
          </FormControl>
        )}
        modalButton={() => (
          <Button
            variant='outlined'
            onClick={() => {
              if (!error) {
                onClick(newPortfolioName);
                handleClose();
              }
            }}
            sx={{
              width: '5rem',
              color: 'white',
              borderColor: '#4eb96f',
              backgroundColor: '#4eb96f',
              '&:hover': {
                borderColor: '#068930',
                backgroundColor: '#4eb96f',
              },
              '&.Mui-disabled': {
                backgroundColor: '#f3f4f6',
              }
            }}
          >
            Add
          </Button>
        )}
      />
    );
  }