import React, {useState} from 'react';
import {List, MenuItem, styled, TextField} from '@mui/material';

import AnalysisDetailItem from './AnalysisDetailItem';
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
 * Component to render the selected portfolio allocation list
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AnalysisList = (props) => {

  const handleChange = (event) => {
    props.setAnalysisType(event.target.value);
  };

  const analysisType = props.analysisType;

  return (
    <List>
      <StyledTextField
        fullWidth
        margin='normal'
        select
        label='Type of analysis'
        name='analysisType'
        onChange={handleChange}
        value={analysisType}
      >
        {props.analysisTypes.map((type, index) => {
          if(props.allArrays[index].length > 0){
            return (<MenuItem key={index} value={index}>{type}</MenuItem>);
          }    
        })
        
        }
      </StyledTextField>

      { 
        props.allArrays[analysisType] && props.allArrays[analysisType].map((share, index) => (
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
  analysisType: PropTypes.number,
  setAnalysisType: PropTypes.func,
  analysisTypes: PropTypes.array
};

export default AnalysisList;
