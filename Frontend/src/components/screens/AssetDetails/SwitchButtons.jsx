import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Button Group to control which chart is shown
 */
const SwitchButtons = (props) => {
    
    if(!props.containsAssetData){
        return null;
    }

    return (
        <ToggleButtonGroup
            color='primary'
            value={props.chartType}
            exclusive
            onChange={(e, chartType) => props.setChartType(chartType)}
        >
            <ToggleButton value='perf'>Performance</ToggleButton>
            <ToggleButton value='value'>Value Development</ToggleButton>
            <ToggleButton value='price'>Price</ToggleButton>            
        </ToggleButtonGroup>
    );
}

export default SwitchButtons;