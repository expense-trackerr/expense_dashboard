import { Box, Grid, Tab, Tabs } from '@mui/material';
import React from 'react';
import { AccountsTab } from '../../containers/control/accounts/AccountsTab';

function CustomTabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const CategoriesControl = () => {
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
        <AccountsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Categories
      </CustomTabPanel>
    </Grid>
  );
};
