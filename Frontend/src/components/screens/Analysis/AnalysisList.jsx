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
    const portfolioData = props.portfolioData[props.activePortfolio];

    const [value, setValue] = useState('0');

    const handleChange = event => {
        setValue(event.target.value);
    };
   
    const calculateStockSplit = keyword => {
        let value;
        let stockArray = [];

        if(keyword === 'shares'){
            value = 825;
        } else if (keyword === 'crypto'){
            value = 106.5
        }

        portfolioData[keyword].forEach(element => {
            const percentage = element.value / value * 100;

            stockArray.push({
                asset: element.name,
                percentage: percentage.toFixed(2)
            })
        });

        //console.log(stockArray)
        return orderArray(stockArray)
    }

    const calculateKeywordSplit = (keyword, typSplit) => {
        if(typSplit){
            var value =  835 + 106.5;
        } else {
            var value = 825;
        }
       
        let sectorArray = [];

        portfolioData.shares.forEach(element => {
            if( sectorArray.some(row => row.includes(element.analysisInfo[keyword])) ){
                sectorArray.forEach(arrayElement => {
                    if (arrayElement[0] === element.analysisInfo[keyword]){
                        arrayElement[1] = parseFloat(arrayElement[1]);
                        arrayElement[1] += parseFloat(element.value)
                    }
                })
            } else {
                sectorArray.push([element.analysisInfo[keyword], parseFloat(element.value)])
            }
        });

        let stockArray = [];
        sectorArray.forEach(sector => {
            const percentage = sector[1] / value * 100;

            stockArray.push({
                asset: sector[0],
                percentage: percentage.toFixed(2)
            })
        });

        if(typSplit){
            const percentage = 106.5 / value * 100;

            stockArray.push({
                asset: 'Crypto',
                percentage: percentage.toFixed(2)
            })
        }

        //console.log(sectorArray)

        return orderArray(stockArray)
    }

    const getPiechartData = splitArray => {
        let labelArray = [];
        let dataArray = [];

        splitArray.forEach(arrayElement => {
            labelArray.push(arrayElement.asset)
            dataArray.push(arrayElement.percantage)
        });

        return {
            'label' : labelArray,
            'data' : dataArray
        }
    }

    const orderArray = splitArray => {
        function compare(a, b) {
            if ( a.percantage< b.percantage){
              return 1;
            }
            if ( a.percantage > b.percantage ){
              return -1;
            }
            return 0;
        }
       
        return splitArray.sort( compare );
    }

    const keywordCollection = ['sub_region', 'country', 'region', 'sector', 'assetClass', 'branche'];

    let allArrays = [];

    allArrays.push(calculateStockSplit('shares'));
    allArrays.push(calculateStockSplit('crypto'));

    keywordCollection.forEach(keyword => {
        allArrays.push(calculateKeywordSplit(keyword, false));
    });

    allArrays.push(calculateKeywordSplit('typ', true));

    var valueSelect = value

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
                <MenuItem value={2}>{keywordCollection[0]}</MenuItem>
                <MenuItem value={3}>{keywordCollection[1]}</MenuItem>
                <MenuItem value={4}>{keywordCollection[2]}</MenuItem>
                <MenuItem value={5}>{keywordCollection[3]}</MenuItem>
                <MenuItem value={6}>{keywordCollection[4]}</MenuItem>
                <MenuItem value={7}>{keywordCollection[5]}</MenuItem>
                <MenuItem value={8}>Typ</MenuItem>
            </StyledTextField>

            {
                props.allArrays[value].map((share, index) => (
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
    asset: PropTypes.string,
    percentage: PropTypes.string,
};

export default AnalysisList;
