import {TextField, styled} from '@mui/material';

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

export default StyledTextField;