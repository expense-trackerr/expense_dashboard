import { QueryResult } from '@apollo/client';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SaveDialog } from '../../../components/SaveDialog';
import { SelectInput } from '../../../components/Select';
import { CTextField } from '../../../components/TextField';
import { themeColors } from '../../../utils/theme-utils';
import { Exact, GetCategoriesQuery, GetCategoryColorsQuery } from '../../../__generated__/graphql';

type ColorButtonProps = {
  color: string;
  selectedColor: string;
};

const ColorButton = ({ color, selectedColor }: ColorButtonProps) => (
  <div
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
  handleClose: (
    payload:
      | { categoryType: CategoryType; categoryName: string; categoryBudget?: number; categoryColorId: string }
      | undefined
  ) => void;
  categoryColorsGqlResponse: QueryResult<
    GetCategoryColorsQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  categoriesList: GetCategoriesQuery['getCategories'];
};

enum CategoryType {
  EXPENSE = 'Expense',
  INCOME = 'Income',
}

// FIXUI - The Category Type toggle button needs to follow the mock-up

export const AddCategoriesDialog = ({
  open,
  handleClose,
  categoryColorsGqlResponse,
  categoriesList,
}: AddCategoriesDialogProps) => {
  const [categoryType, setCategoryType] = useState<CategoryType>(CategoryType.EXPENSE);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryBudget, setCategoryBudget] = useState<number | ''>('');
  const [selectedCategoryColor, setSelectedCategoryColor] = useState<string>('');

  const doesCategoryNameExist = categoriesList.some((category) => category.name === categoryName);

  const {
    data: categoryColorsData,
    loading: categoryColorsLoading,
    error: categoryColorsError,
  } = categoryColorsGqlResponse;

  const categoryColors = categoryColorsData?.getCategoryColors ?? [];

  // Sets the initial value of categoryColor
  useEffect(() => {
    if (categoryColors.length > 0) {
      setSelectedCategoryColor(categoryColors[0].hex_code);
    }
  }, [categoryColors]);

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
        categoryType,
        categoryName,
        categoryBudget: categoryBudget === '' ? undefined : categoryBudget,
        categoryColorId:
          categoryColors.find((color) => color.hex_code === selectedCategoryColor)?.id ?? categoryColors[0].id,
      };
      handleClose(payload);
    } else {
      handleClose(undefined);
    }
    setCategoryName('');
    setCategoryBudget('');
    setSelectedCategoryColor('');
  };

  return (
    <SaveDialog
      open={open}
      handleCloseDialog={handleCloseDialog}
      dialogTitle="Add Category"
      isSaveButtonDisabled={categoryName === '' || doesCategoryNameExist}
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
          error={doesCategoryNameExist}
          helperText={doesCategoryNameExist ? 'Category name already exists' : ''}
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
          disabled={categoryType === CategoryType.INCOME}
        />
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
          Cateogory Color
        </Typography>
        {categoryColorsLoading ? (
          <Skeleton variant="rounded" width="200px" />
        ) : (
          <FormControl variant="outlined" size="small" sx={{ width: '200px', marginTop: '4px !important' }}>
            <Select
              value={selectedCategoryColor}
              onChange={(event) => setSelectedCategoryColor(event.target.value as string)}
              label="Select Color"
              autoWidth
              input={<SelectInput />}
              disabled={categoryColorsError !== undefined}
              error={categoryColorsError !== undefined}
            >
              {categoryColors.map((color) => (
                <MenuItem key={color.id} value={color.hex_code}>
                  <ColorButton color={color.hex_code} selectedColor={selectedCategoryColor} />
                </MenuItem>
              ))}
            </Select>
            {categoryColorsError !== undefined && (
              <FormHelperText sx={{ color: themeColors.danger }}>Unable to fetch the colors</FormHelperText>
            )}
          </FormControl>
        )}
      </Stack>
    </SaveDialog>
  );
};
