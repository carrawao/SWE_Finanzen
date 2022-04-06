import React, {useEffect} from 'react';
import {FormControl, InputLabel, Select, MenuItem, Grid} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownMenu from './DropdownMenu';
import PropTypes from 'prop-types';

const CustomSelectField = props => {
  const [selectedItem, setSelectedItem] = React.useState(props.watchListsArray[props.selectedListIndex]);

  const handleChange = (event) => {
    if (props.watchListsArray.includes(event.target.value)) {
      const index = props.watchListsArray.map(item => item).indexOf(event.target.value);
      props.setSelectedListIndex(index);
    }
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    if (selectedItem === 'Add watchlist') {
      props.setAddListModal();
      setSelectedItem(props.watchListsArray[props.selectedListIndex]);
    }
  })
  return (
    <Grid className='d-flex flex-row align-items-center d-lg-none col-12'>
      <Grid item className='d-flex col-5 col-sm-4 col-md-3'>
      <FormControl
        className={props.className}
      >
        <InputLabel id='select_watchlist' className='d-flex'>Watchlist</InputLabel>
        <Select
          className='py-0'
          label='Watchlist'
          labelId='select_watchlist'
          value={props.watchListsArray.length > 0 ? props.watchListsArray[props.selectedListIndex] : 'Add watchlist'}
          onChange={(event) => handleChange(event)}
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
                color: `${props.watchListsArray[props.selectedListIndex] === selectedItem ? 'white' : '#493f35'}`,
                backgroundColor: `${props.watchListsArray[props.selectedListIndex] === selectedItem ? '#493f35' : 'white'}`
              }
            }
          }}
        >
          {props.watchListsArray.map((element, index) => (
            <MenuItem
              key={`watchlist_${index}`}
              className='py-3'
              value={element}
              divider
            >
              {element}
            </MenuItem>
          ))}
          <MenuItem
            value='Add watchlist'
            className='py-3'
            sx={{color: '#493f35'}}
          >
            + New watchlist
          </MenuItem>
        </Select>
      </FormControl>
      </Grid>

      <Grid item className='col-3 justify-content-start'>
        <DropdownMenu
          selectedListIndex={props.selectedListIndex}
          listName={props.watchListsArray[props.selectedListIndex]}
          setListDropdownIndex={props.setListDropdownIndex}
          menuOptions={['Edit', 'Delete']}
          iconOptions={[<EditIcon />, <DeleteIcon />]}
          functionOptions={props.functionOptions}
        />
      </Grid>
    </Grid>
  );
}

CustomSelectField.propTypes = {
  watchListsArray: PropTypes.array,
  selectedListIndex: PropTypes.number,
  setSelectedListIndex: PropTypes.func,
  className: PropTypes.string,
  setListDropdownIndex: PropTypes.func,
  functionOptions: PropTypes.array,
  setAddListModal: PropTypes.func,
};

export default CustomSelectField;