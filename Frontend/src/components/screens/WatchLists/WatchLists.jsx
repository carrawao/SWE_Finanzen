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
  IconButton,
  AvatarGroup,
  Avatar,
  FormControl,
  Button,
  TextField,
  Tooltip,
  styled
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import CustomSelectField from './CustomSelectField';
import {renderAddWatchlistModal, renderEditListModal, renderRemoveListModal} from './Modals/watchlistModals';

import { StyledTextField, Colors } from '../../common';

/**
 * Creates a hashCode from a String
 * @param String
 * @returns {interger}
 */
 String.prototype.hashCode = function() {
  let hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Show all the watchLists
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchLists = props => {
  const [addListModal, setAddListModal] = useState(false);
  const [editListModal, setEditListModal] = useState(false);
  const [removeListModal, setRemoveListModal] = useState(false);
  const [watchlist, setWatchlist] = useState(undefined);
  const [errorModal, setErrorModal] = useState(false);
  const [listDropdownIndex, setListDropdownIndex] = useState(0);
  const avatarGroupColors = Colors.COLORPALETTE;

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

  /**
   * Updates text when changing watchlist name
   * @param data
   */
  const onTextChange = data => {
    setWatchlist(data.target.value);
    data.target.value === '' ? setErrorModal(true) : setErrorModal(false);
  }

  const addWatchlist = () => {
    if (watchlist !== undefined && watchlist !== '') {
      props.setWatchListsArray([...props.watchListsArray, watchlist]);
      props.setAssetsListArray([...props.assetsListArray, []])
      setAddListModal(false);
      setErrorModal(false);
      setWatchlist('');
      props.setSelectedListIndex(props.watchListsArray.length);
      props.setStatusMessage('Watchlist was successfully created');
      props.setMessageType('success');
    } else {
      setErrorModal(true);
    }
  }

  const editWatchList = () => {
    let tempArray = [...props.watchListsArray];
    if (watchlist !== undefined) {
      if (watchlist !== '' && watchlist !== props.watchListsArray[listDropdownIndex]) {
        tempArray[listDropdownIndex] = watchlist;
        props.setWatchListsArray(tempArray);
        setEditListModal(false);
        setErrorModal(false);
        setWatchlist('');
        props.setStatusMessage('Watchlist was successfully edited');
        props.setMessageType('success');
      } else {
        setErrorModal(true);
      }
    } else {
      setErrorModal(false);
      setEditListModal(false);
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
      props.setStatusMessage('Watchlist was successfully removed');
      props.setMessageType('success');
    }
  };

  return props.watchListsArray.length === 0 ? (
    <Container className='d-flex col-10 pe-md-1 justify-content-center'>
      <FormControl
        className='d-flex flex-grow-1 p-3 mx-sm-5 mx-md-0'
        sx={{
          border: '1px solid ',
          borderRadius: '0.5rem'
        }}
      >
        <StyledTextField
          id='outlined-basic'
          variant='outlined'
          className='d-flex pb-3'
          label='Create Watchlist'
          error={errorModal}
          helperText={errorModal ? '*Name cannot be empty' : false}
          onChange={(event) => onTextChange(event)}
        />
        <Button
          className='d-flex'
          variant='outlined'
          onClick={() => addWatchlist()}
          sx={{
            fontWeight: 'bold',
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
      </FormControl>
    </Container>) : (
    <Container className='d-flex flex-column ps-2 px-xl-0 col-12'>
      <Stack
        className='d-none mb-3 d-md-flex'
        direction='row'
        alignItems='center'
      >
        <Typography variant='h6' noWrap>
          Watchlists:
        </Typography>
        <IconButton
          onClick={() => setAddListModal(true)}
          className='pe-0 py-0'
        >
          <Tooltip
            title='Create Watchlist'
            arrow
            placement='right'
            componentsProps={{
              tooltip: {
                sx: {
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  backgroundColor: '#30302f',
                  '& .MuiTooltip-arrow': {
                    color: '#30302f'
                  },
                },
              },
            }}
          >
            <AddIcon style={{color: '#493f35'}}/>
          </Tooltip>
        </IconButton>
      </Stack>

      <CustomSelectField
        className='d-flex d-md-none col-12 col-lg-8 my-3'
        watchListsArray={props.watchListsArray}
        selectedListIndex={props.selectedListIndex}
        assetsListArray={props.assetsListArray}
        setSelectedListIndex={index => props.setSelectedListIndex(index)}
        setListDropdownIndex={setListDropdownIndex}
        functionOptions={[
          () => setEditListModal(true),
          () => setRemoveListModal(true)
        ]}
        setAddListModal={() => setAddListModal(true)}
      />

      <Box className='d-none d-md-flex'>
        <List
          className='p-0 col-12'
          sx={{
            paddingBottom: '10px',
            '& ul': {paddingTop: 0, paddingBottom: 0},
            '&& .MuiMenuItem-root': {
              '&.Mui-selected': {
                color: 'white',
                backgroundColor: 'rgb(73, 63, 53)'
              }
            },
            '&& .Mui-selected': {
              color: 'white',
              backgroundColor: 'rgb(73, 63, 53)'
            }
          }}
        >
          {props.watchListsArray.map((element, index) => (
            <ListItem
              className='mb-3 px-2'
              key={index}
              sx={{
                borderTop: '1px solid lightgrey',
                borderLeft: `${index === props.selectedListIndex ? '1px solid #493f35' : '1px solid lightgrey'}`,
                borderRight: '1px solid lightgrey',
                borderBottom: '1px solid lightgrey',
                borderRadius: '0.5rem',
                backgroundColor: `${index === props.selectedListIndex ? '#493f35' : 'white'}`,
                borderLeftColor: `${index === props.selectedListIndex && '#493f35'}`,
                boxShadow: `${index === props.selectedListIndex && '0 6px 6px -6px rgb(0 0 0 / 30%)'}`
              }}
            >
              <ListItemButton
                className='py-2 px-0 col-10'
                selected={props.selectedListIndex === index}
                onClick={event => handleWatchListItemClick(event, index)}

              >
                <ListItemText
                  className='text-start ps-1 pe-2'
                  disableTypography
                  primary={
                    <Typography
                      type='body2' noWrap
                      sx={{
                        color: `${index === props.selectedListIndex ? 'white' : '#493f35'}`,
                        fontWeight: props.selectedListIndex === index && 'bold',
                        fontSize: {
                          xl: '20px',
                          lg: '16px'
                        }
                      }}
                    >
                      {element}
                    </Typography>
                  }
                  sx={{}}
                />
                <AvatarGroup
                  spacing={5}
                  appearance='stack'
                >
                  {props.assetsListArray[index].length > 0 && props.assetsListArray[index].map((asset, assetIndex) =>
                      asset && assetIndex < 3 && <Avatar
                        key={`avatarGroup_${asset.name}`}
                        alt={`${asset.name}`}
                        sx={{
                          '&.MuiAvatar-circular': {
                            borderColor: props.selectedListIndex === index ? 'white' : 'black'
                          },
                          backgroundColor: avatarGroupColors[asset.symbol.hashCode() % 10],
                          width: {
                            md: '1.2rem',
                            xl: '1.5rem'
                          },
                          height: {
                            md: '1.2rem',
                            xl: '1.5rem'
                          },
                        }}
                      >
                        <Typography sx={{fontSize: '12px'}}>
                          {asset.symbol.slice(0, 3).toUpperCase()}
                        </Typography>
                      </Avatar>
                  )}
                </AvatarGroup>
              </ListItemButton>
              {props.watchListsArray.length > 0 && (
                <DropdownMenu
                  tooltip='Edit Watchlist'
                  listIndex={index}
                  selectedListIndex={props.selectedListIndex}
                  listName={props.watchListsArray[index]}
                  listDropdownIndex={listDropdownIndex}
                  setListDropdownIndex={setListDropdownIndex}
                  menuOptions={['Edit', 'Delete']}
                  iconOptions={[<EditIcon/>, <DeleteIcon/>]}
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
      {renderEditListModal(
        editListModal,
        handleClose,
        errorModal,
        onTextChange,
        props.watchListsArray[listDropdownIndex],
        editWatchList)}
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
  setStatusMessage: PropTypes.func,
  setMessageType: PropTypes.func
};

export default WatchLists;