import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem, Typography} from '@mui/material';


const AnalysisDetailItem  = (props) => (
    <ListItem
    sx={{
        borderBottom: '2px solid lightgrey',
        display: 'flex',
        justifyContent: 'center'
    }}

    >     
        {console.log(props)}
        <span>{props.props.asset}</span>
        <span>{props.props.percantage}</span>
        <p>Test</p>
    </ListItem>
);

export default AnalysisDetailItem;