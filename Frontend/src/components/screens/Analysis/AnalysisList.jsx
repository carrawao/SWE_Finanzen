import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import {Grid,
        Button,
        List,
        ListItem
    } from '@mui/material';
import Typography from '@mui/material/Typography';

import AnalysisDetailItem from './AnalysisDetailitem';



const AnalysisList = () => {

    const props ={
        shareDistribution: [
            {
                "assettype": "share", //,crypto oder cash
                "asset": "IBM", //symbol des assets
                "percantage": "32"
            },
            {
                "assettype": "share", //,crypto oder cash
                "asset": "APL", //symbol des assets
                "percantage": "20"
            },
            {
                "assettype": "share", //,crypto oder cash
                "asset": "MSC", //symbol des assets
                "percantage": "15"
            },
            {
                "assettype": "share", //,crypto oder cash
                "asset": "FGD", //symbol des assets
                "percantage": "8"
            }
            ,{
                "assettype": "share", //,crypto oder cash
                "asset": "ERT", //symbol des assets
                "percantage": "4"
            }
            ,{
                "assettype": "share", //,crypto oder cash
                "asset": "SWA", //symbol des assets
                "percantage": "2"
            }
        ]
    }

    const renderHeader = () => (
        <Typography variant='h6' noWrap component='div'>
        Header of Analysis Page
        </Typography>
    );

    const renderBody = () => (
        <List>{
            props.shareDistribution.map((share, index) => ( 
                <AnalysisDetailItem props={share}
                    key={`activity_${index}`}
                ></AnalysisDetailItem>
            ))
        }</List>
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

export default AnalysisList;