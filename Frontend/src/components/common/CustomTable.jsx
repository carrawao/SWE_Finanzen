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
import DropdownMenu from '../screens/WatchLists/DropdownMenu';


/**
 * Table to show the different assets in watchlist
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = (props) => {
  const [listDropdownIndex, setListDropdownIndex] = useState(0);

  return (
    <TableContainer
      component={Paper}
      sx={{
        '&.MuiTableContainer-root': {paddingTop: 0}
      }}
    >
      <Table aria-label='assets-table'>
        <TableBody>
          {
            props.assetsListArray[props.selectedListIndex] &&
            props.assetsListArray[props.selectedListIndex].length > 0 &&
            props.assetsListArray[props.selectedListIndex].map((row, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                height: '3rem' }}
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
                    lg: '15vw',
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
                    lg: '15vw'
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
                    lg: '15vw'
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
                    lg: '15vw'
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
                    () => {
                    props.setRemoveAssetModal(true);
                    props.setSelectedAssetIndex(index);
                    }
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
  assetsListArray: PropTypes.array,
  selectedListIndex: PropTypes.number,
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  setRemoveAssetModal: PropTypes.func,
  setSelectedAssetIndex: PropTypes.func
};

export default CustomTable;