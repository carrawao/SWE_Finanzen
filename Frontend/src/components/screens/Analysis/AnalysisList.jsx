import React from 'react';
import {List} from '@mui/material';

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

    return (
      <List>{
          props.shareDistribution.map((share, index) => (
            <AnalysisDetailItem
              props={share}
                key={`activity_${index}`}
            />
          ))
      }</List>
    );
}

export default AnalysisList;