import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ListItem, Typography, Container, Box} from '@mui/material';


const AnalysisDetailItem  = (props) => (
    
   
    <ListItem
    sx={{
        borderBottom: '2px solid lightgrey'
    }}
 
 
    >    
        <Container className='d-flex flex-row p-0 align-items-center'>
            <Box className='d-flex flex-column mt-6 col-6 col-sm-6 me-6'>
                    <Typography
                className='align-self-start fw-bold px-1'
                component='span'
                noWrap
                fontSize={{
                    md: 14,
                    xs: 12
                }}
                sx={{
                    alignItems: 'flex-end'
                }}
                >
                        {props.props.asset}
                </Typography>
            </Box>
            <Box className='d-flex flex-row-reverse mt-6 col-6 col-sm-6 me-6'>
                <Typography
                className='align-self-start fw-bold px-1'
                component='span'
                noWrap
                fontSize={{
                    md: 14,
                    xs: 12
                }}
                >
                    {props.props.percantage} %
                </Typography>
            </Box>
        </Container>
        


    </ListItem>
    
);

export default AnalysisDetailItem;