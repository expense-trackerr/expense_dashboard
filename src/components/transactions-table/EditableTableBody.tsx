import { TableCell, TableRow, TextField } from '@mui/material';
import { formatDate, formatDisplayPrice } from '../../utils/function-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CategoryChip } from './CategoryChip';

export const EditableTableBody = ({ txn }: { txn: GetTransactionsQuery['getTransactions'][0] }) => {
  return (
    <>
      <TableRow>
        <TableCell>{formatDate(txn.date, false)}</TableCell>
        <TableCell>
          <TextField defaultValue={txn.name} />
        </TableCell>
        <TableCell>
          <CategoryChip category={txn.category} />
        </TableCell>
        <TableCell>
          <TextField defaultValue={formatDisplayPrice(txn.amount)} />
        </TableCell>
      </TableRow>
    </>
  );
};
