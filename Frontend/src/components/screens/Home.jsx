import React from 'react';
import {Link} from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material';

const Home = () => {
  const infoArray = {
    'dashboard': [
      'rgb(78 185 111)',
      '/',
      `${process.env.PUBLIC_URL}/assets/images/dashboard.jpeg`,
      'Dashboard',
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    ],
    'watchlists': [
      'rgb(59 151 210)',
      '/watchlists',
      `${process.env.PUBLIC_URL}/assets/images/watchlist.png`,
      'Watchlists',
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    ],
    'activities': [
      'rgb(228 126 37)',
      '/activities',
      `${process.env.PUBLIC_URL}/assets/images/activities.png`,
      'Activities',
      'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
    ]
  }

  const keys = Object.keys(infoArray);

  return (
    <Container>
      <Box className='d-flex flex-column mx-0 px-3 pt-4 align-items-center'>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
          alt='Application logo'
          width='70%'
          className='align-self-center'
        />
        {keys.map(key => (
          <Box key={`${infoArray[key][1]}`} className='mt-5 d-flex justify-content-center'>
            <Card
              className='col-10 col-md-12'
              sx={{
                backgroundColor: `${infoArray[key][0]}`,
                borderRadius: '1rem',
                border: '1px solid black'
              }}
            >
              <CardActionArea
                className='d-md-flex flex-row'
                component={Link}
                to={`${infoArray[key][1]}`}
                sx={{
                  '&.MuiCardActionArea-root': {
                    '&:hover': {
                      color: 'black'
                    }
                  },
                }}
              >
                <CardMedia
                  component='img'
                  image={infoArray[key][2]}
                  alt={`${infoArray[key][0]}_product`}
                  sx={{
                    width: {
                      sm: '100%',
                      md: '56%',
                      lg: '50%',
                      xl: '55%'
                    },
                    '&.MuiCardMedia-img': {
                      objectFit: 'fill'
                    }
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant='h4' component='div'>
                    {infoArray[key][3]}
                  </Typography>
                  <Typography variant='h6'>
                    {infoArray[key][4]}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Home;