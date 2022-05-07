import React, {useState} from 'react';
import {
  Container,
  Box,
  List
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import {AssetDetailItem} from '../../common';

/**
 * Show all the activities
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ActivitiesList = (props) => {
  const [listDropdownIndex, setListDropdownIndex] = useState(0);
  const colorsArray = [{
    'buy': ['blue', 'rgb(59, 151, 210, .2)'],
    'deposit': ['green', 'rgb(78, 185, 111, .2)'],
    'sell': ['brown', 'rgb(228, 126, 37, .2)'],
    'dividend': ['grey', 'rgb(239, 195, 21, .2)'],
    'payout': ['brown', 'rgb(241, 155, 31, .2)']
  }];

  return (
    <Container className='p-0'>
      <Box>
        <List className='d-flex flex-column'>
          {props.portfolioData[props.activePortfolio]['activities'].map((element, index) => (
            <AssetDetailItem
              key={`activity_${index}`}
              activities
              row={element}
              index={index}
              itemsArray={props.portfolioData[props.activePortfolio]['activities']}
              colorsArray={colorsArray}
              selectedListIndex={0}
              setListDropdownIndex={setListDropdownIndex}
              menuOptions={['Delete']}
              iconOptions={[<DeleteIcon />]}
              functionOptions={[
                () => {
                  props.setDeleteActivityModal(true);
                  props.setSelectedActivityId(element.id);
                }
              ]}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
}

ActivitiesList.propTypes = {
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
  setPortfolioData: PropTypes.func,
  setDeleteActivityModal: PropTypes.func,
  setSelectedActivityId: PropTypes.func
};

export default ActivitiesList;