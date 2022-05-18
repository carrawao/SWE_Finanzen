import React, {useState} from 'react';
import {
  Container,
  Box,
  List,
  Typography
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
  const [, setListDropdownIndex] = useState(0);
  const colorsArray = [{
    'buy': ['blue', 'rgb(59, 151, 210, .2)'],
    'deposit': ['green', 'rgb(78, 185, 111, .2)'],
    'sell': ['brown', 'rgb(228, 126, 37, .2)'],
    'dividend': ['grey', 'rgb(239, 195, 21, .2)'],
    'payout': ['brown', 'rgb(241, 155, 31, .2)'],
  }];

  const findYears = activities => {
    let yearsArray = [];
    for (let index = 0; index < activities.length; index++) {
      const activity = activities[index];
      const activityYear = activity.date.slice(0, 4);
      let alreadyIncluded = false;
      for (let i = 0; i < yearsArray.length; i++) {
        const year = yearsArray[i];
        if (year === activityYear) {
          alreadyIncluded = true;
        }
      }
      if (!alreadyIncluded) {
        yearsArray.push(activityYear);
      }
    }
    return yearsArray;
  }

  const findActivitiesForYears = (years, activities) => {
    let activitiesForEachYearArray = [];
    for (let index = 0; index < years.length; index++) {
      const year = years[index];
      const activitiesForYear = []
      for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        const activityYear = activity.date.slice(0, 4);
        if (year === activityYear) {
          activitiesForYear.push(activity);
        }
      }
      activitiesForEachYearArray.push(activitiesForYear);
    }
    return activitiesForEachYearArray;
  }

  const activities = props.portfolioData[props.activePortfolio]['activities'];
  
  const years = findYears(activities);

  const activitiesForEachYearArray = findActivitiesForYears(years, activities);

  return (
    <Container className='p-0'>
      {years.map((year, index) => (
      <Container className='p-0' key={`activitiesList_${year}`}>
        <Box className='d-flex flex-row justify-content-between align-items-start'>
          <Typography variant='h4' sx={{margin: '1rem', marginBottom: '0rem'}}>
            {year}
          </Typography>
          <Box className='d-none d-md-flex'>
            <Typography variant='h6' sx={{margin: '1rem', marginBottom: '0rem'}}> 
              {activitiesForEachYearArray[index].length} total ·&nbsp; 
              {activitiesForEachYearArray[index].filter(activity => activity.type === 'buy').length} buys ·&nbsp; 
              {activitiesForEachYearArray[index].filter(activity => activity.type === 'sell').length} sells ·&nbsp;
              {activitiesForEachYearArray[index].filter(activity => activity.type === 'dividend').length} dividends ·&nbsp; 
              {activitiesForEachYearArray[index].filter(activity => activity.type === 'deposit').length} deposits ·&nbsp; 
              {activitiesForEachYearArray[index].filter(activity => activity.type === 'payout').length} payouts 
            </Typography>
          </Box>
        </Box>
        <Box>
          <List className='d-flex flex-column'>
            {activitiesForEachYearArray[index].map((element, i) => (
              <AssetDetailItem
                key={`activity_${element.id}`}
                activities
                row={element}
                index={i}
                itemsArray={activitiesForEachYearArray[index]}
                colorsArray={colorsArray}
                selectedListIndex={0}
                setListDropdownIndex={setListDropdownIndex}
                menuOptions={['Delete']}
                iconOptions={[<DeleteIcon/>]}
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
      ))}
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