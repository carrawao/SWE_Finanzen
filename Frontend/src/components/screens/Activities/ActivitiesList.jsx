import React, {useState} from 'react';
import {
  Container,
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Typography,
  Stack,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

/**
 * Show all the activities
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ActivitiesList = (props) => {

  return (
    <Container>
      <Box className='d-lg-flex'>
        <List>
          {props.portfolioData[props.activePortfolio]["activities"].map((element, index) => (
            <ListItem
              className='p-0 mb-3'
              key={index}
              sx={{
                border: '2px solid #493f35',
                backgroundColor: 'white'
              }}
            >
              <ListItemButton
                className='py-0'
                onClick={event => {}}
              >
                <ListItemText
                  className='text-start'
                  primary={element["type"] + " of: " + element["asset"] + ", index in Array: " + index}
                  sx={{color: '#493f35'}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

ActivitiesList.propTypes = {
  activePortfolio: PropTypes.array,
  portfolioData: PropTypes.array,
  setPortfolioData: PropTypes.func,
};

export default ActivitiesList;