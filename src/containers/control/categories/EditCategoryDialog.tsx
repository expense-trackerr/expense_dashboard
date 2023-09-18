import { QueryResult } from '@apollo/client';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SaveDialog } from '../../../components/SaveDialog';
import { SelectInput } from '../../../components/Select';
import { CTextField } from '../../../components/TextField';
import { themeColors } from '../../../utils/theme-utils';
import { Exact, GetCategoriesQuery, GetCategoryColorsQuery } from '../../../__generated__/graphql';
import { CategoryType, ColorButton } from './AddCategoriesDialog';

export type EditCategoryDialogProps = {
  open: boolean;
  handleClose: (
    payload: { categoryName: string; categoryBudget?: number; categoryColorId: string } | undefined
  ) => void;
  categoryColorsGqlResponse: QueryResult<
    GetCategoryColorsQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  categoriesList: GetCategoriesQuery['getCategories'];
  categoryDialogDetails: GetCategoriesQuery['getCategories'][0];
};

export const EditCategoryDialog = ({
  open,
  handleClose,
  categoryColorsGqlResponse,
  categoryDialogDetails,
  categoriesList,
}: EditCategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryBudget, setCategoryBudget] = useState<number | ''>('');
  const [categoryColor, setCategoryColor] = useState<string>('');

  useEffect(() => {
    setCategoryColor(categoryDialogDetails.category_color);
  }, [categoryDialogDetails.category_color, open]);

  const doesCategoryNameExist = categoriesList.some((category) => category.name === categoryName);

  const {
    data: categoryColorsData,
    loading: categoryColorsLoading,
    error: categoryColorsError,
  } = categoryColorsGqlResponse;

  const categoryColors = categoryColorsData?.getCategoryColors ?? [];

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
        categoryColorId: categoryColors.find((color) => color.hex_code === categoryColor)?.id ?? categoryColors[0].id,
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
      dialogTitle="Edit Category"
      isSaveButtonDisabled={categoryName === '' || doesCategoryNameExist}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
          Category Type
        </Typography>
        <Typography variant="body1">{categoryDialogDetails?.category_type}</Typography>
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
          Category Name
        </Typography>
        <CTextField
          size="small"
          required
          value={categoryName}
          placeholder={categoryDialogDetails.name}
          onChange={handleCategoryNameChange}
          sx={{ marginTop: '4px !important', width: '200px' }}
          error={doesCategoryNameExist}
          helperText={doesCategoryNameExist ? 'Category name already exists' : ''}
        />
        {categoryDialogDetails.category_type === CategoryType.EXPENSE && (
          <>
            <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
              Budget per month
            </Typography>
            <CTextField
              size="small"
              value={categoryBudget}
              placeholder={categoryDialogDetails.budget?.toString()}
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
          </>
        )}
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
          Cateogory Color
        </Typography>
        {categoryColorsLoading ? (
          <Skeleton variant="rounded" width="200px" />
        ) : (
          <FormControl variant="outlined" size="small" sx={{ width: '200px', marginTop: '4px !important' }}>
            <Select
              value={categoryColor}
              onChange={(event) => setCategoryColor(event.target.value as string)}
              label="Select Color"
              autoWidth
              input={<SelectInput />}
              disabled={categoryColorsError !== undefined}
              error={categoryColorsError !== undefined}
            >
              {categoryColors.map((color) => (
                <MenuItem key={color.id} value={color.hex_code}>
                  <ColorButton color={color.hex_code} selectedColor={categoryColor} />
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
