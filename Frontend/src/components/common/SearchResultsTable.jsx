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
    <Grid item className='d-flex flex-column justify-content-center align-items-center flex-lg-grow-1 px-xl-5'>
      <List className='d-flex flex-column col-12 col-sm-11 col-md-10 col-lg-9 col-xl-11'>
        {props.searchResult.map((element, index) => {
          let isAssetInWatchList = checkAssetInWatchLists(element);
          return (
            <ListItem
              className='col-12 py-2 px-1'
              key={`search_${index}`}
              sx={{
                borderTop: index === 0 ? '2px solid #493f35' : '1px solid #493f35',
                borderLeft: '2px solid #493f35',
                borderRight: '2px solid #493f35',
                borderBottom: index === props.searchResult.length - 1 ? '2px solid #493f35' : '1px solid #493f35',
                borderTopLeftRadius: index === 0 && '15px',
                borderTopRightRadius: index === 0 && '15px',
                borderBottomLeftRadius: index === props.searchResult.length - 1 && '15px',
                borderBottomRightRadius: index === props.searchResult.length - 1 && '15px',
                backgroundColor: `${index === props.selectedListIndex ? '#493f35' : 'white'}`
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

                <Grid item className='d-flex flex-column flex-xl-row col-6 col-sm-8 pe-sm-3 ps-lg-0'>
                  <Typography
                    className='col-12 col-xl-9 me-md-5'
                    noWrap
                    fontSize={{
                      lg: 16,
                      md: 15,
                      xs: 14
                    }}
                  >
                    {element.name ? element.name : element.symbol}
                  </Typography>

                  <Typography
                    className='fw-bold ms-xl-3 col-lg-6'
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
          backgroundColor: '#493f35',
          '&:hover': {
            backgroundColor: '#493f35',
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