import React from 'react';
import {Typography, Container, List, ListItem} from '@mui/material';

const AGB = () => (
  <Container className='d-flex flex-column col-12 mx-0 px-3 pt-4 justify-content-start'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
      alt='Application logo'
      width='50%'
    />

    <Typography variant='h2' className='pt-4 ps-3 fw-bold'>
      AGB
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      § 1 Area of Validity
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <List>
        <ListItem>
          1. These Terms and Conditions of Sale shall apply exclusively to entrepreneurs, legal entities under public
          law or special funds under public law within the meaning of § 310 (1) of the German Civil Code (BGB). We shall
          only recognize terms and conditions of the Purchaser that conflict with or deviate from our Terms and
          Conditions of Sale if we expressly agree to their validity in writing.
        </ListItem>
        <ListItem>
          2. These Terms and Conditions of Sale shall also apply to all future transactions with the Purchaser, insofar
          as legal transactions of a related nature are concerned (as a precaution, the Terms and Conditions of Sale
          should be attached to the order confirmation in any case).
        </ListItem>
        <ListItem>
          3. Individual agreements made with the Buyer in individual cases (including ancillary agreements, supplements
          and amendments) shall in any case take precedence over these Terms and Conditions of Sale. Subject to proof to
          the contrary, a written contract or our written confirmation shall be authoritative for the content of such
          agreements.
        </ListItem>
      </List>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      § 2 Offer and conclusion of contract
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        We reserve the property rights and copyrights to all documents provided to the purchaser in connection with the
        placing of the order - also in electronic form - such as calculations, drawings, etc.. These documents may not
        be made accessible to third parties unless we give our express written consent to do so. If we do not accept the
        orderer's offer within the period of § 2, these documents shall be returned to us without delay.
      </p>
    </Typography>
  </Container>
);

export default AGB;