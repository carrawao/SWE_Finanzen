import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid,
        Button
    } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import AnalysisList from './AnalysisList';


/**
 * Component related to the analysis page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AnalysisScreen = props => {

   
    const portfolioData = props.portfolioData[props.activePortfolio];

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

    const renderHeader = () => (
        <Typography variant='h6' noWrap component='div'>
        Header of Analysis Page
        </Typography>
    );


    const renderBody = () => (
        <Grid container className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
            <Grid item className='col-12 col-md-5 col-xl-3'>
                <Typography variant='h6' noWrap component='div'>
                    Placeholder piechart
                </Typography>
            </Grid>
            <Grid item className='col-12 col-md-7 col-xl-9'>
                <AnalysisList
                 keywordCollection={keywordCollection}
                 allArrays={allArrays}
                 ></AnalysisList>
            </Grid>      
        </Grid>   
         
    );

    return (
        <React.Fragment>
          <ScreensTemplate
            bodyComponent={renderBody}
            selectedNavLinkIndex={5}
            assetsListArray={props.assetsListArray}
            searchResult={props.searchResult}
            setSearchResult={props.setSearchResult}
          />
        </React.Fragment>
      );
}

AnalysisScreen.propTypes = {
    searchResult: PropTypes.array,
    setSearchResult: PropTypes.func,
    watchListsArray: PropTypes.array,
    assetsListArray: PropTypes.array,
    activePortfolio: PropTypes.string,
    portfolioData: PropTypes.object,
    setPortfolioData: PropTypes.func,
};

export default AnalysisScreen;