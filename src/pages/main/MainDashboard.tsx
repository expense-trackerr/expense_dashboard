import { useQuery } from '@apollo/client';
import {
  Chip,
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
import { formatDate, formatDisplayPrice, getDisplayPriceColor } from '../../utils/function-utils';
import { themeColors } from '../../utils/theme-utils';
import { gql } from '../../__generated__';
import { makeStyles } from '@mui/styles';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import Decimal from 'decimal.js-light';

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

const useStyles = makeStyles({
  root: {
    '& .MuiTableCell-head': {
      color: themeColors.greyText,
      backgroundColor: themeColors.greyBackground,
    },
  },
});

const CategoryChip = ({ category }: { category: GetTransactionsQuery['getTransactions'][0]['category'] }) => {
  if (category?.name) {
    return <Chip label={category.name} variant="outlined" sx={{ color: category.category_color }} />;
  } else {
    return <Chip label="" variant="outlined" sx={{ borderColor: 'red', width: '80px' }} />;
  }
};

export const MainDashboard = () => {
  const classes = useStyles();
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
      console.log('result:', result);
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
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 5 }} elevation={0}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className={classes.root}>
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
                    <Typography variant="subtitle1" sx={{ color: themeColors.greyText, marginTop: '0px' }}>
                      {txn.linked_sub_account.alias_name ?? txn.linked_sub_account.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <CategoryChip category={txn.category} />
                  </TableCell>
                  <TableCell sx={{ color: getDisplayPriceColor(txn.amount) }}>
                    {formatDisplayPrice(txn.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
