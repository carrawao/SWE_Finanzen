import React, {useState} from 'react';
import {Grid, List, ListItem, Typography, Avatar, Button, ListItemButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

import WatchLists from './WatchLists';
import AssetsList from './AssetsList';
import ScreensTemplate from '../../ScreensTemplate';
import {SearchField} from '../../common';

/**
 * Component related to the watchLists page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const WatchListsScreen = (props) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

                <Grid item className='d-flex flex-column flex-xl-row flex-grow-xl-1 col-7 col-md-9 pe-3'>
                  <Typography
                    className='col-12 col-md-9 col-xl-9 me-md-5'
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
                    className='ms-4 ms-sm-5 ms-md-0'
                    sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                  >
                    <DoneIcon sx={{color: 'green', fontSize: '20px'}} />
                  </Avatar>
                  <ListItemButton className='p-0 ms-3 flex-grow-0 justify-content-end'>
                    <Avatar
                      sx={{width: '1.4rem', height: '1.4rem', backgroundColor: 'white', border: 'solid 2px #493f35'}}
                    >
                      <BookmarkBorderIcon className='p-1' sx={{color: '#493f35', fontSize: '25px'}} />
                    </Avatar>
                  </ListItemButton>
                  <ListItemButton className='p-0 ms-3 flex-grow-0 justify-content-end'>
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
            selectedListIndex={selectedListIndex}
            setSelectedListIndex={setSelectedListIndex}
          />
        </Grid>
        <Grid item className='col-12 col-lg-9 pt-0'>
          <AssetsList
            watchListsArray={props.watchListsArray}
            selectedListIndex={selectedListIndex}
          />
        </Grid>
      </React.Fragment>
      }
    </Grid>
  );

  return (
    <React.Fragment>
      <ScreensTemplate
        headerComponent={renderHeader}
        bodyComponent={renderBody}
        searchBar
        selectedNavLinkIndex={2}
      />
    </React.Fragment>

  );
}

ScreensTemplate.propTypes = {
  usePersistedState: PropTypes.func,
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
};

export default WatchListsScreen;