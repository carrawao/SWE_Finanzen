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
                label='Type of allocation analysis'
                name='assetType'
                onChange={handleChange}
                value={value}
            >
                <MenuItem value={0}>Share Allocation</MenuItem>
                <MenuItem value={1}>Crypto Allocation</MenuItem>
                <MenuItem value={2}>Sub Region Allocation</MenuItem>
                <MenuItem value={3}>Country Allocation</MenuItem>
                <MenuItem value={4}>Region Allocation</MenuItem>
                <MenuItem value={5}>Sector Allocation</MenuItem>
                <MenuItem value={6}>Asset Class Allocation</MenuItem>
                <MenuItem value={7}>Industry Allocation</MenuItem>
                <MenuItem value={8}>Typ Allocation</MenuItem>
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
  allArrays: PropTypes.array
};

export default AnalysisList;
