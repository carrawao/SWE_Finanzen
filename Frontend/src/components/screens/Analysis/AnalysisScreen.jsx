import React, {useEffect} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid} from '@mui/material';
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
  const keywordCollection = ['sub_region', 'country', 'region', 'sector', 'assetClass', 'branche'];
  let allArrays = [];

  useEffect(() => {
    allArrays.push(calculateStockSplit('shares'))
    allArrays.push(calculateStockSplit('crypto'))

    keywordCollection.forEach(keyword => {
      allArrays.push(calculateKeywordSplit(keyword, false));
    });

    allArrays.push(calculateKeywordSplit('typ', true));
  }, []);

  const calculateStockSplit = keyword => {
    let value;
    let stockArray = [];

    if (keyword === 'shares') {
      value = 825;
    } else if (keyword === 'crypto') {
      value = 106.5;
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
    if (typSplit) {
      var value = 835 + 106.5;
    } else {
      var value = 825;
    }

    let sectorArray = []

    portfolioData.shares.forEach(element => {
      if (sectorArray.some(row => row.includes(element.analysisInfo[keyword]))) {
        sectorArray.forEach(arrayElement => {
          if (arrayElement[0] === element.analysisInfo[keyword]) {
            arrayElement[1] = parseFloat(arrayElement[1]);
            arrayElement[1] += parseFloat(element.value)
          }

        })
      } else {
        sectorArray.push([element.analysisInfo[keyword], parseFloat(element.value)])
      }
    });

    let stockArray = []

    sectorArray.forEach(sector => {
      const percentage = sector[1] / value * 100;

      stockArray.push({
        asset: sector[0],
        percentage: percentage.toFixed(2)
      })
    });

    if (typSplit) {
      const percentage = 106.5 / value * 100;

      stockArray.push({
        asset: 'Crypto',
        percentage: percentage.toFixed(2)
      })
    }

    //console.log(sectorArray)

    return orderArray(stockArray)
  }

  const getPiechartData = (splitArray) => {
    let labelArray = [];
    let dataArray = [];

    splitArray.forEach(arrayElement => {
      labelArray.push(arrayElement.asset)
      dataArray.push(arrayElement.percentage)
    });

    return {
      'label': labelArray,
      'data': dataArray
    }
  }

  const orderArray = splitArray => {
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

  const renderBody = () => (
    <Grid container
          className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
      <Grid item className='col-12 col-md-5 col-xl-3'>
        <Typography variant='h6' noWrap component='div'>
          Placeholder piechart
        </Typography>
      </Grid>
      <Grid item className='col-12 col-md-7 col-xl-9'>
        <AnalysisList
          keywordCollection={keywordCollection}
          allArrays={allArrays}
        />
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