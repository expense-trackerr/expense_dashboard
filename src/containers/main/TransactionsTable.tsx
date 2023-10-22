import { QueryResult } from '@apollo/client';
import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
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
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Accordion } from '../../components/Accordion';
import { MainButton, SecondaryButton } from '../../components/Buttons';
import { themeColors } from '../../utils/theme-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { TransactionsTableBody } from './TransactionsTableBody';

const useStyles = makeStyles({
  root: {
    '& .MuiTableCell-head': {
      color: themeColors.greyText,
      backgroundColor: themeColors.greyBackground,
    },
  },
});

type TransactionsTableProps = {
  transactionsQuery: QueryResult<
    GetTransactionsQuery,
    {
      userId: string;
    }
  >;
};

type EditedTxnState = {
  id: string;
  [key: string]: string;
}[];

export const TransactionsTable = ({ transactionsQuery }: TransactionsTableProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [editMode, setEditMode] = useState(false);
  const [editedTxns, setEditedTxns] = useState<EditedTxnState>([]);

  const { data, error, loading } = transactionsQuery;

  const pendingTransactions = data?.getTransactions.filter((txn) => txn.pending);
  const postedTransactions = data?.getTransactions.filter((txn) => !txn.pending);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleEditedTxnChange = (txnId: string, field: string, value: string) => {
    const updatedTxns = [...editedTxns];
    const txnIndex = updatedTxns.findIndex((txn) => txn.id === txnId);
    if (txnIndex === -1) {
      updatedTxns.push({ id: txnId, [field]: value });
    } else {
      updatedTxns[txnIndex][field] = value;
    }
    setEditedTxns(updatedTxns);
  };

  const handleSaveEditsClick = () => {
    setEditMode(false);
    enqueueSnackbar('Saved Edits', { variant: 'success' });
  };

  const handleDiscardEdits = () => {
    setEditMode(false);
  };

  const handleAddRowClick = () => {
    enqueueSnackbar('Added Row', { variant: 'success' });
  };

  if (loading) return <Skeleton variant="rectangular" height={500} sx={{ marginTop: 3 }} />;
  if (error) return <Typography>Error loading transactions</Typography>;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" mt={3}>
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
          {editMode ? (
            <>
              <Grid item>
                <MainButton onClick={handleSaveEditsClick}>Save Edits</MainButton>
              </Grid>
              <Grid item>
                <SecondaryButton onClick={handleDiscardEdits}>Discard</SecondaryButton>
              </Grid>
              <Grid item>
                <MainButton variant="text" onClick={handleAddRowClick}>
                  Add Row
                </MainButton>
              </Grid>
            </>
          ) : (
            <>
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
            </>
          )}
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 1 }} elevation={0}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow className={classes.root}>
                <TableCell sx={{ width: '25%' }}>Date</TableCell>
                <TableCell sx={{ width: '35%' }}>Description</TableCell>
                <TableCell sx={{ width: '25%' }}>Category</TableCell>
                <TableCell sx={{ width: '15%' }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getTransactions.length ? (
                <>
                  <Accordion name="Pending">
                    {pendingTransactions?.map((txn) => (
                      <TransactionsTableBody
                        key={txn.id}
                        txn={txn}
                        editMode={editMode}
                        handleEditedTxnChange={handleEditedTxnChange}
                      />
                    ))}
                  </Accordion>
                  <Accordion name="Posted">
                    {postedTransactions?.map((txn) => (
                      <TransactionsTableBody
                        key={txn.id}
                        txn={txn}
                        editMode={editMode}
                        handleEditedTxnChange={handleEditedTxnChange}
                      />
                    ))}
                  </Accordion>
                </>
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
