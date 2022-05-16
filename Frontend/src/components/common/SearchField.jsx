import React from 'react';
import TextField from '@mui/material/TextField';
import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

/**
 * Component for the search field in the screens' header
 * @param props
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
        return await fetch(`${process.env.REACT_APP_BASEURL}/search?text=${encodeURIComponent(query)}`, {mode: 'cors'})
          .then(response => response.json())
          .then(searchResult => {
            let firstResults = searchResult.slice(0, 10);
            props.onQueryChange(firstResults);
          });
      } catch (error) {
        props.setStatusMessage('Lost connection to server. Please try again later');
        props.setMessageType('error');
        console.log('fetching failed === ', error);
      }
    } else {
      props.onQueryChange([]);
    }
  }

  return (
    <TextField
      id='search-field'
      autoComplete='off'
      variant='standard'
      placeholder='Search Asset'
      className='d-flex flex-grow-1'
      sx={{
        '& .MuiInputBase-input': {
          '&::-webkit-input-placeholder': {
            color: '#493f35'
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
            <SearchIcon style={{color: '#493f35'}}/>
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
  setStatusMessage: PropTypes.func,
  setMessageType: PropTypes.func
};

export default SearchField;