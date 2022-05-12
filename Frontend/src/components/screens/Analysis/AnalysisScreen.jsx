import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid, Typography, Button} from '@mui/material';
import PropTypes from 'prop-types';

import AnalysisList from './AnalysisList';
import {DoughnutChart} from '../../common';
import { useNavigate } from "react-router-dom";

/**
 * Component related to the analysis page
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AnalysisScreen = props => {

  const [analysisType, setAnalysisType] = useState(0);

  let navigate = useNavigate(); 

  const routeChange = () =>{ 
    let path = `/activities`; 
    navigate(path);
  }

  const portfolioData = props.portfolioData[props.activePortfolio];
  const analysisTypes = ['Asset Type Allocation', 'Shares Allocation', 'Crypto Allocation', 'Cash Allocation', 'Region Allocation', 'Sub region Allocation', 'Country Allocation', 'Sector Allocation', 'Industry Allocation', 'Asset Class Allocation'];
  let keywordCollection = ['region', 'sub_region', 'country', 'sector', 'branche', 'assetClass'];
  let allArrays = [];
  let doughnutChartData = {};
  let isPortfolioSet = false;

  if(portfolioData.value > 0){
    isPortfolioSet = true;
  }

  const calculateStockSplit = keyword => {  //Calculate Stock, Crypto and Cash Allocation 
    let value;
    let stockArray = [];

    if (keyword === 'shares') {
      value = portfolioData.shareValue;
    } else if (keyword === 'crypto') {
      value = portfolioData.cryptoValue;
    } else if (keyword === 'cash') {
      value = portfolioData.cashValue;
    }

    portfolioData[keyword].forEach(element => {
      const percentage = element.value / value * 100;

      stockArray.push({
        asset: element.name,
        percentage: parseFloat(percentage.toFixed(2))
      })
    });

    return orderArray(stockArray);
  }

  const calculateKeywordSplit = (keyword, typSplit) => { //Calculate Typ Allocation if typSplit True otherwise calculate Keyword Allocation for the passed keyword
    let value = portfolioData.shareValue;
    let stockArray = [];

    if (typSplit) {
      value = portfolioData.value;
    } else {
      let sectorArray = [];

      portfolioData.shares.forEach(element => {

        if (element.assetTypeForDisplay === 'ETF') {
          value -= element.value;
          return;
        }
        if (sectorArray.some(row => row.includes(element.analysisInfo[keyword]))) {

          sectorArray.forEach(arrayElement => {
            if (arrayElement[0] === element.analysisInfo[keyword]) {
              arrayElement[1] = parseFloat(arrayElement[1]);
              arrayElement[1] += parseFloat(element.value);
            }
          })
        } else {
          if(element.analysisInfo[keyword]){
            sectorArray.push([element.analysisInfo[keyword], parseFloat(element.value)]);
          } else{
            let unknowKeyword = 'Unknown ' +keyword;
            sectorArray.push([unknowKeyword, parseFloat(element.value)]);
          }
          
        }
      });


      sectorArray.forEach(sector => {
        const percentage = sector[1] / value * 100;

        stockArray.push({
          asset: sector[0],
          percentage: percentage.toFixed(2)
        })
      });
    }

    if (typSplit) {
      let stockValue = portfolioData.shareValue;
      let etfValue = 0;
      let percentage;

      portfolioData.shares.forEach(element => {
        if (element.assetTypeForDisplay === 'ETF') {
          stockValue -= element.value;
          etfValue += element.value;
        }
      })

     

      if(stockValue){
        percentage = stockValue / value * 100;

        stockArray.push({
          asset: 'Stock',
          percentage: percentage.toFixed(2)
        })
      }
     
      if(etfValue){
        percentage = etfValue / value * 100;

        stockArray.push({
          asset: 'ETF',
          percentage: percentage.toFixed(2)
        })
      }

      if(portfolioData.cryptoValue){
        percentage = portfolioData.cryptoValue / value * 100;

        stockArray.push({
          asset: 'Crypto',
          percentage: percentage.toFixed(2)
        })
      }

      if(portfolioData.cashValue ){
        percentage = portfolioData.cashValue / value * 100;

        stockArray.push({
          asset: 'Cash',
          percentage: percentage.toFixed(2)
        })
      }   
    }

    return orderArray(stockArray);
  }

  const getDoughnutChartData = (splitArray) => { //Perpare data for the doughnut chart
    let labelArray = [];
    let dataArray = [];

    splitArray.forEach(arrayElement => {
      labelArray.push(arrayElement.asset)
      dataArray.push(arrayElement.percentage)
    });

    return {
      'labels': labelArray,
      'data': dataArray
    }
  }

  const orderArray = splitArray => { //Sort an array according to percentage (descending)
    function compare(a, b) {
      if (a.percentage < b.percentage) {
        return 1;
      } else if (a.percentage > b.percentage) {
        return -1;
      } else {
        return 0;
      }
    }

    return splitArray.sort(compare);
  }

  allArrays.push(calculateKeywordSplit("typ", true));
  allArrays.push(calculateStockSplit("shares"));
  allArrays.push(calculateStockSplit("crypto"));
  allArrays.push(calculateStockSplit("cash"));
  keywordCollection.forEach(keyword => {
    allArrays.push(calculateKeywordSplit(keyword, false));
  });

  doughnutChartData = getDoughnutChartData(allArrays[analysisType]);

  const renderBody = () => {
    if(isPortfolioSet){
      return(
        <Grid container className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
          <Grid item className='col-12 col-md-5 col-xl-3'>
            <DoughnutChart
              analysis
              data={doughnutChartData['data']}
              labels={doughnutChartData['labels']}
              defaultMiddleDisplayLabel={analysisTypes[analysisType]}
              defaultMiddleDisplayValue={''}
            />
          </Grid>
          <Grid item className='col-12 col-md-7 col-xl-9'>
            <AnalysisList
              allArrays={allArrays}
              analysisType={analysisType}
              setAnalysisType={setAnalysisType}
              analysisTypes={analysisTypes}
            />
          </Grid>
        </Grid>
      );
    } else{
      return(
   
        <Grid container
              sx={{
                borderRadius: '1rem',
                border: '1px solid black',
                padding: '20px',
                '@media screen and (max-width: 768px)': {
                  background: 'linear-gradient(180deg, rgb(78 185 111) 55%, #FFFFFF 0%);'
                },
                background: 'linear-gradient(90deg, rgb(78 185 111) 72%, #FFFFFF 50%);',
                marginTop: '30px'
              }}
        >
          <Grid item className='col-12 col-md-9 col-xl-9' sx={{
            paddingRight: '50px',
            '@media screen and (max-width: 768px)': {
              paddingRight: '0px'
            }
          }}>
            <Typography
              className='align-self-start fw-bold px-1'
              variant='h6'
              fontSize={{
                lg: 18,
                xs: 14
              }}
              sx={{
                '@media screen and (max-width: 768px)': {
                  marginBottom: '40px'
                }
              }}
            >
              Please add activites to your Portfolio to see your Analysis Page 
            </Typography>
          </Grid>
          <Grid item className='col-12 col-md-3 col-xl-3'
                sx={{
                  '@media screen and (min-width: 768px)': {
                    display: 'flex !important',
                    verticalAlign: 'center',
                    justifyContent: 'center'
                  }
                }}>
                  
            <Button
              className='ms-3'
              variant='outlined'
              onClick={() => routeChange()}
              sx={{
                color: 'white',
                borderColor: 'rgb(78 185 111)',
                backgroundColor: 'rgb(78 185 111)',
                '&:hover': {
                  backgroundColor: 'rgb(78 185 111)',
                },
                margin: 'auto !important',
                display: 'block'
              }}
            >
              Add Activities
            </Button>
          </Grid>

        </Grid>

    
      );
    }
    
  }
   

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={3}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
        statusMessage={props.statusMessage}
        setStatusMessage={props.setStatusMessage}
        messageType={props.messageType}
        setMessageType={props.setMessageType}
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
  statusMessage: PropTypes.string,
  setStatusMessage: PropTypes.func,
  messageType: PropTypes.string,
  setMessageType: PropTypes.func
};

export default AnalysisScreen;