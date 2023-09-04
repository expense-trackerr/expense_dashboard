import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab value={0} label="Accounts" />
        <Tab value={1} label="Categories" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        Accounts
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Categories
      </CustomTabPanel>
    </Box>
  );
};
