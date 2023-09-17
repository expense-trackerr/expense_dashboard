import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { SaveDialog } from '../../../components/SaveDialog';
import { themeColors } from '../../../utils/theme-utils';
import { GetCategoriesQuery } from '../../../__generated__/graphql';

export type DeleteCategoryDialogProps = {
  open: boolean;
  handleClose: (payload: { categoryId: string; deleteTransactions: boolean } | undefined) => void;
  categoryDialogDetails: GetCategoriesQuery['getCategories'][0];
};

export const DeleteCategoryDialog = ({ open, handleClose, categoryDialogDetails }: DeleteCategoryDialogProps) => {
  const [deleteTransactionsCheckbox, setDeleteTransactionsCheckbox] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteTransactionsCheckbox(event.target.checked);
  };

  const handleCloseDialog = (shouldSave: boolean) => () => {
    if (shouldSave) {
      const payload = {
        categoryId: categoryDialogDetails.id,
        deleteTransactions: deleteTransactionsCheckbox,
      };
      handleClose(payload);
    } else {
      handleClose(undefined);
    }
  };

  return (
    <SaveDialog
      open={open}
      handleCloseDialog={handleCloseDialog}
      dialogTitle="Delete Category?"
      primaryButtonText="Delete"
      primaryButtonColor={themeColors.danger}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="body1" sx={{ color: themeColors.normalText }}>
          Are you sure you want to delete "{categoryDialogDetails.name}" category?
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={deleteTransactionsCheckbox} onChange={handleCheckboxChange} />}
          label="Do you want to delete the transactions associated with this category?"
          componentsProps={{ typography: { variant: 'body1', sx: { color: themeColors.normalText } } }}
        />
      </Stack>
    </SaveDialog>
  );
};
