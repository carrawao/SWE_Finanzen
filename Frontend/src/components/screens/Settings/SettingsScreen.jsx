import React, {useState} from 'react';
import ScreensTemplate from '../../ScreensTemplate';
import { Container, Box, Button } from '@mui/material';
import {renderDeleteDataModal} from './Modals/settingsModals'
import PropTypes from 'prop-types';

/**
 * Component related to the Settings screen
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SettingsScreen = props => {
  const [deleteDataModal, setDeleteDataModal] = useState(false);

  const renderBody = () => (
    <Container className='d-flex flex-column px-1 pt-2'>
      <Box calssName='d-flex flex-row'>
        <Button
          variant='outlined'
          onClick={downloadFile}
          sx={{
            color: 'white',
            borderColor: 'rgb(228 126 37)',
            backgroundColor: 'rgb(228 126 37)',
            '&:hover': {
              backgroundColor: 'rgb(228 126 37)',
            }
          }}
        >
          Export Data
        </Button>

        <input
          accept='application/json'
          className='d-none'
          id='import-file-button'
          type='file'
          onChange={importData}
        />

        <label htmlFor='import-file-button'>
          <Button
            className='ms-3'
            variant='outlined'
            onClick={uploadFile}
            sx={{
              color: 'white',
              backgroundColor: 'rgb(78 185 111)',
              '&:hover': {
                backgroundColor: 'rgb(78 185 111)',
              }
            }}
          >
            Import Data
          </Button>
        </label>

        <Button
          className='ms-3'
          variant='outlined'
          onClick={() => setDeleteDataModal(true)}
          sx={{
            color: 'white',
            borderColor: 'rgb(228 126 37)',
            backgroundColor: 'rgb(228 126 37)',
            '&:hover': {
              backgroundColor: 'rgb(228 126 37)',
            }
          }}
        >
          Delete Data
        </Button>
      </Box>
    </Container>
  );

  /**
   * Export/Download the portfolio summary to a json-file
   * @returns {Promise<void>}
   */
  const downloadFile = async () => {
    const myData = { //TODO: the structure of the json file should be determined
      'watchlistData': {
        'watchListsArray': props.watchListsArray,
        'assetsListArray': props.assetsListArray,
      },
      'portfolioData': props.portfolioData,
      'activePortfolio': props.activePortfolio
    };

    const fileName = 'benchmarket';
    const json = JSON.stringify(myData);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Import data from the portfolio summary file
   * @param event
   */
  const importData = event => {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    document.getElementById('import-file-button').value = '';
  }

  /**
   * Preloading data from external json file
   * @param event
   */
  const onReaderLoad = event => {
    const obj = JSON.parse(event.target.result);
    console.log("uploading file .....", obj);
    props.setWatchListsArray(obj.watchlistData.watchListsArray);
    props.setAssetsListArray(obj.watchlistData.assetsListArray);
    props.setPortfolioData(obj.portfolioData);
    props.setActivePortfolio(obj.activePortfolio);
  }

  // Upload the portfolio summary
  const uploadFile = () => {
    document.getElementById('import-file-button').click();
  }

  // Delete all user data
  const deleteData = () => {
    props.setWatchListsArray([]);
    props.setAssetsListArray([]);
    props.setPortfolioData(props.emptyPortfolioData);
    props.setActivePortfolio('Portfolio');
    setDeleteDataModal(false);
  }

  // Closes the modal for deleting user data
  const handleClose = () => {
    setDeleteDataModal(false);
  }

  return (
    <React.Fragment>
      <ScreensTemplate
        bodyComponent={renderBody}
        selectedNavLinkIndex={4}
        assetsListArray={props.assetsListArray}
        searchResult={props.searchResult}
        setSearchResult={props.setSearchResult}
      />
    {renderDeleteDataModal(deleteDataModal, handleClose, deleteData)}
    </React.Fragment>
  );
}

SettingsScreen.propTypes = {
  searchResult: PropTypes.array,
  setSearchResult: PropTypes.func,
  watchListsArray: PropTypes.array,
  assetsListArray: PropTypes.array,
  portfolioData: PropTypes.object,
  activePortfolio: PropTypes.string,
  emptyPortfolioData: PropTypes.object,
  setWatchListsArray: PropTypes.func,
  setAssetsListArray: PropTypes.func,
  setPortfolioData: PropTypes.func,
  setActivePortfolio: PropTypes.func,
};

export default SettingsScreen;