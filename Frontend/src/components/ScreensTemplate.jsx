import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import SideNavLeft from './common/SideNavLeft';

const drawerWidth = 14; // This is the value in rem units, for responsiveness
/**
 * Drawer navigation menu throughout the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ScreensTemplate = (props) => {
  const [openInMobile, setOpenInMobile] = useState(false);

  const handleDrawerToggle = () => {
    setOpenInMobile(!openInMobile);
  };

  return (
    <Box className='d-flex w-100'>
      <CssBaseline/>
      <AppBar
        className='position-fixed bg-white'
        elevation={0}
        sx={{
          width: {lg: `calc(100% - ${drawerWidth}rem)`},
          marginLeft: {lg: `${drawerWidth}rem`},
        }}
      >
        <Toolbar>
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

          {props.headerComponent && props.headerComponent()}
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
          width: {
            lg: `calc(100% - ${drawerWidth}rem)`
          },
          maxWidth: '100%'
        }}
      >
        <Toolbar style={{minHeight: '3rem'}}/>
        {props.bodyComponent()}
      </Box>
    </Box>
  );
}

ScreensTemplate.propTypes = {
  headerComponent: PropTypes.func,
  bodyComponent: PropTypes.func,
  selectedNavLinkIndex: PropTypes.number
};

export default ScreensTemplate;