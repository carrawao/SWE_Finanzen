import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ScreensTemplate from '../../ScreensTemplate';
import {Container, Box, Button} from '@mui/material';
import {renderDeleteDataModal} from './Modals/settingsModals'
import PropTypes from 'prop-types';
import {margin} from '@mui/system';
import {Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

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
      <Box className='col-12'>
        <Typography
          variant='h6'
          fontSize={{
            lg: 24,
            xs: 18
          }}
          sx={{
            marginBottom: '40px'
          }}

        >
          Settings <SettingsIcon/>
        </Typography>

      </Box>
      <Box className='d-flex flex-row col-12'>
        <Grid container
              sx={{
                borderRadius: '1rem',
                border: '1px solid black',
                padding: '20px',
                '@media screen and (max-width: 768px)': {
                  background: 'linear-gradient(180deg, rgb(78 185 111) 55%, #FFFFFF 0%);'
                },
                background: 'linear-gradient(90deg, rgb(78 185 111) 72%, #FFFFFF 50%);',
                marginBottom: '40px'
              }}
        >
          <Grid item className='col-12 col-md-9 col-xl-9' sx={{
            paddingRight: '50px',
            '@media screen and (max-width: 768px)': {
              paddingRight: '0px'
            }
          }}>
            <Typography
              className='align-self-start fw-bold px-1'
              component='p'
              fontSize={{
                md: 14,
                xs: 12
              }}
              sx={{
                '@media screen and (max-width: 768px)': {
                  marginBottom: '40px'
                }
              }}

            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </Typography>
          </Grid>
          <Grid item className='col-12 col-md-3 col-xl-3'
                sx={{
                  '@media screen and (min-width: 768px)': {
                    display: 'flex !important',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }}>
            <input
              accept='application/json'
              className='d-none'
              id='import-file-button'
              type='file'
              onChange={importData}
            />

            <label htmlFor='import-file-button' style={{display: 'block'}}>
              <Button
                className='ms-3'
                variant='outlined'
                onClick={uploadFile}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgb(78 185 111)',
                  '&:hover': {
                    backgroundColor: 'rgb(78 185 111)',
                  },
                  margin: 'auto !important',
                  display: 'block'
                }}
              >
                Import Data
              </Button>
            </label>
          </Grid>

        </Grid>

      </Box>

      <Box className='d-flex flex-row col-12'>
        <Grid container
              sx={{
                borderRadius: '1rem',
                border: '1px solid black',
                padding: '20px',
                '@media screen and (max-width: 768px)': {
                  background: 'linear-gradient(180deg, rgb(59 151 210) 55%, #FFFFFF 0%);'
                },
                background: 'linear-gradient(90deg, rgb(59 151 210) 72%, #FFFFFF 50%);',
                marginBottom: '40px'
              }}
        >
          <Grid item className='col-12 col-md-9 col-xl-9'
                sx={{
                  paddingRight: '50px',
                  '@media screen and (max-width: 768px)': {
                    paddingRight: '0px'
                  }
                }}>
            <Typography
              className='align-self-start fw-bold px-1'
              component='p'
              fontSize={{
                md: 14,
                xs: 12
              }}
              sx={{
                '@media screen and (max-width: 768px)': {
                  marginBottom: '40px'
                }
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </Typography>
          </Grid>
          <Grid item className='col-12 col-md-3 col-xl-3' sx={{
            '@media screen and (min-width: 768px)': {
              display: 'flex !important',
              verticalAlign: 'center',
              justifyContent: 'center'
            }
          }}>
            <Button
              variant='outlined'
              onClick={downloadFile}
              sx={{
                color: 'white',
                borderColor: 'rgb(59 151 210)',
                backgroundColor: 'rgb(59 151 210)',
                '&:hover': {
                  backgroundColor: 'rgb(59 151 210)',
                },
                margin: 'auto',
                display: 'block'
              }}
            >
              Export Data
            </Button>
          </Grid>

        </Grid>

      </Box>

      <Box className='d-flex flex-row col-12'>
        <Grid container
              sx={{
                borderRadius: '1rem',
                border: '1px solid black',
                padding: '20px',
                '@media screen and (max-width: 768px)': {
                  background: 'linear-gradient(180deg, rgb(228 126 37) 55%, #FFFFFF 0%);'
                },
                background: 'linear-gradient(90deg, rgb(228 126 37) 72%, #FFFFFF 50%);',
                marginBottom: '40px'
              }}
        >
          <Grid item className='col-12 col-md-9 col-xl-9' sx={{
            paddingRight: '50px',
            '@media screen and (max-width: 768px)': {
              paddingRight: '0px'
            }
          }}>
            <Typography
              className='align-self-start fw-bold px-1'
              component='p'
              fontSize={{
                md: 14,
                xs: 12
              }}
              sx={{
                '@media screen and (max-width: 768px)': {
                  marginBottom: '40px'
                }
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            </Typography>
          </Grid>
          <Grid item className='col-12 col-md-3 col-xl-3'
                sx={{
                  '@media screen and (min-width: 768px)': {
                    display: 'flex !important',
                    verticalAlign: 'center',
                    justifyContent: 'center'
                  }
                }}>
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
                },
                margin: 'auto !important',
                display: 'block'
              }}
            >
              Delete Data
            </Button>
          </Grid>

        </Grid>

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
    const blob = new Blob([json], {type: 'application/json'});
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
    props.setWatchListsArray(obj.watchlistData.watchListsArray);
    props.setAssetsListArray(obj.watchlistData.assetsListArray);
    props.setPortfolioData(obj.portfolioData);
    props.setActivePortfolio(obj.activePortfolio);
  }

  // Upload the portfolio summary
  const uploadFile = () => {
    document.getElementById('import-file-button').click();
  }

  let navigate = useNavigate();
  const routeChange = path => {
    navigate(path);
  }

  // Delete all user data
  const deleteData = () => {
    props.setWatchListsArray([]);
    props.setAssetsListArray([]);
    props.setPortfolioData(props.emptyPortfolioData);
    props.setActivePortfolio('Portfolio');
    setDeleteDataModal(false);
    //redirect to dashboard
    routeChange('/');
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
        statusMessage={props.statusMessage}
        setStatusMessage={props.setStatusMessage}
        messageType={props.messageType}
        setMessageType={props.setMessageType}
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
  statusMessage: PropTypes.string,
  setStatusMessage: PropTypes.func,
  messageType: PropTypes.string,
  setMessageType: PropTypes.func
};

export default SettingsScreen;
