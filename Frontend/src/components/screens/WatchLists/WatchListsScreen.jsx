import React, {useState} from 'react';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Avatar,
  Button,
  ListItemButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

import WatchLists from './WatchLists';
import AssetsList from './AssetsList';
import ScreensTemplate from '../../ScreensTemplate';
import {CustomModal, SearchField} from '../../common';

/**
 * Component related to the watchLists page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchListsScreen = (props) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultIndex, setSearchResultIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addToWatchlistModal, setAddToWatchlistModal] = useState(false);

  const renderHeader = () => (
      <SearchField
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
  );

  const renderBody = () => (
    <Grid className='d-lg-flex pt-2'>
      {searchResult.length > 0 ?
      <Grid item className='col-12 d-flex justify-content-center align-content-center'>
        <List className='d-flex flex-column col-12 col-sm-11 col-xl-10'>
          {searchResult.map((element, index) => (
            <ListItem
              className='col-12 py-2 px-1'
              key={`search_${index}`}
              sx={{
                borderTop: index === 0 ? '2px solid #493f35' : '1px solid #493f35',
                borderLeft: '2px solid #493f35',
                borderRight: '2px solid #493f35',
                borderBottom: index === searchResult.length - 1 ? '2px solid #493f35' : '1px solid #493f35',
                borderTopLeftRadius: index === 0 && '15px',
                borderTopRightRadius: index === 0 && '15px',
                borderBottomLeftRadius: index === searchResult.length - 1 && '15px',
                borderBottomRightRadius: index === searchResult.length - 1 && '15px',
                backgroundColor: `${index === props.selectedListIndex ? '#493f35' : 'white'}`
              }}
            >
              <Grid container direction='row' alignItems='center'>
                <Grid item className='col-1 pe-5 pe-md-0'>
                  <Avatar
                    alt={`${element.name}-logo`}
                    src={`${process.env.PUBLIC_URL}/assets/images/allianz-logo.jpeg`}
                    sx={{
                      width: {
                        xs: '1.8rem',
                        sm: '2rem',
                        md: '2.3rem'
                      },
                      height: {
                        xs: '1.8rem',
                        sm: '2rem',
                        md: '2.3rem'
                      },
                    }}
                  />
                </Grid>

                <Grid item className='d-flex flex-column flex-xl-row flex-grow-xl-1 col-7 col-sm-7 col-md-9 pe-3'>
                  <Typography
                    className='col-12 col-sm-10 col-md-9 col-xl-9 me-md-5'
                    noWrap
                    fontSize={{
                      lg: 16,
                      md: 15,
                      xs: 14
                    }}
                  >
                    {element.name}
                  </Typography>

                  <Typography
                    className='fw-bold ms-xl-3'
                    color='#493f35'
                    fontSize={{
                      lg: 16,
                      md: 15,
                      xs: 14
                    }}
                  >
                    {element.assetType}
                  </Typography>
                </Grid>

                <Grid item className='d-flex flex-row flex-grow-1 justify-content-end'>
                  <Avatar
                    className='ms-4 ms-sm-0 ms-md-0'
                    sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                  >
                    <DoneIcon sx={{color: 'green', fontSize: '20px'}} />
                  </Avatar>
                  <ListItemButton
                    className='p-0 ms-3 flex-grow-0 justify-content-end'
                    onClick={() => {
                      setAddToWatchlistModal(true);
                      setSearchResultIndex(index);
                    }}
                  >
                    <Avatar
                      sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                    >
                      <BookmarkBorderIcon className='p-1' sx={{color: '#493f35', fontSize: '25px'}} />
                    </Avatar>
                  </ListItemButton>
                  <ListItemButton
                    className='p-0 ms-3 flex-grow-0 justify-content-end'
                    onClick={() => {}}
                  >
                    <Avatar
                      className='me-2'
                      sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                    >
                      <AddIcon sx={{color: '#493f35', fontSize: '20px'}} />
                    </Avatar>
                  </ListItemButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}

          <Button
            className='mt-4'
            variant='outlined'
            onClick={() => {
              setSearchResult([]);
              setSearchQuery('')
            }}
            sx={{
              color: 'white',
              width: '5rem',
              backgroundColor: '#493f35',
              '&:hover': {
                backgroundColor: '#493f35',
              }
            }}
          >
            Close
          </Button>
        </List>
      </Grid> :
      <React.Fragment>
        <Grid item className='col-12 col-lg-3'>
          <WatchLists
            watchListsArray={props.watchListsArray}
            setWatchListsArray={props.setWatchListsArray}
            assetsListArray={props.assetsListArray}
            setAssetsListArray={props.setAssetsListArray}
            selectedListIndex={selectedListIndex}
            setSelectedListIndex={setSelectedListIndex}
          />
        </Grid>
        <Grid item className='col-12 col-lg-9 pt-0'>
          <AssetsList
            watchListsArray={props.watchListsArray}
            selectedListIndex={selectedListIndex}
            assetsListArray={props.assetsListArray}
            setAssetsListArray={props.setAssetsListArray}
          />
        </Grid>
      </React.Fragment>
      }
    </Grid>
  );

  const handleChange = (event) => {
    if (props.watchListsArray.includes(event.target.value)) {
      const index = props.watchListsArray.map(item => item).indexOf(event.target.value);
      setSelectedListIndex(index);
      //console.log("index of the selection = ", index);
    }
  };

  const addAssetToWatchlist = async () => {
    const symbol = searchResult[searchResultIndex].symbol;
    try {
      return await fetch(`http://localhost:3001/getShareForWatchlist?symbol=${symbol}`, {mode:'cors'})
        .then(response => response.json())
        .then(data => {
          props.setAssetsListArray(prevAssetsListArray => {
            const assetsListArray = [...prevAssetsListArray];
            assetsListArray[selectedListIndex] = [
              ...assetsListArray[selectedListIndex],
              {
                name: data.name,
                price: `${data.value}$`,
                change: `${data.percentChange}%`
              }
            ];
            return assetsListArray;
          })
          setSearchResult([]);
          setAddToWatchlistModal(false);
        });
    }
    catch (e) {
      console.log('fetching failed === ', e);
    }
  };

  const renderAddToWatchlistModal = () => (
    <CustomModal
      open={addToWatchlistModal}
      handleClose={() => setAddToWatchlistModal(false)}
      labelledby='add_to_watchlist-modal-title'
      describedby='add_to_watchlist-modal-description'
      modalTitle='Add to watchlist:'
      modalBody={() => (
        <FormControl
          className='pb-3'
        >
          <InputLabel id='select_watchlist' className='d-flex'>Watchlist</InputLabel>
          <Select
            className='py-0'
            label='Watchlist'
            labelId='select_watchlist'
            value={props.watchListsArray.length > 0 ? props.watchListsArray[selectedListIndex] : 'Select watchlist'}
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
                  color: 'white',
                  backgroundColor: '#493f35'
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
          </Select>
        </FormControl>
      )}
      modalButton={() => (
        <Button
          variant='outlined'
          onClick={() => addAssetToWatchlist()}
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

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={2}
      />
      {renderAddToWatchlistModal()}
    </React.Fragment>

  );
}

ScreensTemplate.propTypes = {
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  assetsListArray: PropTypes.array,
  setAssetsListArray: PropTypes.func,
};

export default WatchListsScreen;