import React, {useState} from 'react';
import {
  Container,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography,
  Stack,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import CustomSelectField from './CustomSelectField';
import {renderAddWatchlistModal, renderEditListModal, renderRemoveListModal} from './Modals/watchlistModals';

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

  // Function to close the modals
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
      props.setAssetsListArray([...props.assetsListArray, []])
      setAddListModal(false);
      setErrorModal(false);
      setWatchlist('');
      props.setSelectedListIndex(props.watchListsArray.length);
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
    if (props.watchListsArray.length > 0) {
      props.setWatchListsArray(props.watchListsArray.filter(
        (element, index) => index !== listDropdownIndex
      ));
      props.assetsListArray.length > 0 && props.setAssetsListArray(props.assetsListArray.filter(
        (element, index) => index !== listDropdownIndex
      ));
      setRemoveListModal(false);
      props.selectedListIndex > 0 ?
        props.setSelectedListIndex(props.selectedListIndex - 1) :
        props.setSelectedListIndex(0)
    }
  };

  return (
    <Container className='ps-2 px-xl-0 col-12'>
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
              {props.watchListsArray.length > 0 && (
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
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {renderAddWatchlistModal(addListModal, handleClose, errorModal, onTextChange, addWatchlist)}
      {renderEditListModal(editListModal, handleClose, errorModal, onTextChange, props.watchListsArray[listDropdownIndex], editWatchList)}
      {renderRemoveListModal(removeListModal, handleClose, removeWatchList)}
    </Container>
  );
}

WatchLists.propTypes = {
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  selectedListIndex: PropTypes.number,
  setSelectedListIndex: PropTypes.func,
  assetsListArray: PropTypes.array,
  setAssetsListArray: PropTypes.func,
};

export default WatchLists;