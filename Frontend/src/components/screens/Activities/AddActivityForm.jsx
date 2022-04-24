import React, {useState, useEffect} from 'react';
import { Grid, Select, TextField, MenuItem, styled} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import deLocale from 'date-fns/locale/de';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';

const StyledTextField = styled(TextField)({
    //Label color when focused
    '& label.Mui-focused': {
      color: '#493f35',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#493f35',
    },
    '& .MuiOutlinedInput-root': {
      //Standard border color
      '& fieldset': {
        borderColor: '#c4b8ac',
      },
      //Border color on hover
      '&:hover fieldset': {
        borderColor: '#493f35',
      },
      //Border color when focused
      '&.Mui-focused fieldset': {
        borderColor: '#493f35',
      },
    },
  });

const initialValues = {
    assettype: "share",
    asset: "",
    typeShare: "buy",
    typeCrypto: "buy",
    typeCash: "deposit",
    date: new Date(),
    quantity: 1,
    sum: '',
    tax: 0,
    fee: 0
}

/**
 * Form for adding an activity
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const AddActivityForm = (props) => {
    
    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }
    
    // useEffect() => {

    // } 

  return (
    <Grid 
        container 
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        component="form" 
        autoComplete="off"
    >
        <Grid item xs={4} sx={{ margin: '1rem'}}>
            <StyledTextField
                select
                label="assettype"
                name="assettype"
                onChange = {handleInputChange}
                value={values.assettype}
            >
                <MenuItem value={"share"}>Share</MenuItem>
                <MenuItem value={"crypto"}>Crypto</MenuItem>
                <MenuItem value={"cash"}>Cash</MenuItem>
            </StyledTextField>
            <StyledTextField
                label="asset/account"
                name="asset"
                onChange = {handleInputChange}
                value={values.asset}
            >

            </StyledTextField>

        </Grid>
        <Grid item xs={4} sx={{ margin: '1rem'}}>
                {values.assettype === "share" &&
                    <StyledTextField
                    select
                    label="type"
                    name="typeShare"
                    onChange = {handleInputChange}
                    value={values.typeShare}
                    >
                        <MenuItem value={"buy"}>Buy</MenuItem>
                        <MenuItem value={"sell"}>Sell</MenuItem>
                        <MenuItem value={"dividend"}>Dividend</MenuItem>
                    </StyledTextField>
                }
                {values.assettype === "crypto" &&
                    <StyledTextField
                    select
                    label="type"
                    name="typeCrypto"
                    onChange = {handleInputChange}
                    value={values.typeCrypto}
                    >
                        <MenuItem value={"buy"}>Buy</MenuItem>
                        <MenuItem value={"sell"}>Sell</MenuItem>
                    </StyledTextField>
                }
                {values.assettype === "cash" &&
                    <StyledTextField
                    select
                    label="type"
                    name="typeCash"
                    onChange = {handleInputChange}
                    value={values.typeCash}
                    >
                        <MenuItem value={"deposit"}>Deposit</MenuItem>
                        <MenuItem value={"payout"}>Payout</MenuItem>
                        <MenuItem value={"interest"}>Interest</MenuItem>
                    </StyledTextField>
                }
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>    
                    <DatePicker
                        disableFuture
                        label="Date"
                        name="date"
                        mask = '__.__.____'
                        views={['day']}
                        value={values.date}
                        onChange={(newValue) => {
                            setValues({
                                ...values,
                                ['date']:newValue
                            });}}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
            {values.assettype === "share" &&
                <TextField 
                    type = "number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                />
            }
            {values.assettype === "crypto" &&
                <StyledTextField
                select
                label="type"
                name="typeCrypto"
                onChange = {handleInputChange}
                value={values.typeCrypto}
                >
                    <MenuItem value={"buy"}>Buy</MenuItem>
                    <MenuItem value={"sell"}>Sell</MenuItem>
                </StyledTextField>
            }
            {values.assettype === "cash" &&
                <StyledTextField
                select
                label="type"
                name="typeCash"
                onChange = {handleInputChange}
                value={values.typeCash}
                >
                    <MenuItem value={"deposit"}>Deposit</MenuItem>
                    <MenuItem value={"payout"}>Payout</MenuItem>
                    <MenuItem value={"interest"}>Interest</MenuItem>
                </StyledTextField>
            }
        </Grid>
    </Grid>
  );
}

AddActivityForm.propTypes = {

};

export default AddActivityForm;

