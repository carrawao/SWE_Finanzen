import React from 'react';
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
    const renderBody = () => (
        <Grid container className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
            <Grid item className='col-12 col-md-5 col-xl-3'>
                <Typography variant='h6' noWrap component='div'>
                    Placeholder piechart
                </Typography>
            </Grid>
            <Grid item className='col-12 col-md-7 col-xl-9'>
                <AnalysisList
                 activePortfolio={props.activePortfolio}
                 portfolioData={props.portfolioData}
                 setPortfolioData={props.setPortfolioData}
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