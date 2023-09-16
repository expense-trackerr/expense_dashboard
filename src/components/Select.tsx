import { InputBase, styled } from '@mui/material';

export const SelectInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '7px 26px 7px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      border: '2px solid #1876D1',
    },
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
  },
}));
