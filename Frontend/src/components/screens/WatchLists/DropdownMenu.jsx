import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Container,
  Tooltip
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
      <Tooltip
        title={props.tooltip}
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              color: `${props.selectedListIndex === props.listIndex ? '#30302f' : 'white'}`,
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: `${props.selectedListIndex === props.listIndex ? '#bdbab7' : '#30302f'}`,
              '& .MuiTooltip-arrow': {
                color: `${props.selectedListIndex === props.listIndex ? '#bdbab7' : '#30302f'}`
              },
            },
          },
        }}
      >
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
            minWidth: 0,
            '&:hover': {
              backgroundColor: `${props.selectedListIndex === props.listIndex ? '#493f35' : 'white'}`,
            }
          }}
        >
          <MoreHorizIcon fontSize='medium' sx={{
            '&:hover': {
              border: `1px solid ${props.selectedListIndex === props.listIndex ? 'white' : '#493f35'}`,
              borderRadius: '5px'
            }
          }}/>
        </Button>
      </Tooltip>
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
  functionOptions: PropTypes.array,
  tooltip: PropTypes.string
};

export default DropdownMenu;