import { useQuery } from '@apollo/client';
import {
  Grid,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { DateRangePicker } from '../../components/DateRangePicker';
import defaultAxios from '../../config/axiosConfig';
import { useAuth } from '../../contexts/AuthContext';
import { PlaidContext } from '../../contexts/PlaidContext';
import { gql } from '../../__generated__';
import { formatDate } from '../../utils/function-utils';
import { themeColors } from '../../utils/theme-utils';

const GET_TRANSACTIONS = gql(`
query GetTransactions($userId: String!) {
  getTransactions(userId: $userId) {
    amount
    currency
    category {
      name
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

  const {
    data: transactionsData,
    // error: transactionsError,
    // loading: transactionsLoading,
    // refetch: transactionsRefetch,
  } = useQuery(GET_TRANSACTIONS, { variables: { userId: currentUser?.uid ?? '' } });
  console.log('transactionsData:', transactionsData);

  useEffect(() => {
    if (linkedAccounts?.length) {
      getInitialTransactions();
    }
  }, [linkedAccounts]);

  const getInitialTransactions = async () => {
    const itemId = linkedAccounts?.[0].item_id;
    try {
      const result = await defaultAxios.post(`http://localhost:3000/api/transactions/${itemId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h1">Summary</Typography>
        </Grid>
        <Grid item style={{ position: 'relative' }}>
          <DateRangePicker />
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 5 }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionsData?.getTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{formatDate(txn.date, false)}</TableCell>
                  <TableCell>
                    {txn.name}
                    <ListItemText
                      primary={txn.linked_sub_account.alias_name ?? txn.linked_sub_account.name}
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                      sx={{ color: themeColors.greyText, marginTop: '0px' }}
                    />
                  </TableCell>
                  <TableCell>{txn?.category?.name}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
