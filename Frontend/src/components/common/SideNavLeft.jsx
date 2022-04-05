import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 14; // This is the value in rem units, for responsiveness
const routesArray = [
  {routeName: 'Home', path: '/', icon: <HomeIcon/>},
  {routeName: 'Dashboard', path: '/dashboard', icon: <AutoGraphIcon/>},
  {routeName: 'Watchlists', path: '/watchlists', icon: <ShutterSpeedIcon/>},
  {routeName: 'Settings', path: '/settings', icon: <SettingsIcon/>},
];

/**
 * Drawer navigation menu throughout the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SideNavLeft = (props) => {
  const {window} = props;

  const handleNavLinkClick = () => {
    props.setOpenInMobile(false)
  };

  const drawer = (routesArray) => (
    <Container className='px-3'>
      <List className='px-0'>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/swe-finance-logo.png`}
          alt='Application logo'
          width={50}
          height={50}
        />
        <h3 className='text-white mt-4'>Portfolio</h3>
        {routesArray.map((element, index) => (
          <Link
            to={element.path}
            key={element.routeName}
            onClick={() => handleNavLinkClick()}
            style={{textDecoration: 'none'}}
          >
            <ListItem
              button
              className='ps-2'
              sx={{
                backgroundColor: `${props.selectedNavLinkIndex === index ? 'white' : '#493f35'}`,
                '&:hover': {
                  backgroundColor: `${props.selectedNavLinkIndex === index ? 'white' : '#e47e25'}`
                }
              }}
            >
              <ListItemIcon
                className='fw-bold'
                sx={{
                  color: `${props.selectedNavLinkIndex === index ? '#493f35' : 'white'}`,
                  minWidth: '2rem'
                }}
              >
                {element.icon}
              </ListItemIcon>
              <ListItemText
                className='text-start'
                primary={element.routeName}
                sx={{
                  color: `${props.selectedNavLinkIndex === index ? '#493f35' : 'white'}`
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Container>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component='nav'
      sx={{
        width: {lg: `${drawerWidth}rem`},
        flexShrink: {lg: 0},
        '& .MuiDrawer-paper': {backgroundColor: '#493f35'}
      }}
      aria-label='navigation-menu'
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.openInMobile}
        onClose={props.handleDrawerToggle}
        transitionDuration={500}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {xs: 'block', lg: 'none'},
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: `${drawerWidth}rem`,
            backgroundColor: '#493f35'
          }
        }}
      >
        {drawer(routesArray)}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: {xs: 'none', lg: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: `${drawerWidth}rem`},
        }}
        open
      >
        {drawer(routesArray)}
      </Drawer>
    </Box>
  );
}

SideNavLeft.propTypes = {
  window: PropTypes.func,
  openInMobile: PropTypes.bool,
  setOpenInMobile: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
  selectedNavLinkIndex: PropTypes.number
};

export default SideNavLeft;