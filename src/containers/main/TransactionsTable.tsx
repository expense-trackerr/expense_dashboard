import { QueryResult } from '@apollo/client';
import {
  Chip,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatDate, formatDisplayPrice, getDisplayPriceColor } from '../../utils/function-utils';
import { themeColors } from '../../utils/theme-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';

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

export const TransactionsTable = ({
  transactionsQuery,
}: {
  transactionsQuery: QueryResult<
    GetTransactionsQuery,
    {
      userId: string;
    }
  >;
}) => {
  const classes = useStyles();

  const { data, error, loading } = transactionsQuery;

  if (loading) return <Skeleton variant="rectangular" height={500} />;
  if (error) return <Typography>Error loading transactions</Typography>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
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
            {data?.getTransactions.length ? (
              data?.getTransactions.map((txn) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No transactions found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
