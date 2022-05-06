import React, {useState, select} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid,
        Button,
        List,
        ListItem
    } from '@mui/material';
import { Typography, TextField, MenuItem, styled } from '@mui/material/';

import AnalysisDetailItem from './AnalysisDetailitem';


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
   
    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    var valueSelect = value

    return (
       
        <List>
           
            <StyledTextField
                    fullWidth
                    margin="normal"
                    select
                    label="Type of analysis"
                    name="assetType"
                    onChange = {handleChange}
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
            
            props.allArrays[valueSelect].map((share, index) => ( 
                <AnalysisDetailItem props={share}
                    key={`activity_${index}`}
                ></AnalysisDetailItem>
            )) 
            
        }</List>

    );
}

export default AnalysisList;