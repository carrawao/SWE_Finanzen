import React, {useState, select} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid,
        Button,
        List,
        ListItem
    } from '@mui/material';
import Typography from '@mui/material/Typography';

import AnalysisDetailItem from './AnalysisDetailitem';



const AnalysisList = (props) => {
    const portfolioData = props.portfolioData[props.activePortfolio];
    console.log(portfolioData);

    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
      };
   
    const calculateStockSplit = () => {
        var value = 825;
        var stockArray = []

        portfolioData.shares.forEach(element => {
            var percantage = element.value / value * 100;

            stockArray.push({
                asset: element.name,
                percantage: percantage.toFixed(2)
            })
        });

        //console.log(stockArray)
        return orderArray(stockArray)
    }

    const calculateSectorSplit = (selection) => {
        var value = 825;
        var sectorArray = []

        portfolioData.shares.forEach(element => {
            if( sectorArray.some(row => row.includes(element.analysisInfo[selection])) ){

                sectorArray.forEach(arrayElement => {
                    if (arrayElement[0] == element.analysisInfo[selection]){

                        arrayElement[1] = parseFloat(arrayElement[1]);
                        arrayElement[1] += parseFloat(element.value)
                    }
                    
                })
            } else {
                sectorArray.push([element.analysisInfo[selection], parseFloat(element.value)])
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
   
    calculateSectorSplit()
    var stockSplitArray = calculateStockSplit()
    var subRegionArray = calculateSectorSplit('sub_region')
    var countryArray = calculateSectorSplit('country')
    var regionArray = calculateSectorSplit('region')
    var sectorArray = calculateSectorSplit('sector')

    var allArrays = [stockSplitArray, subRegionArray, countryArray, regionArray, sectorArray]


    var valueSelect = value
    return (
       
        <List>
             <div>
                <label>
                    <select value={value} onChange={handleChange}>
                    <option value="0">Stocksplit</option>
                    <option value="1">Sub Region</option>
                    <option value="2">Country</option>
                    <option value="3">Region</option>
                    <option value="4">Sector</option>
                    </select>
                </label>            
            </div>
           
            {
            
            allArrays[valueSelect].map((share, index) => ( 
                <AnalysisDetailItem props={share}
                    key={`activity_${index}`}
                ></AnalysisDetailItem>
            )) 
            
        }</List>

    );
}

export default AnalysisList;