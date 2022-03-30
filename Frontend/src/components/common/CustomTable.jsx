import React, {useState} from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownMenu from "../screens/WatchLists/DropdownMenu";


/**
 * Table to show the different assets in watchlist
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = (props) => {
  const [listDropdownIndex, setListDropdownIndex] = useState(0);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='assets-table'>
        <TableBody>
          {props.assetsArray[props.selectedListIndex].map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '3rem' }}
            >
              <TableCell
                className='p-0'
                sx={{
                  width: {
                    xs: '8vw',
                    md: '5vw'
                  }
                }}
              >
                <Avatar
                  alt={`${row.name}-logo`}
                  src={`${process.env.PUBLIC_URL}/assets/images/allianz-logo.jpeg`}
                  sx={{width: '2rem', height: '2rem'}}
                />
              </TableCell>
              <TableCell
                className='p-0'
                sx={{
                  width: {
                    xs: '35vw',
                    sm: '25vw',
                    md: '15vw',
                  }
                }}
              >
                <Typography variant='body2' noWrap>
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell
                className='p-0'
                align='right'
                sx={{
                  width: {
                    xs: '15vw',
                    sm: '20vw',
                    md: '15vw',
                  }
                }}
              >
                <Typography variant='body2' noWrap>
                  {row.price}
                </Typography>
              </TableCell>
              <TableCell
                className='p-0'
                align='right'
                sx={{
                  width: {
                    xs: '20vw',
                    sm: '10vw',
                    md: '15vw',
                    lg: '10vw'
                  }
                }}
              >
                <Typography variant='body2' noWrap>
                  {row.change}
                </Typography>
              </TableCell>
              <TableCell
                className='p-0'
                align='right'
                sx={{
                  width: {
                    xs: '20vw',
                    sm: '10vw',
                    lg: '10vw'
                  }
                }}
              >
                <DropdownMenu
                  selectedListIndex={props.selectedListIndex}
                  listName={props.watchListsArray[index]}
                  setListDropdownIndex={setListDropdownIndex}
                  menuOptions={['Delete']}
                  iconOptions={[<DeleteIcon />]}
                  functionOptions={[
                    () => {}
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomTable.propTypes = {
  assetsArray: PropTypes.array,
  selectedListIndex: PropTypes.number,
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
};

export default CustomTable;