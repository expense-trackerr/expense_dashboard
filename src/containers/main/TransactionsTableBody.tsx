import { EditableTableBody } from '../../components/transactions-table/EditableTableBody';
import { RegularTableBody } from '../../components/transactions-table/RegularTableBody';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { HandleEditedTxnChangeFn } from './TransactionsTable';

export const TransactionsTableBody = ({
  txn,
  editMode,
  handleEditedTxnChange,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  editMode: boolean;
  handleEditedTxnChange: HandleEditedTxnChangeFn;
}) => {
  return editMode ? (
    <EditableTableBody txn={txn} handleEditedTxnChange={handleEditedTxnChange} />
  ) : (
    <RegularTableBody txn={txn} />
  );
};
