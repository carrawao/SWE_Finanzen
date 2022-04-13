import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
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
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import DropdownMenu from '../screens/WatchLists/DropdownMenu';


/**
 * Table to show the different assets in watchlist
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = (props) => {
  const [listDropdownIndex, setListDropdownIndex] = useState(0);
  const navigate = useNavigate();

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
                    xs: '9vw',
                    sm: '7vw',
                    md: '1vw',
                    lg: '5vw'
                  }
                }}
              >
                <Avatar
                  className='me-xs-2 me-md-0'
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
                    md: '10vw',
                    lg: '30vw',
                    xl: '20vw'
                  }
                }}
              >
                <Typography className='ms-xs-2' variant='body2' noWrap>
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell
                className='p-0'
                align='right'
                sx={{
                  width: {
                    xs: '15vw',
                    md: '10vw',
                    lg: '10vw'
                  }
                }}
              >
                <Typography variant='body2' noWrap>
                  {`${row.price} $`}
                </Typography>
              </TableCell>
              <TableCell
                className='p-0'
                align='right'
                sx={{
                  width: {
                    xs: '20vw',
                    md: '10vw',
                    lg: '10vw'
                  }
                }}
              >
                <Typography
                  variant='body2'
                  noWrap
                  sx={{
                    color: row.change < 0 ? 'red' : 'green'
                  }}
                >
                  {`${row.change}%`}
                </Typography>
              </TableCell>
              <TableCell
                className='p-0'
                align='right'
                sx={{
                  width: {
                    xs: '20vw',
                    md: '10vw',
                    lg: '10vw'
                  }
                }}
              >
                <DropdownMenu
                  selectedListIndex={props.selectedListIndex}
                  listName={props.watchListsArray[index]}
                  setListDropdownIndex={setListDropdownIndex}
                  menuOptions={['Details', 'Delete']}
                  iconOptions={[<InfoIcon />, <DeleteIcon />]}
                  functionOptions={[
                    () => navigate(`/watchlists/${row.name}`),
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