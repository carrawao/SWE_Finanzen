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
      'Your data from your activities are visualized here, so at a glance you get all the important info about your portfolio!'
    ],
    'watchlists': [
      'rgb(59 151 210)',
      '/watchlists',
      `${process.env.PUBLIC_URL}/assets/images/watchlist.png`,
      'Watchlists',
      'Save your favorite shares and crypto to always have an overview of the course. This way you can decide in a flash if it is time to buy or sell!'
    ],
    'activities': [
      'rgb(228 126 37)',
      '/activities',
      `${process.env.PUBLIC_URL}/assets/images/activities.png`,
      'Activities',
      'Add new purchases, sales, and dividend distributions to your activities to get an overview of previous payments!'
    ],
    'analysis': [
      'rgb(241 155 31)',
      '/activities',
      `${process.env.PUBLIC_URL}/assets/images/activities.png`,
      'Analysis',
      'If you want to get a deeper insight into your portfolio, you are at the right place. You can have your assets broken down by different criteria to get a feeling about the distribution of your portfolio!'
    ],
    'benchi': [
      'rgb(59 151 210)',
      '/activities',
      `${process.env.PUBLIC_URL}/assets/images/activities.png`,
      'Benchi',
      'Do you want to take a new direction or are you still unsure what the perfect investment strategy for you looks like? Let our analysis bot Benchi advice you free of charge and find out what suits you best!'
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