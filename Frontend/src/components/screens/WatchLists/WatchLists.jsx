import React, {useState} from 'react';
import {CustomModal} from '../../common/index';
import {
  Container,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import CustomSelectField from './CustomSelectField';

/**
 * Show all the watchLists
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchLists = (props) => {
  const [addListModal, setAddListModal] = useState(false);
  const [editListModal, setEditListModal] = useState(false);
  const [removeListModal, setRemoveListModal] = useState(false);
  const [watchlist, setWatchlist] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [listDropdownIndex, setListDropdownIndex] = useState(0);

  const handleWatchListItemClick = (event, index) => {
    props.setSelectedListIndex(index);
  };

  const handleClose = () => {
    setErrorModal(false);
    setAddListModal(false);
    setEditListModal(false);
    setRemoveListModal(false);
  }

  const onTextChange = data => {
    if (addListModal || editListModal) {
      setWatchlist(data.target.value);
      data.target.value === '' ? setErrorModal(true) : setErrorModal(false);
    }
  }

  const addWatchlist = () => {
    if (watchlist !== '') {
      props.setWatchListsArray([...props.watchListsArray, watchlist]);
      setAddListModal(false);
      setErrorModal(false);
      setWatchlist('');
    } else {
      setErrorModal(true);
    }
  }

  const editWatchList = () => {
    let tempArray = [...props.watchListsArray];
    if (watchlist !== '') {
      if (watchlist !== props.watchListsArray[listDropdownIndex]) {
        tempArray[listDropdownIndex] = watchlist;
        props.setWatchListsArray(tempArray);
        setEditListModal(false);
        setErrorModal(false);
        setWatchlist('');
      } else {
        setErrorModal(true);
      }
    } else {
      setErrorModal(true);
    }
  }

  const removeWatchList = () => {
    if (props.watchListsArray.length !== 0) {
      props.setWatchListsArray(props.watchListsArray.filter(
        (element, index) => index !== listDropdownIndex
      ));
      setRemoveListModal(false);
    }
  };

  const renderAddWatchlistModal = () => (
    <CustomModal
      open={addListModal}
      handleClose={() => handleClose()}
      labelledby='add_list-modal-title'
      describedby='add_list-modal-description'
      modalTitle='New watchlist:'
      modalBody={() => (
        <TextField
          variant='outlined'
          className='pb-3'
          label='Enter name'
          error={errorModal}
          helperText={errorModal ? '*Name cannot be empty' : false}
          defaultValue=''
          sx={{display: 'flex', flexGrow: 2}}
          onChange={data => onTextChange(data)}
        />
      )}
      modalButton={() => (
        <Button
          variant='outlined'
          onClick={() => addWatchlist()}
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

  const renderEditListModal = () => {
    return (
      <CustomModal
        open={editListModal}
        handleClose={() => handleClose()}
        labelledby='edit_list-modal-title'
        describedby='edit_list-modal-description'
        modalTitle='Rename watchlist:'
        modalBody={() => (
          <TextField
            id='outlined-basic'
            variant='outlined'
            className='pb-3'
            label='Rename'
            onChange={data => onTextChange(data)}
            error={errorModal}
            helperText={errorModal ? '*Name is the same or empty' : false}
            defaultValue={`${props.watchListsArray[listDropdownIndex]}`}
            sx={{display: 'flex', flexGrow: 2}}
          />
        )}
        modalButton={() => (
          <Button
            variant='outlined'
            onClick={() => editWatchList()}
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
  }

  const renderRemoveListModal = () => {
    return (
      <CustomModal
        open={removeListModal}
        handleClose={() => handleClose()}
        labelledby='remove_list-modal-title'
        describedby='remove_list-modal-description'
        modalTitle='Watchlist will be removed:'
        modalButton={() => (
          <Button
            variant='outlined'
            onClick={() => removeWatchList()}
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
  }

  return (
    <Container className='ps-2 ps-xl-5 col-12'>
      <Stack
        className='d-none d-lg-flex'
        direction='row'
        alignItems='center'
      >
        <Typography variant='h6' noWrap>
          Watchlists:
        </Typography>
        <IconButton
          onClick={() => setAddListModal(true)}
          className='pe-0'
        >
          <AddIcon style={{color: '#493f35'}}/>
        </IconButton>
      </Stack>

      <CustomSelectField
        className='d-flex d-lg-none col-12 col-lg-8 my-3'
        watchListsArray={props.watchListsArray}
        selectedListIndex={props.selectedListIndex}
        setSelectedListIndex={index => props.setSelectedListIndex(index)}
        setListDropdownIndex={setListDropdownIndex}
        functionOptions={[
          () => setEditListModal(true),
          () => setRemoveListModal(true)
        ]}
        setAddListModal={() => setAddListModal(true)}
      />

      <Box className='d-none d-lg-flex'>
        <List>
          {props.watchListsArray.map((element, index) => (
            <ListItem
              className='p-0 mb-3'
              key={index}
              sx={{
                border: '2px solid #493f35',
                backgroundColor: `${index === props.selectedListIndex ? '#493f35' : 'white'}`
              }}
            >
              <ListItemButton
                className='py-0'
                selected={props.selectedListIndex === index}
                onClick={event => handleWatchListItemClick(event, index)}

              >
                <ListItemText
                  className='text-start'
                  primary={element}
                  sx={{color: props.selectedListIndex === index ? 'white' : '#493f35'}}/>
              </ListItemButton>
              <DropdownMenu
                listIndex={index}
                selectedListIndex={props.selectedListIndex}
                listName={props.watchListsArray[index]}
                setListDropdownIndex={setListDropdownIndex}
                menuOptions={['Edit', 'Delete']}
                iconOptions={[<EditIcon />, <DeleteIcon />]}
                functionOptions={[
                  () => setEditListModal(true),
                  () => setRemoveListModal(true)
                ]}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {renderEditListModal()}
      {renderAddWatchlistModal()}
      {renderRemoveListModal()}
    </Container>
  );
}

WatchLists.propTypes = {
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  selectedListIndex: PropTypes.number,
  setSelectedListIndex: PropTypes.func,
};

export default WatchLists;