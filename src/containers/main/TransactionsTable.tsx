import { QueryResult } from '@apollo/client';
import {
  Chip,
  Grid,
  IconButton,
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
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CachedIcon from '@mui/icons-material/Cached';
import { makeStyles } from '@mui/styles';
import { formatDate, formatDisplayPrice, getDisplayPriceColor } from '../../utils/function-utils';
import { themeColors } from '../../utils/theme-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { useState } from 'react';

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

type TransactionsTableProps = {
  transactionsQuery: QueryResult<
    GetTransactionsQuery,
    {
      userId: string;
    }
  >;
};

export const TransactionsTable = ({ transactionsQuery }: TransactionsTableProps) => {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  const { data, error, loading } = transactionsQuery;

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (loading) return <Skeleton variant="rectangular" height={500} />;
  if (error) return <Typography>Error loading transactions</Typography>;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item container direction="column" sm={'auto'}>
          <Grid item>
            <Typography variant="h3">Transactions</Typography>
          </Grid>
          <Grid item container justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
                Syncd 2 hours ago
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <CachedIcon fontSize="small" sx={{ color: themeColors.linkText }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container sm={'auto'} justifyContent="flex-end" alignItems="center" spacing={1}>
          <Grid item>
            <IconButton
              sx={{
                border: `1px solid ${themeColors.greyBackground}`,
                backgroundColor: themeColors.greyBackground,
                borderRadius: 3,
              }}
              onClick={handleEditClick}
            >
              <EditIcon sx={{ color: themeColors.greyText }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              sx={{
                border: `1px solid ${themeColors.greyBackground}`,
                backgroundColor: themeColors.greyBackground,
                borderRadius: 3,
              }}
            >
              <FilterAltIcon sx={{ color: themeColors.greyText }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 1 }} elevation={0}>
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
    </>
  );
};
