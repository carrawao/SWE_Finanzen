import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid,
        Button
    } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import AnalysisList from './AnalysisList';


const AnalysisScreen = () => {

    const renderHeader = () => (
        <Typography variant='h6' noWrap component='div'>
        Header of Analysis Page
        </Typography>
    );

    const renderBody = () => (
        <Grid className='d-md-flex flex-md-row justify-content-lg-around px-lg-2 px-xl-3 justify-content-center pt-2'>
            <Grid item className='col-12 col-md-5 col-xl-3'>
                <Typography variant='h6' noWrap component='div'>
                    Placeholder piechart
                </Typography>
            </Grid>
            <Grid item className='col-12 col-md-7 col-xl-9'>
                <AnalysisList></AnalysisList>
            </Grid>
        </Grid>   
    );

    return (
        <React.Fragment>
        <ScreensTemplate
            headerComponent={renderHeader}
            bodyComponent={renderBody}
            selectedNavLinkIndex={5}
        />
        </React.Fragment>

    );
}

export default AnalysisScreen;