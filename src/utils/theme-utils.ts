import { createTheme } from '@mui/material';

export const themeColors = {
  greyBackground: '#F5F5F5',
  greyText: '#B7B7B7',
  normalText: '#5A5A5A',
  danger: '#F16A6A',
  linkText: '#003CBF',
};

const typographyConfig = {
  fontFamily: 'Roboto, sans-serif',
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: themeColors.normalText,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: themeColors.normalText,
  },
  h3: {
    fontSize: '1.17rem',
    fontWeight: 'bold',
    color: themeColors.normalText,
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: themeColors.normalText,
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
