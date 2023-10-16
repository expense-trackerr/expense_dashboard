import { useQuery } from '@apollo/client';
import { Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useContext, useEffect } from 'react';
import { DateRangePicker } from '../../components/DateRangePicker';
import defaultAxios from '../../config/axiosConfig';
import { TransactionsTable } from '../../containers/main/TransactionsTable';
import { useAuth } from '../../contexts/AuthContext';
import { PlaidContext } from '../../contexts/PlaidContext';
import { gql } from '../../__generated__';

const GET_TRANSACTIONS = gql(`
query GetTransactions($userId: String!) {
  getTransactions(userId: $userId) {
    amount
    currency
    category {
      id
      name
      category_type
      category_color
    }
    date
    id
    name
    pending
    linked_sub_account {
      account_id
      name
      alias_name
    }
  }
}
`);

export const MainDashboard = () => {
  const { currentUser } = useAuth();
  const { linkedAccounts } = useContext(PlaidContext);
  const { enqueueSnackbar } = useSnackbar();

  const transactionsQuery = useQuery(GET_TRANSACTIONS, { variables: { userId: currentUser?.uid ?? '' } });

  useEffect(() => {
    if (linkedAccounts?.length) {
      getInitialTransactions();
    }
  }, [linkedAccounts]);

  const getInitialTransactions = async () => {
    const itemId = linkedAccounts?.[0].item_id;
    try {
      const result = await defaultAxios.post(`http://localhost:3000/api/transactions/${itemId}`);
      if (result.status === 200) {
        const { added, removed, modified, errors } = result.data.summary;
        const message = `Added: ${added} Modified: ${modified} Removed: ${removed} Error: ${errors}`;
        enqueueSnackbar(message, { variant: 'success' });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Error retrieving transactions', { variant: 'error' });
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={5}>
        <Grid item>
          <Typography variant="h1">Summary</Typography>
        </Grid>
        <Grid item style={{ position: 'relative' }}>
          <DateRangePicker />
        </Grid>
      </Grid>
      <TransactionsTable transactionsQuery={transactionsQuery} />
    </>
  );
};
