import React from 'react';
import TextField from '@mui/material/TextField';
import {Container, InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//TODO: function for the search
const search = () => console.log('Searching for asset');

/**
 * Component for the search field in the screens' header
 * @returns {JSX.Element}
 * @constructor
 */
const SearchField = () => {
  return (
    <Container className='px-0'>
      <TextField
        id='standard-basic'
        variant='standard'
        placeholder='Search Asset'
        fullWidth
        sx={{
          '& .MuiInputBase-input': {
            '&::-webkit-input-placeholder': {
              color: 'black'
            },
          },
          '& .MuiInput-underline': {
            '&:after': {
              borderBottomColor: '#493f35',
            },
            '&:focus::after': {
              borderBottomColor: '#493f35',
            },
          },
          '& .MuiInputBase-root:before': {
            borderBottom: '1px solid #493f35',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton onClick={search} className='pe-0'>
                <SearchIcon style={{color: '#493f35'}}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}

export default SearchField;