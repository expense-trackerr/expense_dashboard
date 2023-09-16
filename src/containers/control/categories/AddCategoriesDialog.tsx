import { InputAdornment, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { SaveDialog } from '../../../components/SaveDialog';
import { CTextField } from '../../../components/TextField';
import { themeColors } from '../../../utils/theme-utils';

export type AddCategoriesDialogProps = {
  open: boolean;
  handleClose: (payload: { categoryName: string; categoryBudget?: number } | undefined) => void;
};

enum CategoryType {
  EXPENSE = 'Expense',
  INCOME = 'Income',
}

// FIXUI - The Category Type toggle button needs to follow the mock-up
export const AddCategoriesDialog = ({ open, handleClose }: AddCategoriesDialogProps) => {
  const [categoryType, setCategoryType] = useState<CategoryType>(CategoryType.EXPENSE);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryBudget, setCategoryBudget] = useState<number | ''>('');

  //   const [categoryColor, setCategoryColor] = useState<string>('');

  const handleCategoryTypeChange = (_: React.MouseEvent<HTMLElement>, newCategoryType: CategoryType) => {
    if (newCategoryType !== null) {
      setCategoryType(newCategoryType);
    }
  };

  const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (value <= 0) {
      setCategoryBudget('');
    } else if (!isNaN(value)) {
      setCategoryBudget(value);
    }
  };

  const handleCloseDialog = (shouldSave: boolean) => () => {
    if (shouldSave) {
      const payload = {
        categoryName,
        categoryBudget: categoryBudget === '' ? undefined : categoryBudget,
      };
      handleClose(payload);
    } else {
      handleClose(undefined);
    }
    setCategoryName('');
    setCategoryBudget('');
  };

  return (
    <SaveDialog
      open={open}
      handleCloseDialog={handleCloseDialog}
      dialogTitle="Add Category"
      isSaveButtonDisabled={categoryName === ''}
    >
      <Stack direction="column" spacing={2}>
        <ToggleButtonGroup color="primary" value={categoryType} exclusive onChange={handleCategoryTypeChange}>
          <ToggleButton value={CategoryType.EXPENSE}>{CategoryType.EXPENSE}</ToggleButton>
          <ToggleButton value={CategoryType.INCOME}>{CategoryType.INCOME}</ToggleButton>
        </ToggleButtonGroup>
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
          onChange={handleBudgetChange}
          error={categoryBudget !== '' && (categoryBudget <= 0 || isNaN(categoryBudget))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
          sx={{ marginTop: '4px !important', width: '200px' }}
        />
      </Stack>
    </SaveDialog>
  );
};
