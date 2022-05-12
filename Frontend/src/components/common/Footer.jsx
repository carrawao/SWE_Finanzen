import React from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  Container,
  Divider
} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Component related to the footer of the app
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => (
  <footer
    style={{
      backgroundColor: '#f3f4f6',
      width: '100%'
    }}>
    <Box className='px-3 px-md-0 py-2 py-md-3 mt-5 d-md-flex flex-md-row justify-content-md-around'>
      <Box className='text-center pb-2 pb-md-0 col-md-3'>
        &copy; {new Date().getFullYear()} Bench:market
      </Box>
      <Container className='d-flex flex-row justify-content-between justify-content-md-evenly'>
        <Box>
          <Link className='text-decoration-none text-black' to='/about' target='_blank'>About us</Link>
        </Box>
        <Divider flexItem orientation='vertical' style={{height: 25}}/>
        <Box>
          <Link className='text-decoration-none text-black' to='/privacy' target='_blank'>Privacy</Link>
        </Box>
        <Divider flexItem orientation='vertical' style={{height: 25}}/>
        <Box>
          <Link className='text-decoration-none text-black' to='/agb' target='_blank'>AGB</Link>
        </Box>
        <Divider flexItem orientation='vertical' style={{height: 25}}/>
        <Box>
          <Link className='text-decoration-none text-black' to='/impressum' target='_blank'>Impressum</Link>
        </Box>
      </Container>
    </Box>
  </footer>
);

Footer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  labelledby: PropTypes.string,
  modalTitle: PropTypes.string,
  modalBody: PropTypes.func,
  modalButton: PropTypes.func,
};

export default Footer;