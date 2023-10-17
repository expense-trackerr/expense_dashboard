import { TableCell, TableRow } from '@mui/material';
import { formatDate, formatDisplayPrice } from '../../utils/function-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CTextField } from '../TextField';
import { CategoryChip } from './CategoryChip';

export const EditableTableBody = ({
  txn,
  handleEditedTxnChange,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  handleEditedTxnChange: (txnId: string, field: string, value: string) => void;
}) => {
  return (
    <>
      <TableRow>
        <TableCell>{formatDate(txn.date, false)}</TableCell>
        <TableCell>
          <CTextField
            size="small"
            defaultValue={txn.name}
            onChange={(e) => handleEditedTxnChange(txn.id, 'name', e.target.value)}
          />
        </TableCell>
        <TableCell>
          <CategoryChip category={txn.category} />
        </TableCell>
        <TableCell>
          <CTextField
            size="small"
            defaultValue={formatDisplayPrice(txn.amount)}
            onChange={(e) => handleEditedTxnChange(txn.id, 'amount', e.target.value)}
          />
        </TableCell>
      </TableRow>
    </>
  );
};
