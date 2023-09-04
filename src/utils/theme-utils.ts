import { createTheme } from '@mui/material';

const typographyConfig = {
  fontFamily: 'Roboto, sans-serif',
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: '1.17rem',
    fontWeight: 'bold',
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  body1: {
    fontSize: '1rem',
  },
  subtitle1: {
    fontSize: '0.8rem',
  },
};

const themeConfig = {
  typography: typographyConfig,
};

export const theme = createTheme(themeConfig);
