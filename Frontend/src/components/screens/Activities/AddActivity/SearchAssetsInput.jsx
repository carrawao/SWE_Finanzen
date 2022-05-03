import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

/**
* Form for adding an activity
* @param props
* @returns {JSX.Element}
* @constructor
*/
const SearchAssetInput = (props) => {
    
    const getSharesInPortfolioOptions = () => {
        const shares = props.portfolioData.shares;
        const shareOptions = [];
        shares.forEach(share => {
            let option = {
                name: share.name,
                symbol: share.symbol,
                assetType: share.assetTypeForDisplay
            }
            shareOptions.push(option);
        });
        return shareOptions;
    }

    const getCryptoInPortfolioOptions = () => {
        const crypto = props.portfolioData.crypto;
        const cryptoOptions = [];
        crypto.forEach(coin => {
            let option = {
                name: coin.name,
                symbol: coin.symbol,
                assetType: coin.assetTypeForDisplay
            }
            cryptoOptions.push(option);
        });
        return cryptoOptions;
    }

    const getCashOptions = () => {
        const cash = props.portfolioData.cash;
        const cashOptions = [];
        cash.forEach(account => {
            let option = {
                name: account.name,
                symbol: account.symbol,
                assetType: account.assetTypeForDisplay
            }
            cashOptions.push(option);
        });
        return cashOptions;
    }
    
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cash, setCash] = useState(false);

    const sharesInPortfolioOptions = getSharesInPortfolioOptions();
    const cryptoInPortfolioOptions = getCryptoInPortfolioOptions();
    const cashOptions = getCashOptions();

    useEffect(async () => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            let tempOptions = [];
            if (cash) {
                tempOptions = searchCash(props.values.assetInput, cashOptions);
            } else {
                tempOptions = await updateSearchAssetOptions(props.values.assetInput);
            }
            if (active) {
                setOptions([...tempOptions]);
            }
            setLoading(false);
            return () => {
                active = false;
            };
        })();
    }, [loading]);

    useEffect(() => {
        if (!open) {
            props.setValues({
                ...props.values,
                assetInput: ''
            })
        }
        if (open) {
            setLoading(true);
        }
    }, [open]);
    
    useEffect(() => {
        if (props.values.assetType === "cash") {
            setCash(true);
        } else {
            setCash(false);
        }
        setLoading(true);
    }, [props.values.assetType]);

    useEffect(() => {
        setLoading(true);
    }, [props.values.assetInput]);

    const updateSearchAssetOptions = async (value) => {
        if (props.values.assetType === "share") {
            if (value==='') {
                return sharesInPortfolioOptions;
            }
            const results = await fetchShareOptions(value);
            return results;
        }
        if (props.values.assetType === "crypto") {
            if (value==='') {
                return cryptoInPortfolioOptions;
            }
            const results = await fetchCryptoOptions(value);
            return results;
        }
    }

    const searchCash = (searchText, options) => {
        let results = options.filter(option => {
            let isPartOf = option.symbol.toLowerCase().includes(searchText.toLowerCase()) || option.name.toLowerCase().includes(searchText.toLowerCase());
            return isPartOf;
        });
        return results;
    }
    
    const fetchShareOptions = async (query) => {
        let slice = true;
        if (query.length > 2) {
            slice = false;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/searchShare?text=${query}`, {mode:'cors'})
            const json = await response.json();
            let results = [];
            if (slice === true) {
                results = json.slice(0, 20);
            } else {
                results = json;
            }
            return results;
        }
        catch (e) {
            console.log('fetching failed === ', e);
        };
    }
    
    const fetchCryptoOptions = async (query) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/searchCrypto?text=${query}`, {mode:'cors'})
            const json = await response.json();
            let results = json;
            return results;
        }
        catch (e) {
            console.log('fetching failed === ', e);
        };
    }

    return (
    <Autocomplete
        open={open}
        onOpen={() => {
            setOpen(true);
        }}
        onClose={() => {
            setOpen(false);
        }}
        isOptionEqualToValue={() => true} //Function isnt required -> set it to always true to ignore warnings
        loading={loading}
        key={props.values.assetType} //component rerenderes on change of key
        name="asset"
        onChange={(event, newValue) => {
            //gefaktes event e zur Anpassung an funktionsweise von handleInputChange, das event welches als parameter reingegeben wird kann nicht genommen werden
            const e = {
                target: {name: "asset", value: newValue}
            }
            props.handleInputChange(e);
        }}
        autoHighlight
        fullWidth
        filterOptions={(x) => x}
        id="add-activity-searchAsset"
        options={options}
        getOptionLabel={(option) => option.name === option.symbol ? option.name : `${option.name} (${option.symbol})`}
        renderOption={(props, option) => (
            <Box component="li" key={option.symbol} sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {/* <Avatar
                    className='me-xs-2 me-md-0'
                    alt={`${props.activities ? props.row.asset : props.row.name}-logo`}
                    //src={`${process.env.PUBLIC_URL}/assets/images/allianz-logo.jpeg`} //TODO: put icon if exists
                    sx={{
                    backgroundColor: props.colorsArray[props.index % 4],
                    width: {
                        xs: '2.5rem',
                        md: '2.8rem'
                    },
                    height: {
                        xs: '2.5rem',
                        md: '2.8rem'
                    },
                    }}
                >
                    <Typography fontSize='16px'>
                    {`${props.activities ? props.row.asset.slice(0, 3).toUpperCase() : props.row.name.slice(0, 3).toUpperCase()}`}
                    </Typography>
                </Avatar>
                <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                /> */}
                {option.name} {option.symbol !== option.name ? `(${option.symbol})` : ``} Type: {option.assetType}
            </Box>
        )}
        renderInput={(params) => 
            <props.StyledTextField 
                {...params}
                margin="normal"
                label="asset/account"
                name="assetInput"
                onChange = {props.handleInputChange}
                value={props.values.assetInput}
                {...(props.errors.asset && {error: true, helperText: props.errors.asset})}
                InputProps={{
                    ...params.InputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                    endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                    ),
                }}
            />
        }
    />
    );
}

SearchAssetInput.propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object,
    portfolioData: PropTypes.object,
    handleInputChange: PropTypes.func,
    StyledTextField: PropTypes.object,
    setValues: PropTypes.func,
};

export default SearchAssetInput;