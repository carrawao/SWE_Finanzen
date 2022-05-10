import React from 'react';
import {Typography, Container} from '@mui/material';

const Impressum = () => (
  <Container className='d-flex flex-column col-12 mx-0 px-3 pt-4 justify-content-start'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
      alt='Application logo'
      width='70%'
    />

    <Typography variant='h2' className='pt-4 ps-3 fw-bold'>
      Impressum
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      Data according to § 5 TMG:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
    Bench:market
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
    Postal address:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Musterweg <br/>
      12345 Musterstadt
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Contact
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Telephone: 01234-789456 <br/>
      Telefax: 1234-56789 <br/>
      E-Mail: max@muster.de
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
    Represented by:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Max Mustermann
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Registered:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Musteraufsicht Musterstadt <br/>
      1234514512
    </Typography>


    <Typography variant='h5' className='pt-4 ps-3 fw-bold'>
    Website references
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
    Copyright notice:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      <a href='https://app.currencyapi.com/dashboard'>https://app.currencyapi.com/dashboard</a> <br/>
      <a href='https://www.alphavantage.co'>https://www.alphavantage.co</a>
    </Typography> 

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
    Information according to § 36 VSBG
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
    in accordance with § 36 VSBG (Consumer Dispute Settlement Act - Act on Alternative Dispute Resolution in Consumer Matters), the operator of this website declares:  <br/>
    We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.
    </Typography>

  </Container>
);

export default Impressum;