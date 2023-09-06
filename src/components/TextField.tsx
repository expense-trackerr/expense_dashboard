import { TextField } from '@mui/material';
import { styled } from '@mui/styles';

export const CTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4', // label color on focus
  },
  '& .MuiFormLabel-root': {
    color: '#A0AAB4', // label inside the textfield
    fontSize: '0.875rem',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F5F7FA',
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2', // border color on focus
    },
  },
});
