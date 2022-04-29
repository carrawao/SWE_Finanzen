import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Modal,
  Container,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Drawer navigation menu throughout the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CustomModal = props => (
  <Modal
    open={props.open}
    onClose={() => props.handleClose()}
    aria-labelledby={props.labelledby}
    className='p-0'
  >
    <Box sx={{...style}}>
      <Container
        className='d-flex justify-content-between px-0 align-self-center'
      >
        <Typography id={props.labelledby} variant='h6' component='h2' className='pb-3 mb-2'>
          {props.modalTitle}
        </Typography>
        <IconButton
          onClick={() => props.handleClose()}
          className='px-0 py-1 align-self-start'
        >
          <CloseIcon style={{color: 'rgb(228 126 37)'}}/>
        </IconButton>
      </Container>

      {props.modalBody ? props.modalBody() : null}
      {props.modalButton()}
    </Box>
  </Modal>
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '70vw',
    sm: '55vw',
    md: '40vw',
    lg: '30vw'
  },
  minHeight: '10vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'background.paper',
  border: '2px solid white',
  borderRadius: '0.5rem',
  boxShadow: 24,
  padding: '1.5rem'
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  labelledby: PropTypes.string,
  modalTitle: PropTypes.string,
  modalBody: PropTypes.func,
  modalButton: PropTypes.func,
};

export default CustomModal;