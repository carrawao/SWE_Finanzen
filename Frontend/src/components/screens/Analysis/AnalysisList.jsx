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
        //this.forceUpdate()
      };
   
    const calculateStockSplit = () => {
        var value = 1000;
        var stockArray = []

        portfolioData.shares.forEach(element => {
            var percantage = element.value / value * 100;

            stockArray.push({
                asset: element.name,
                percantage: percantage
            })
        });

        console.log(stockArray)
        return stockArray
        
      
    }

    const calculateSectorSplit = () => {
        var value = 1000;
        var sectorArray = []

        portfolioData.shares.forEach(element => {
            if( sectorArray.some(row => row.includes(element.analysisInfo.sector)) ){

                sectorArray.forEach(arrayElement => {
                    if (arrayElement[0] == element.analysisInfo.sector){

                        arrayElement[1] = parseFloat(arrayElement[1]);
                        arrayElement[1] += parseFloat(element.value)
                    }
                    
                })
            } else {
                sectorArray.push([element.analysisInfo.sector, parseFloat(element.value)])
            }

        });

        var stockArray = []

        sectorArray.forEach(sector => {
            var percantage = sector[1] / value * 100;

            stockArray.push({
                asset: sector[0],
                percantage: percantage
            })
        });

        console.log(sectorArray)

        

        return stockArray
        
      
    }
   
    calculateSectorSplit()
    var testArray = calculateStockSplit()
    var anotherArray = calculateSectorSplit()

    var bossArray = [testArray, anotherArray]

    var valueSelect = value
    return (
       
        <List>
             <div>
                <label>
                    Select menu
                    <select value={value} onChange={handleChange}>
                    <option value="0">Stocksplit</option>
                    <option value="1">Detail</option>
                    </select>
                </label>

                <p>We eat {value}!</p>
            </div>
           
            {
            
            bossArray[valueSelect].map((share, index) => ( 
                <AnalysisDetailItem props={share}
                    key={`activity_${index}`}
                ></AnalysisDetailItem>
            )) 
            
        }</List>

    );
}

export default AnalysisList;