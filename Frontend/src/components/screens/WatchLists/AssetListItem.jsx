import React, {useState} from 'react';
import {
  Box, List
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import {AssetDetailItem} from '../../common';


/**
 * Table to show the different assets in watchlist
 * @returns {JSX.Element}
 * @constructor
 */
const AssetListItem = (props) => {
  const [listDropdownIndex, setListDropdownIndex] = useState(0);
  const colorsArray = ['rgb(59 151 210)', 'rgb(78 185 111)', 'rgb(228 126 37)', 'rgb(239 195 21)'];

  return (
    <Box className='d-md-flex col-12'>
      <List
        className='p-0 col-12'
        sx={{
          boxShadow: 'inset rgb(0 0 0 / 20%) 0px -6px 6px -6px, inset 0 6px 6px -6px rgb(0 0 0 / 50%)',
          borderRadius: '0.5rem',
        }}
      >
        {
          props.assetsListArray[props.selectedListIndex] &&
          props.assetsListArray[props.selectedListIndex].length > 0 &&
          props.assetsListArray[props.selectedListIndex].map((row, index) => (
          <AssetDetailItem
            key={`asset_${index}`}
            row={row}
            index={index}
            colorsArray={colorsArray}
            itemsArray={props.assetsListArray[props.selectedListIndex]}
            listName={props.watchListsArray[index]}
            selectedListIndex={props.selectedListIndex}
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
        ))}
      </List>
    </Box>
  );
}

AssetListItem.propTypes = {
  assetsListArray: PropTypes.array,
  selectedListIndex: PropTypes.number,
  watchListsArray: PropTypes.array,
  setWatchListsArray: PropTypes.func,
  setRemoveAssetModal: PropTypes.func,
  setSelectedAssetIndex: PropTypes.func
};

export default AssetListItem;