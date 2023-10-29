import { EditableTableBody } from '../../components/transactions-table/EditableTableBody';
import { RegularTableBody } from '../../components/transactions-table/RegularTableBody';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { EditedTxnState, HandleEditedTxnChangeFn } from './TransactionsTable';

export const TransactionsTableBody = ({
  txn,
  editMode,
  handleEditedTxnChange,
  errorTxns,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  editMode: boolean;
  handleEditedTxnChange: HandleEditedTxnChangeFn;
  errorTxns: EditedTxnState;
}) => {
  return editMode ? (
    <EditableTableBody txn={txn} handleEditedTxnChange={handleEditedTxnChange} errorTxns={errorTxns} />
  ) : (
    <RegularTableBody txn={txn} />
  );
};
