import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Modal,
  Container,
  Typography, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Drawer navigation menu throughout the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CustomModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby={props.labelledby}
    >
      <Box sx={props.size === "big" ? {...bigStyle} : {...normalStyle}}>
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
            <CloseIcon style={{color: '#493f35'}}/>
          </IconButton>
        </Container>

        {props.modalBody ? props.modalBody() : null}
        {props.modalButton()}
      </Box>
    </Modal>
  );
}

const normalStyle = {
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
  border: '2px solid #000',
  boxShadow: 24,
  padding: '1.5rem'
};

const bigStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90vw',
    sm: '75vw',
    md: '60vw',
    lg: '50vw'
  },
  minHeight: '80vh',
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
  size: PropTypes.string,
};

export default CustomModal;