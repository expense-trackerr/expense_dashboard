import { Autocomplete, Chip } from '@mui/material';
import { useContext, useMemo } from 'react';
import { EditedTxnFields, HandleEditedTxnChangeFn } from '../../containers/main/TransactionsTable';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CTextField } from '../TextField';

export const EditableCategoryChip = ({
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
      renderInput={(params) => (
        <CTextField
          {...params}
          size="small"
          sx={{
            '& input': {
              fontSize: '15px',
            },
            width: '180px',
          }}
          value={categoryName}
        />
      )}
    />
  );
};
