import AddIcon from '@mui/icons-material/Add';
import { Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import { MainButton } from '../../../components/Buttons';
import defaultAxios from '../../../config/axiosConfig';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import { AddCategoriesDialog, AddCategoriesDialogProps, CategoryType } from './AddCategoriesDialog';
import { CategoryListItem } from './CategoryListItem';
import { DeleteCategoryDialog, DeleteCategoryDialogProps } from './DeleteCategoryDialog';
import { EditCategoryDialog, EditCategoryDialogProps } from './EditCategoryDialog';

const categoryDialogDetailsUndefined = {
  id: '',
  name: '',
  budget: undefined,
  category_type: '',
  category_color: '',
};

export const CategoriesTab = () => {
  const [addCategoriesDialogOpen, setAddCategoriesDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const { categoryColorsGqlResponse, categories } = useContext(CategoriesContext);
  console.log('categories:', categories);

  const categoriesList = categories.data ?? [];
  const incomeCategories = useMemo(
    () => categoriesList.filter((category) => category.category_type === CategoryType.INCOME),
    [categoriesList]
  );
  const expenseCategories = useMemo(
    () => categoriesList.filter((category) => category.category_type === CategoryType.EXPENSE),
    [categoriesList]
  );

  const categoryDialogDetails = useMemo(
    () => categoriesList?.find((category) => category.id === selectedCategory) ?? categoryDialogDetailsUndefined,
    [categoriesList, selectedCategory]
  );

  // Open add category dialog
  const handleAddCategoryButtonClick = () => {
    setAddCategoriesDialogOpen(true);
  };

  // Close add category dialog
  const handleCloseAddCategoriesDialog: AddCategoriesDialogProps['handleClose'] = async (payload) => {
    setAddCategoriesDialogOpen(false);
    if (payload?.categoryName) {
      try {
        await defaultAxios.post('http://localhost:3000/api/categories/create', payload);
        // FIXME- Check status and show a snackbar
      } catch (err) {
        console.error(err);
      } finally {
        categories.refetch();
      }
    }
  };

  // Open edit category dialog
  const handleOpenEditDialog = (categoryId: string) => {
    setOpenEditDialog(true);
    setSelectedCategory(categoryId);
  };

  const handleCloseEditCategoryDialog: EditCategoryDialogProps['handleClose'] = async (payload) => {
    setOpenEditDialog(false);
    if (payload?.categoryId) {
      try {
        await defaultAxios.put(`http://localhost:3000/api/categories/update/${payload.categoryId}`, payload);
      } catch (err) {
        console.error(err);
      } finally {
        categories.refetch();
      }
    }
  };

  // Open delete category dialog
  const handleOpenDeleteDialog = (categoryId: string) => {
    setOpenDeleteDialog(true);
    setSelectedCategory(categoryId);
  };

  // Close delete category dialog
  const handleCloseDeleteDialog: DeleteCategoryDialogProps['handleClose'] = async (payload) => {
    setOpenDeleteDialog(false);
    setSelectedCategory(undefined);
    if (payload?.categoryId) {
      try {
        await defaultAxios.delete(`http://localhost:3000/api/categories/delete/${payload.categoryId}`, {
          data: { deleteTransactions: payload.deleteTransactions },
        });
      } catch (err) {
        console.error(err);
      } finally {
        categories.refetch();
      }
    }
  };

  if (categories.loading) return <Skeleton variant="rounded" width="400px" height="300px" />;
  if (categories.error) {
    console.error(categories.error);
    return <div>Error: {categories.error.message}</div>;
  }

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
        <MainButton onClick={handleAddCategoryButtonClick} startIcon={<AddIcon />}>
          Add Category
        </MainButton>
        <AddCategoriesDialog
          open={addCategoriesDialogOpen}
          handleClose={handleCloseAddCategoriesDialog}
          categoryColorsGqlResponse={categoryColorsGqlResponse}
          categoriesList={categoriesList}
        />
        <EditCategoryDialog
          open={openEditDialog}
          handleClose={handleCloseEditCategoryDialog}
          categoryColorsGqlResponse={categoryColorsGqlResponse}
          categoriesList={categoriesList}
          categoryDialogDetails={categoryDialogDetails}
        />
        <DeleteCategoryDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          categoryDialogDetails={categoryDialogDetails}
        />
        {categoriesList?.length ? (
          <Paper
            variant="outlined"
            sx={{
              width: '400px',
              padding: '16px',
            }}
          >
            <Typography variant="h3">Expenses</Typography>
            {expenseCategories?.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                handleOpenEditDialog={handleOpenEditDialog}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
              />
            ))}
            <Typography variant="h3">Income</Typography>
            {incomeCategories?.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                handleOpenEditDialog={handleOpenEditDialog}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
              />
            ))}
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ width: '400px', height: '200px' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h3"> No categories available</Typography>
            </Grid>
          </Paper>
        )}
      </Stack>
    </>
  );
};
