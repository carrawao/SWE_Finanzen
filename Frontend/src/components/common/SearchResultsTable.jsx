import React from 'react';
import {Avatar, Button, Grid, List, ListItem, ListItemButton, Typography} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const SearchResultsTable = (props) => {
  /**
   * Checks whether asset is already in watchlist
   * @param asset
   * @returns {boolean}
   */
  const checkAssetInWatchLists = asset => {
    let isAssetInWatchList = false
    props.assetsListArray.forEach(innerArray => {
      innerArray.forEach(assetInWatchList => {
        if (assetInWatchList.name === asset.name || assetInWatchList.name === asset.symbol) {
          isAssetInWatchList = true;
        }
      });
    });
    return isAssetInWatchList;
  }

  return (
    <Grid item className='d-flex flex-column justify-content-center align-items-center flex-grow-1 px-xl-5'>
      <List className={`d-flex flex-column ${props.watchListsArray.length > 0 ? 'col-12 col-sm-10 col-lg-9 col-xl-11' : 'col-12 col-sm-11 col-md-10 col-lg-11 col-xl-9'}`}>
        {props.searchResult.map((element, index) => {
          let isAssetInWatchList = checkAssetInWatchLists(element);
          return (
            <ListItem
              className='col-12 py-2 px-1'
              key={`search_${index}`}
              sx={{
                borderTop: '1px lightgrey',
                borderLeft: '4px solid rgb(0, 0, 0, .1)',
                borderRight: '4px solid rgb(0, 0, 0, .1)',
                borderBottom: '1px solid lightgrey',
                borderTopLeftRadius: index === 0 && '15px',
                borderTopRightRadius: index === 0 && '15px',
                borderBottomLeftRadius: index === props.searchResult.length - 1 && '15px',
                borderBottomRightRadius: index === props.searchResult.length - 1 && '15px',
                backgroundColor: `${index === props.selectedListIndex ? '#493f35' : 'white'}`,
                boxShadow: index === 0 ?
                  'rgb(0 0 0 / 15%) 0px -6px 6px -6px' :
                  index === props.searchResult.length - 1 ?
                    '0 6px 6px -6px rgb(0 0 0 / 30%)' : '',
              }}
            >
              <Grid container direction='row' alignItems='center'>
                <Grid item className='pe-3'>
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

                <Grid
                  item
                  className={`d-flex flex-column ${props.watchListsArray.length > 0 ? 'flex-xl-row flex-grow-1 col-1 pe-4' : 'col-9 col-sm-10'}`}>
                  <Typography
                    noWrap
                    className='col-xl-8'
                    fontSize={{
                      lg: 16,
                      md: 15,
                      xs: 14
                    }}
                  >
                    {element.name ? element.name : element.symbol}
                  </Typography>

                  <Typography
                    className={`fw-bold ${props.watchListsArray.length > 0 && 'ms-xl-3 text-xl-center'} col-lg-4`}
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

                {props.watchListsArray.length > 0 &&
                  <Grid item className='d-flex flex-row justify-content-end'>
                    <Avatar
                      className='ms-0'
                      sx={{
                        width: '1.4rem',
                        height: '1.4rem',
                        backgroundColor: 'white',
                        border: !isAssetInWatchList ? 'solid 2px white' : 'solid 2px #493f35'}}
                    >
                      {isAssetInWatchList && <DoneIcon sx={{color: 'green', fontSize: '20px'}}/>}
                    </Avatar>
                    <ListItemButton
                      className='p-0 ms-3 flex-grow-0 justify-content-end'
                      onClick={() => isAssetInWatchList ? {} : props.addToWatchList(index)}
                    >
                      <Avatar
                        sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                      >
                        {isAssetInWatchList ?
                          <BookmarkIcon className='p-1' sx={{color: '#493f35', fontSize: '25px'}}/> :
                          <BookmarkBorderIcon className='p-1' sx={{color: '#493f35', fontSize: '25px'}}/> }
                      </Avatar>
                    </ListItemButton>
                    <ListItemButton
                      className='p-0 ms-3 flex-grow-0 justify-content-end'
                      onClick={() => {
                      }}
                    >
                      <Avatar
                        className='me-2'
                        sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                      >
                        <AddIcon sx={{color: '#493f35', fontSize: '20px'}}/>
                      </Avatar>
                    </ListItemButton>
                  </Grid>
                }
              </Grid>
            </ListItem>
          )
        })}
      </List>
      <Button
        className='mt-4'
        variant='outlined'
        onClick={() => props.onClose()}
        sx={{
          color: 'white',
          width: '5rem',
          borderColor: 'rgb(228 126 37)',
          backgroundColor: 'rgb(228 126 37)',
          '&:hover': {
            backgroundColor: 'rgb(228 126 37)',
          }
        }}
      >
        Close
      </Button>
    </Grid>
  );
}

SearchResultsTable.propTypes = {
  searchResult: PropTypes.array,
  selectedListIndex: PropTypes.number,
  assetsListArray: PropTypes.array,
  addToWatchList: PropTypes.func,
  onClose: PropTypes.func
};

export default SearchResultsTable;