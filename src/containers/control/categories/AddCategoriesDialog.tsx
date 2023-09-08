import { InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { SaveDialog } from '../../../components/SaveDialog';
import { CTextField } from '../../../components/TextField';
import { themeColors } from '../../../utils/theme-utils';

export type AddCategoriesDialogProps = {
  open: boolean;
  handleClose: (payload: { categoryName: string; categoryBudget?: number } | undefined) => void;
};

export const AddCategoriesDialog = ({ open, handleClose }: AddCategoriesDialogProps) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryBudget, setCategoryBudget] = useState<number | undefined>(undefined);
  //   const [categoryColor, setCategoryColor] = useState<string>('');

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value === 0) {
      setCategoryBudget(undefined);
    } else if (!isNaN(value)) {
      setCategoryBudget(value);
    }
  };

  const handleCloseDialog = (shouldSave: boolean) => () => {
    if (shouldSave) {
      const payload = {
        categoryName,
        categoryBudget,
      };
      handleClose(payload);
    } else {
      handleClose(undefined);
    }
    setCategoryName('');
    setCategoryBudget(undefined);
  };

  return (
    <SaveDialog
      open={open}
      handleCloseDialog={handleCloseDialog}
      dialogTitle="Add Category"
      isSaveButtonDisabled={categoryName === ''}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
          Category Name *
        </Typography>
        <CTextField
          size="small"
          required
          value={categoryName}
          onChange={handleCategoryNameChange}
          sx={{ marginTop: '4px !important', width: '200px' }}
        />
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
          Budget per month
        </Typography>
        <CTextField
          size="small"
          value={categoryBudget}
          type="number"
          onChange={handleBudgetChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ marginTop: '4px !important', width: '200px' }}
        />
      </Stack>
    </SaveDialog>
  );
};
