import React, {useState} from 'react';
import {List, MenuItem, styled, TextField} from '@mui/material';

import AnalysisDetailItem from './AnalysisDetailitem';
import PropTypes from 'prop-types';

const StyledTextField = styled(TextField)({
  //Label color when focused
  '& label.Mui-focused': {
    color: '#493f35',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#493f35',
  },
  '& .MuiOutlinedInput-root': {
    //Standard border color
    '& fieldset': {
      borderColor: '#c4b8ac',
    },
    //Border color on hover
    '&:hover fieldset': {
      borderColor: '#493f35',
    },
    //Border color when focused
    '&.Mui-focused fieldset': {
      borderColor: '#493f35',
    },
  },
});

/**
 * Component to render the list of all the assets for analysis
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AnalysisList = props => {
  const [value, setValue] = useState('0');

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <List>
      <StyledTextField
        fullWidth
        margin='normal'
        select
        label='Type of analysis'
        name='assetType'
        onChange={handleChange}
        value={value}
      >
        <MenuItem value={0}>Stock</MenuItem>
        <MenuItem value={1}>Crypto</MenuItem>
        <MenuItem value={2}>{props.keywordCollection[0]}</MenuItem>
        <MenuItem value={3}>{props.keywordCollection[1]}</MenuItem>
        <MenuItem value={4}>{props.keywordCollection[2]}</MenuItem>
        <MenuItem value={5}>{props.keywordCollection[3]}</MenuItem>
        <MenuItem value={6}>{props.keywordCollection[4]}</MenuItem>
        <MenuItem value={7}>{props.keywordCollection[5]}</MenuItem>
        <MenuItem value={8}>Typ</MenuItem>
      </StyledTextField>

      {
        props.allArrays[value] && props.allArrays[value].map((share, index) => (
          <AnalysisDetailItem
            key={`activity_${index}`}
            asset={share.asset}
            percentage={share.percentage}
          />
        ))
      }
    </List>
  );
}

AnalysisList.propTypes = {
  allArrays: PropTypes.array,
  keywordCollection: PropTypes.array
};

export default AnalysisList;
