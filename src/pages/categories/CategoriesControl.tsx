import { Grid, Box, Tab, Tabs, Alert, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { PlaidContext } from '../../contexts/PlaidContext';
import { PlaidLink } from '../../containers/plaid/PlaidLink';

function CustomTabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const CategoriesControl = () => {
  const { linkToken, linkTokenError, accessToken } = useContext(PlaidContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container direction="column" justifyContent={'center'} alignItems="center">
      <Tabs value={value} onChange={handleChange}>
        <Tab value={0} label="Accounts" />
        <Tab value={1} label="Categories" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        {linkToken === null && (
          <>
            <Alert severity="warning">
              Unable to fetch link_token: please make sure your backend server is running and that your .env file has
              been configured correctly.
            </Alert>
            <div>Error Message: {linkTokenError}</div>
          </>
        )}
        {linkToken === '' ? (
          <div>
            <Typography>Loading...</Typography>
          </div>
        ) : (
          <PlaidLink />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Categories
      </CustomTabPanel>
    </Grid>
  );
};
