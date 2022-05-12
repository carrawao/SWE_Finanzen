import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {AppBar, Box, CssBaseline, Grid, Toolbar, Alert} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import {SideNavLeft, Footer, SearchField} from './common/index';
import SearchResultsTable from './common/SearchResultsTable';

const drawerWidth = 14; // This is the value in rem units, for responsiveness
/**
 * Drawer navigation menu throughout the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ScreensTemplate = props => {
  const location = useLocation()
  const [openInMobile, setOpenInMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Resetting the search when changing routes
  useEffect(() => {
    props.setSearchResult([]);
    setSearchQuery('');
    if (props.statusMessage !== '') {
      showStatusMessage(props.messageType, props.statusMessage)
      setTimeout(() => {
        props.setStatusMessage(undefined);
        props.setMessageType(undefined);
      }, 3000)
    }
  }, [location, props.statusMessage]);

  // Shows and hides the drawer navigation menu
  const handleDrawerToggle = () => {
    setOpenInMobile(!openInMobile);
  };

  /**
   * Renders status messages of different actions for a few seconds
   * @param type
   * @param message
   * @returns {JSX.Element}
   */
  const showStatusMessage = (type, message) => (
    <Box
      className='d-flex flex-grow-1 justify-content-center'
      sx={{
        position: 'fixed',
        zIndex: 1000,
        bottom: {
          xs: 80,
          md: 70
        },
        right: {
          xs: 0,
          lg: `${drawerWidth}rem`
        },
        left: {
          xs: 0,
          lg: `calc(2 * ${drawerWidth}rem)`
        }
      }}
    >
      <Alert className='col-10 col-xl-7 text-center' variant='filled' severity={type}>
        {message}
      </Alert>
    </Box>
  );

  return (
    <Box className='d-flex' sx={{position: 'relative', minHeight: '100vh'}}>
      <CssBaseline/>
      <AppBar
        className='position-fixed bg-white'
        elevation={0}
        sx={{
          width: {lg: `calc(100% - ${drawerWidth}rem)`},
          marginLeft: {lg: `${drawerWidth}rem`},
        }}
      >
        <Toolbar className='px-3'>
          <IconButton
            aria-label='open drawer'
            size='medium'
            onClick={handleDrawerToggle}
            sx={{
              display: {lg: 'none'},
              color: '#493f35',
              border: '1px solid #493f35',
              borderRadius: 0,
              padding: '0.1rem 0.1rem',
              marginRight: '1rem'
            }}
          >
            <MenuIcon/>
          </IconButton>

          <SearchField
            searchQuery={searchQuery}
            onQueryChange={props.setSearchResult}
            setStatusMessage={props.setStatusMessage}
            setMessageType={props.setMessageType}
          />
        </Toolbar>
      </AppBar>

      <SideNavLeft
        openInMobile={openInMobile}
        setOpenInMobile={setOpenInMobile}
        selectedNavLinkIndex={props.selectedNavLinkIndex}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          padding: '1rem',
          paddingBottom: '6rem',
          width: {
            lg: `calc(100% - ${drawerWidth}rem)`
          },
          maxWidth: '100%'
        }}
      >
        <Toolbar style={{minHeight: '3rem'}}/>
        <Box>
          {props.searchResult && props.searchResult.length > 0 ?
            <Grid className='justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
              <SearchResultsTable
                searchResult={props.searchResult}
                watchListsArray={props.watchListsArray}
                selectedListIndex={props.selectedListIndex}
                assetsListArray={props.assetsListArray}
                addToWatchList={props.addToWatchList}
                onClose={() => {
                  props.setSearchResult([]);
                  setSearchQuery('');
                }}
              />
            </Grid>
            :
            props.bodyComponent()}
        </Box>
        {props.messageType !== undefined && props.statusMessage !== undefined && showStatusMessage(props.messageType, props.statusMessage)}
      </Box>
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: {
          xs: '100%',
          lg: `calc(100% - ${drawerWidth}rem)`
        }
      }}>
        <Footer/>
      </Box>
    </Box>
  );
}

ScreensTemplate.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  bodyComponent: PropTypes.func,
  selectedNavLinkIndex: PropTypes.number,
  addToWatchList: PropTypes.func,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array,
  statusMessage: PropTypes.string,
  setStatusMessage: PropTypes.func,
  messageType: PropTypes.string,
  setMessageType: PropTypes.func
};

export default ScreensTemplate;