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
      Angaben gemäß § 5 TMG:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
    Bench:market
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Postanschrift:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Musterweg <br/>
      12345 Musterstadt
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Kontakt
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Telefon: 01234-789456 <br/>
      Telefax: 1234-56789 <br/>
      E-Mail: max@muster.de
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Vertreten durch:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Ma Mustermann
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Eingetragen:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      Musteraufsicht Musterstadt <br/>
      1234514512
    </Typography>


    <Typography variant='h5' className='pt-4 ps-3 fw-bold'>
      Hinweise zur Website
    </Typography>

    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Urheberrechtliche Hinweise:
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
      <a href='https://app.currencyapi.com/dashboard'>https://app.currencyapi.com/dashboard</a> <br/>
      <a href='https://www.alphavantage.co'>https://www.alphavantage.co</a>
    </Typography> 

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      Infromation gemäß § 36 VSBG
    </Typography>

    <Typography variant='h7' className='pt-4 ps-3'>
    gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz – Gesetz über die alternative Streitbeilegung in Verbrauchersachen) erklärt der Betreiber dieser Website: <br/>
    Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
    </Typography>

  </Container>
);

export default Impressum;