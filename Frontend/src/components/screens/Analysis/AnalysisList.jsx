import React, {useState, select} from 'react';
import {Grid,
        Button,
        List,
        ListItem,
        Typography, 
        TextField, 
        MenuItem, 
        styled
    } from '@mui/material';
import PropTypes from 'prop-types';
import AnalysisDetailItem from './AnalysisDetailItem';

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

const AnalysisList = (props) => {

    const handleChange = (event) => {
        props.setAnalysisType(event.target.value);
    };

    const analysisType = props.analysisType;

    return (
      <List>
          <StyledTextField
            fullWidth
            margin="normal"
            select
            label="Type of analysis"
            name="analysisType"
            onChange = {handleChange}
            value={analysisType}
          >
            {props.analysisTypes.map((type, index) => (
              <MenuItem key={index} value={index}>{type}</MenuItem>
            ))}
          </StyledTextField>
          
          {props.allArrays[analysisType].map((share, index) => ( 
              <AnalysisDetailItem props={share}
                  key={`activity_${index}`}
              />
          ))}
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