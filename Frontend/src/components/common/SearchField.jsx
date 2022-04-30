import React from 'react';
import TextField from '@mui/material/TextField';
import {InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";

/**
 * Component for the search field in the screens' header
 * @returns {JSX.Element}
 * @constructor
 */
const SearchField = props => {
  /**
   * Get result of shares and cryptos in the search field
   * @param query
   * @returns {Promise<Response<any, Record<string, any>, number>>}
   */
  const search = async query => {
    if (query !== '') {
      try {
        return await fetch(`${process.env.REACT_APP_BASEURL}/search?text=${query}`, {mode:'cors'})
          .then(response => response.json())
          .then(searchResult => {
            let firstResults = searchResult.slice(0, 10);
            props.onQueryChange(firstResults);
          });
      }
      catch (e) {
        console.log('fetching failed === ', e);
      }
    } else {
      props.onQueryChange([]);
    }
  }

  return (
    <TextField
      id='search-field'
      variant='standard'
      placeholder='Search Asset'
      className='d-flex flex-grow-1'
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
            <IconButton className='pe-0'>
              <SearchIcon style={{color: '#493f35'}}/>
            </IconButton>
          </InputAdornment>
        ),
      }}
      defaultValue={props.searchQuery}
      onChange={event => search(event.target.value)}
    />
  );
}

SearchField.propTypes = {
  searchQuery: PropTypes.string,
  onQueryChange: PropTypes.func,
};

export default SearchField;