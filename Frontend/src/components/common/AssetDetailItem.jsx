import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Box, Container, ListItem, Typography} from '@mui/material';
import DropdownMenu from '../screens/WatchLists/DropdownMenu';
import PropTypes from 'prop-types';

const formatDate = activityDate => {
  let date = new Date(activityDate);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
  return `${day}.${month}`;
}

const AssetDetailItem = (props) => (
  <ListItem
    className='p-0 mb-0 col-12'
    sx={{
      borderTop: '1px lightgrey',
      borderLeft: props.activities ? '4px solid rgb(0, 0, 0, .1)' : '8px solid lightgrey',
      borderRight: '4px solid rgb(0, 0, 0, .1)',
      borderBottom: '1px solid lightgrey',
      borderTopLeftRadius: props.index === 0 && '0.5rem',
      borderTopRightRadius: props.index === 0 && '0.5rem',
      borderBottomLeftRadius: props.itemsArray && props.index === props.itemsArray.length - 1 && '0.5rem',
      borderBottomRightRadius: props.itemsArray && props.index === props.itemsArray.length - 1 && '0.5rem',
      backgroundColor: 'white',
      borderLeftColor: !props.activities && props.colorsArray[props.index % 4],
      boxShadow: props.index === 0 ?
        'rgb(0 0 0 / 15%) 0px -6px 6px -6px' :
        props.itemsArray && props.index === props.itemsArray.length - 1 ?
          '0 6px 6px -6px rgb(0 0 0 / 30%)' : '',

    }}
  >
    <Link className='col-12 text-decoration-none text-black'
          to={`${props.row.name ? `/watchlists/${props.row.name}` : ''}`}>
      <Container className={`d-flex py-3 ${props.activities ? 'px-3 align-items-center' : 'px-1'}`}>
          {props.activities && <Box className='d-flex flex-column mt-2 col-2 col-sm-1 me-2 me-sm-3 me-md-2'>
            <Typography
              className='align-self-start fw-bold px-1'
              component='span'
              noWrap
              fontSize={{
                md: 14,
                xs: 12
              }}
              sx={{
                color: props.colorsArray[0][props.row.type][0],
                backgroundColor: props.colorsArray[0][props.row.type][1],
              }}
            >
              {`${props.row.type}`}
            </Typography>
            <Typography
              className='align-self-start'
              component='span'
              noWrap
              fontSize={{
                md: 14,
                xs: 12
              }}
              sx={{color: '#493f35'}}
            >
              {formatDate(props.row.date)}
            </Typography>
          </Box>}

          <Avatar
            className='me-xs-2 me-md-0'
            alt={`${props.activities ? props.row.asset : props.row.name}-logo`}
            src={`${process.env.PUBLIC_URL}/assets/images/allianz-logo.jpeg`}
            sx={{
              width: {
                xs: '2.5rem',
                md: '2.8rem'
              },
              height: {
                xs: '2.5rem',
                md: '2.8rem'
              },
            }}
          />

          <Box className={`d-sm-flex flex-sm-row align-items-center ${props.activities ? 'col-3' : 'd-flex flex-grow-1 col-1 pe-5'}`}>
            <Typography
              className='ms-sm-2 fw-bold'
              noWrap
              fontSize={{
                md: 16,
                xs: 14
              }}
            >
              {props.activities ? props.row.asset : props.row.name}
            </Typography>
          </Box>

          {props.activities &&
            <Box className='d-none d-md-flex flex-column flex-grow-1'>
              <Typography
                className='align-self-end'
                component='span'
                noWrap
                fontSize={{
                  md: 16,
                  xs: 15
                }}
              >
                {`${(props.row.fee).toFixed(2)}€`}
              </Typography>
              <Typography
                className='align-self-end'
                component='span'
                noWrap
                fontSize={{
                  md: 16,
                  xs: 15
                }}
              >
                {`${(props.row.tax).toFixed(2)}€`}
              </Typography>
            </Box>}

          <Box
            className={`d-flex flex-column px-0 ${props.activities ? 'justify-content-end flex-grow-1 flex-grow-lg-0 col-md-1 me-2' : ''}`}>
            <Typography
              noWrap
              className='align-self-end'
              fontSize={{
                md: 16,
                xs: 15
              }}
            >
              {`${props.activities ? props.row.sum : props.row.price}€`}
            </Typography>

            {props.activities ?
              <Box className='d-flex flex-column flex-sm-row justify-content-end col-12'>
                <Typography
                  className='align-self-end px-2'
                  component='span'
                  noWrap
                  fontSize={{
                    md: 14,
                    xs: 12
                  }}
                  sx={{
                    color: 'grey',
                    backgroundColor: 'rgb(243, 244, 246)',
                    borderRadius: '0.5rem'
                  }}
                >
                  {`${props.row.quantity}x`}
                </Typography>
                <Typography
                  className='align-self-end'
                  component='span'
                  noWrap
                  fontSize={{
                    md: 16,
                    xs: 15
                  }}
                >
                  {`${(props.row.sum / props.row.quantity).toFixed(2)}€`}
                </Typography>
              </Box> :
              <Typography
                className='align-self-end fw-bold px-2'
                component='span'
                noWrap
                fontSize={{
                  md: 14,
                  xs: 12
                }}
                sx={{
                  color: props.row.change < 0 ? 'brown' : 'green',
                  backgroundColor: props.row.change < 0 ? 'rgb(228, 126, 37, .2)' : 'rgb(78, 185, 111, .2)',
                  borderRadius: '0.5rem'
                }}
              >
                {`${props.row.change}%`}
              </Typography>}
          </Box>

          <Box className='d-flex px-1'>
            <DropdownMenu
              selectedListIndex={props.selectedListIndex}
              listName={props.listName}
              setListDropdownIndex={props.setListDropdownIndex}
              menuOptions={props.menuOptions}
              iconOptions={props.iconOptions}
              functionOptions={props.functionOptions}
            />
          </Box>
      </Container>
    </Link>
  </ListItem>
);

AssetDetailItem.propTypes = {
  activities: PropTypes.bool,
  row: PropTypes.any,
  index: PropTypes.number,
  colorsArray: PropTypes.array,
  listName: PropTypes.string,
  itemsArray: PropTypes.array,
  selectedListIndex: PropTypes.number,
  setListDropdownIndex: PropTypes.func,
  menuOptions: PropTypes.array,
  iconOptions: PropTypes.array,
  functionOptions: PropTypes.array
};

export default AssetDetailItem;