import React from 'react';
import {Typography, Container} from '@mui/material';

const AGB = () => (
  <Container className='d-flex flex-column col-12 mx-0 px-3 pt-4 justify-content-start'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
      alt='Application logo'
      width='50%'
    />

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      AGB
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3'>
      tesuign
    </Typography>
  </Container>
);

export default AGB;