import { TableCell, TableRow } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as DatePicketMUI } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDisplayPrice } from '../../utils/function-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CTextField } from '../TextField';
import { CategoryChip } from './CategoryChip';

const DatePicker = ({
  defaultValue,
  onChange,
}: {
  defaultValue: Date | null;
  onChange: (newValue: Date | null) => void;
}) => {
  // const [value, setValue] = useState<Date | null>(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicketMUI
        defaultValue={defaultValue}
        onChange={onChange}
        format="dd MMM 'yy"
        sx={{
          width: '140px',
          '& .MuiInputBase-root': {
            height: '37px',
          },
        }}
      />
    </LocalizationProvider>
  );
};

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
        <TableCell>
          <DatePicker
            defaultValue={new Date(txn.date)}
            onChange={(newValue) => handleEditedTxnChange(txn.id, 'date', newValue?.toISOString() ?? '')}
          />
        </TableCell>
        <TableCell>
          <CTextField
            size="small"
            defaultValue={txn.name}
            onChange={(e) => handleEditedTxnChange(txn.id, 'name', e.target.value)}
            sx={{
              '& input': {
                fontSize: '15px',
              },
            }}
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
            sx={{
              '& input': {
                fontSize: '15px',
              },
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
};
