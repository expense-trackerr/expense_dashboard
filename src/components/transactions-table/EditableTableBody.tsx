import { Autocomplete, Chip, TableCell, TableRow } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as DatePicketMUI } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext, useMemo } from 'react';
import { EditedTxnFields, EditedTxnState, HandleEditedTxnChangeFn } from '../../containers/main/TransactionsTable';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CTextField } from '../TextField';
import { formatDisplayPrice } from '../../utils/function-utils';

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

const EditableCategoryChip = ({
  txn,
  handleEditedTxnChange,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  handleEditedTxnChange: HandleEditedTxnChangeFn;
}) => {
  const {
    categories: { data },
  } = useContext(CategoriesContext);

  const categoryName = txn.category?.name;

  const categoriesList = useMemo(() => {
    if (data) {
      return data.map((category) => category.name);
    } else {
      return [];
    }
  }, [data]);

  const handleOnChange = (e: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
    handleEditedTxnChange(txn.id, EditedTxnFields.CATEGORY, newValue ?? undefined);
  };

  return (
    <Autocomplete
      defaultValue={categoryName}
      onChange={handleOnChange}
      options={categoriesList}
      renderOption={(props, option) => (
        <li {...props}>
          <Chip
            label={option}
            variant="outlined"
            sx={{ color: data?.find((category) => category.name === option)?.category_color }}
          />
        </li>
      )}
      renderInput={(params) => <CTextField {...params} size="small" value={categoryName} />}
    />
  );
};

export const EditableTableBody = ({
  txn,
  handleEditedTxnChange,
  errorTxns,
}: {
  txn: GetTransactionsQuery['getTransactions'][0];
  handleEditedTxnChange: HandleEditedTxnChangeFn;
  errorTxns: EditedTxnState;
}) => {
  const txnError = errorTxns.find((errorTxn) => errorTxn.id === txn.id);

  return (
    <>
      <TableRow>
        <TableCell>
          <DatePicker
            defaultValue={new Date(txn.date)}
            onChange={(newValue) => handleEditedTxnChange(txn.id, EditedTxnFields.DATE, newValue?.toISOString() ?? '')}
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
      </TableRow>
    </>
  );
};
