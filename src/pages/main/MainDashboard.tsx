import { Grid, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { DateRangePicker } from '../../components/DateRangePicker';
import defaultAxios from '../../config/axiosConfig';
import { PlaidContext } from '../../contexts/PlaidContext';

export const MainDashboard = () => {
  const { linkedAccounts } = useContext(PlaidContext);

  useEffect(() => {
    if (linkedAccounts?.length) {
      getInitialTransactions();
    }
  }, [linkedAccounts]);

  const getInitialTransactions = async () => {
    const itemId = linkedAccounts?.[0].item_id;
    try {
      const result = await defaultAxios.post(`http://localhost:3000/api/transactions/${itemId}`);

      console.log('result:', result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h1">Summary</Typography>
      </Grid>
      <Grid item style={{ position: 'relative' }}>
        <DateRangePicker />
      </Grid>
    </Grid>
  );
};
