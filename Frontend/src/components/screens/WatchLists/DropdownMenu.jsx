import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Container
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

/**
 * Component to display a dropdown with different actions
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DropdownMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  /**
   * Opes the dropdown when icon is clicked
   * @param event
   */
  const handleClick = event => {
    event.preventDefault()
    event.stopPropagation();
    setOpen(true);
    setAnchorEl(event.currentTarget);
    props.listIndex !== undefined ? props.setListDropdownIndex(props.listIndex) : props.setListDropdownIndex(props.selectedListIndex);
  };

  /**
   * Closes the dropdown
   * @param event
   */
  const handleClose = event => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(false);
  };

  /**
   * Triggers function according to the selected action in the dropdown
   * @param index
   * @param event
   */
  const onOptionClick = (index, event) => {
    event.stopPropagation();
    handleClose(event);
    props.functionOptions[index]();
  };

  return (
    <React.Fragment>
      <Button
        className='d-flex py-2 px-1'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          textAlign: 'right',
          padding: 0,
          color: `${props.selectedListIndex === props.listIndex ? 'white' : '#493f35'}`,
          minWidth: 0
        }}
      >
        <MoreHorizIcon fontSize='medium'/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transitionDuration={100}
        MenuListProps={{
          'aria-labelledby': `${props.listName}-menu`,
          'className': 'p-0'
        }}
        sx={{
          borderRadius: '2rem'
        }}
      >
        {props.menuOptions.map((option, index) => (
          <Container
            className='px-0'
            key={`${props.listName}-menu-${index}`}
          >
            <MenuItem
              className='px-0'
              onClick={event => onOptionClick(index, event)}
            >
              <Typography
                variant='inherit'
                className='py-2 px-3'
                sx={{
                  flexGrow: 1,
                  textAlign: 'start',
                }}
              >
                {props.iconOptions[index]} {option}
              </Typography>
            </MenuItem>
            {
              props.menuOptions.length - 1 === index
                ? null
                : <Divider className='m-0' variant='middle' sx={{color: '#493f35'}}/>
            }
          </Container>
        ))}
      </Menu>
    </React.Fragment>
  );
}

DropdownMenu.propTypes = {
  listIndex: PropTypes.number,
  selectedListIndex: PropTypes.number,
  listName: PropTypes.string,
  setListDropdownIndex: PropTypes.func,
  menuOptions: PropTypes.array,
  iconOptions: PropTypes.array,
  functionOptions: PropTypes.array
};

export default DropdownMenu;