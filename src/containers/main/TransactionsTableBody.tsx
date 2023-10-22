import { EditableTableBody } from '../../components/transactions-table/EditableTableBody';
import { RegularTableBody } from '../../components/transactions-table/RegularTableBody';
import { GetTransactionsQuery } from '../../__generated__/graphql';

export const TransactionsTableBody = ({
  txn,
  editMode,
  handleEditedTxnChange,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  editMode: boolean;
  handleEditedTxnChange: (txnId: string, field: string, value: string) => void;
}) => {
  return editMode ? (
    <EditableTableBody txn={txn} handleEditedTxnChange={handleEditedTxnChange} />
  ) : (
    <RegularTableBody txn={txn} />
  );
};
