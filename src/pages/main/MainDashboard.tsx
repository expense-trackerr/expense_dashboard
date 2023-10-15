import { useQuery } from '@apollo/client';
import {
  Grid,
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsData?.getTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell component="th" scope="row">
                  {txn.date}
                </TableCell>
                <TableCell align="right">{txn.name}</TableCell>
                <TableCell align="right">{txn?.category?.name}</TableCell>
                <TableCell align="right">{txn.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
