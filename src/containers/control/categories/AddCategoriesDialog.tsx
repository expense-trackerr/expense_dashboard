import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SaveDialog } from '../../../components/SaveDialog';
import { SelectInput } from '../../../components/Select';
import { CTextField } from '../../../components/TextField';
import { themeColors } from '../../../utils/theme-utils';

const colorOptions = [
  '#A5C8FF',
  '#A8E6CF',
  '#FFD3B6',
  '#FFAAA5',
  '#DCCCE7',
  '#ACE4AA',
  '#96E6B3',
  '#FFD1A1',
  '#FFA1A1',
  '#C1A1FF',
];

type ColorButtonProps = {
  color: string;
  selectedColor: string;
  onClick: () => void;
};

const ColorButton = ({ color, selectedColor, onClick }: ColorButtonProps) => (
  <div
    onClick={onClick}
    style={{
      width: 17,
      height: 17,
      borderRadius: '50%',
      backgroundColor: color,
      border: selectedColor === color ? '1px solid black' : 'none',
      cursor: 'pointer',
      margin: 4,
    }}
  />
);

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
  const [categoryColor, setCategoryColor] = useState<string>('');

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
    setCategoryColor('');
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
        <FormControl variant="outlined" size="small" sx={{ width: '200px' }}>
          <Select
            value={categoryColor}
            onChange={(event) => setCategoryColor(event.target.value as string)}
            label="Select Color"
            autoWidth
            input={<SelectInput />}
          >
            {colorOptions.map((color) => (
              <MenuItem key={color} value={color}>
                <ColorButton color={color} selectedColor={categoryColor} onClick={() => setCategoryColor(color)} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </SaveDialog>
  );
};
