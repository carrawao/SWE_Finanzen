import React from 'react';
import {Typography, Container, List, ListItem} from '@mui/material';
import {Link} from 'react-router-dom';

const ErrorPage = () => (
  <Container className='d-flex flex-column col-12 mx-0 px-3 pt-4 justify-content-start'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
      alt='Application logo'
      width='50%'
    />

    <Typography variant='h2' className='pt-4 ps-3 fw-bold'>
      Error 404
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      Sorry we can't find that page!

      
    </Typography>
    
    <Typography variant='h7' className='pt-4 ps-3'>
      <Link className='text-decoration-none text-black' to='/' target='_blank'>Click here to go back!</Link>
    </Typography>
  </Container>
);

export default ErrorPage;