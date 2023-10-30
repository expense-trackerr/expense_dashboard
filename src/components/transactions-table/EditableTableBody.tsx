import { Box, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { EditedTxnFields, EditedTxnState, HandleEditedTxnChangeFn } from '../../containers/main/TransactionsTable';
import { formatDate, formatDisplayPrice } from '../../utils/function-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CTextField } from '../TextField';
import { CategoryChip } from './CategoryChip';
import { EditableCategoryChip } from './EditableCategoryChip';
import { EditableDatePicker } from './EditableDatePicker';
import { RegularTableBody } from './RegularTableBody';

export const EditableTableBody = ({
  txn,
  handleEditedTxnChange,
  errorTxns,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  handleEditedTxnChange: HandleEditedTxnChangeFn;
  errorTxns: EditedTxnState;
}) => {
  const [showEditableRow, setShowEditableRow] = useState(false);

  const txnError = errorTxns.find((errorTxn) => errorTxn.id === txn.id);

  const handleEditableFieldChange = () => {
    setShowEditableRow(true);
  };

  return (
    <>
      <TableRow onClick={handleEditableFieldChange}>
        {showEditableRow ? (
          <>
            <TableCell>
              <EditableDatePicker
                defaultValue={new Date(txn.date)}
                onChange={(newValue) =>
                  handleEditedTxnChange(txn.id, EditedTxnFields.DATE, newValue?.toISOString() ?? '')
                }
              />
            </TableCell>
            <TableCell>
              <CTextField
                size="small"
                defaultValue={txn.name}
                onChange={(e) => handleEditedTxnChange(txn.id, EditedTxnFields.NAME, e.target.value)}
                sx={{
                  '& input': {
                    fontSize: '15px',
                  },
                }}
                error={Boolean(txnError?.name)}
                helperText={txnError?.name}
              />
            </TableCell>
            <TableCell>
              <EditableCategoryChip txn={txn} handleEditedTxnChange={handleEditedTxnChange} />
            </TableCell>
            <TableCell>
              <CTextField
                size="small"
                defaultValue={formatDisplayPrice(txn.amount, false)}
                onChange={(e) => handleEditedTxnChange(txn.id, EditedTxnFields.AMOUNT, e.target.value)}
                sx={{
                  '& input': {
                    fontSize: '15px',
                  },
                }}
                error={Boolean(txnError?.amount)}
                helperText={txnError?.amount}
              />
            </TableCell>
          </>
        ) : (
          <RegularTableBody txn={txn} />
        )}
      </TableRow>
    </>
  );
};
