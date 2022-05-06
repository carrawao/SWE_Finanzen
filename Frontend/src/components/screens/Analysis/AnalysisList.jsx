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
    const portfolioData = props.portfolioData[props.activePortfolio];
    console.log(portfolioData);

    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
      };
   
    const calculateStockSplit = (keyword) => {
        var value 
        var stockArray = []

        if(keyword == "shares"){
            value = 825;
        } else if (keyword == "crypto"){
            value = 106.5
        }

        portfolioData[keyword].forEach(element => {
            var percantage = element.value / value * 100;

            stockArray.push({
                asset: element.name,
                percantage: percantage.toFixed(2)
            })
        });

        //console.log(stockArray)
        return orderArray(stockArray)
    }

    const calculateKeywordSplit = (keyword, typSplit) => {
        if(typSplit == true){
            var value =  835 + 106.5;
        } else {
            var value = 825;
        }
       
        var sectorArray = []

        portfolioData.shares.forEach(element => {
            if( sectorArray.some(row => row.includes(element.analysisInfo[keyword])) ){

                sectorArray.forEach(arrayElement => {
                    if (arrayElement[0] == element.analysisInfo[keyword]){

                        arrayElement[1] = parseFloat(arrayElement[1]);
                        arrayElement[1] += parseFloat(element.value)
                    }
                    
                })
            } else {
                sectorArray.push([element.analysisInfo[keyword], parseFloat(element.value)])
            }

        });

        var stockArray = []

        sectorArray.forEach(sector => {
            var percantage = sector[1] / value * 100;

            stockArray.push({
                asset: sector[0],
                percantage: percantage.toFixed(2)
            })
        });

        if(typSplit == true){
            var percantage = 106.5 / value * 100;

            stockArray.push({
                asset: "Crypto",
                percantage: percantage.toFixed(2)
            })
        }

        //console.log(sectorArray)

        return orderArray(stockArray)
    }

    const getPiechartData = (splitArray) => {
        var labelArray = [];
        var dataArray = [];

        splitArray.forEach(arrayElement => {
            labelArray.push(arrayElement.asset)
            dataArray.push(arrayElement.percantage)
        });

        return {
            "label" : labelArray,
            "data" : dataArray
        }
    }

    const orderArray = (splitArray) => {
        function compare(a, b) {
            if ( a.percantage< b.percantage){
              return 1;
            }
            if ( a.percantage > b.percantage ){
              return -1;
            }
            return 0;
          }
          
        var sortetArray = splitArray.sort( compare );

        return sortetArray
    }
   

    var keywordCollection = ['sub_region', 'country', 'region', 'sector', "assetClass", "branche"]

    var allArrays = []

    allArrays.push(calculateStockSplit("shares"))
    allArrays.push(calculateStockSplit("crypto"))

    keywordCollection.forEach(keyword => {
        allArrays.push(calculateKeywordSplit(keyword, false))
    });

    allArrays.push(calculateKeywordSplit("typ", true))

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
                    <MenuItem value={2}>{keywordCollection[0]}</MenuItem>
                    <MenuItem value={3}>{keywordCollection[1]}</MenuItem>
                    <MenuItem value={4}>{keywordCollection[2]}</MenuItem>
                    <MenuItem value={5}>{keywordCollection[3]}</MenuItem>
                    <MenuItem value={6}>{keywordCollection[4]}</MenuItem>
                    <MenuItem value={7}>{keywordCollection[5]}</MenuItem>
                    <MenuItem value={8}>Typ</MenuItem>
     
                </StyledTextField>
           
            {
            
            [valallArraysueSelect].map((share, index) => ( 
                <AnalysisDetailItem props={share}
                    key={`activity_${index}`}
                ></AnalysisDetailItem>
            )) 
            
        }</List>

    );
}

export default AnalysisList;