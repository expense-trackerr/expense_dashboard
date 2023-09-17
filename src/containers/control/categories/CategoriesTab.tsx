import { useQuery } from '@apollo/client';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, List, ListItem, ListItemText, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { AddButton } from '../../../components/Buttons';
import defaultAxios from '../../../config/axiosConfig';
import { useAuth } from '../../../contexts/AuthContext';
import { themeColors } from '../../../utils/theme-utils';
import { gql } from '../../../__generated__';
import { AddCategoriesDialog, AddCategoriesDialogProps } from './AddCategoriesDialog';

const GET_CATEGORY_COLORS = gql(`
query getCategoryColors {
  getCategoryColors {
    id
    name
    hex_code
}
}
`);

const GET_CATEGORIES = gql(`
query getCategories($userId: String!) {
    getCategories(userId: $userId) {
        id
        name
        budget
        category_type
        category_color
    }
}
`);

export const CategoriesTab = () => {
  const { currentUser } = useAuth();
  const [addCategoriesDialogOpen, setAddCategoriesDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const categoryColorsGqlResponse = useQuery(GET_CATEGORY_COLORS);
  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
    refetch: categoriesRefetch,
  } = useQuery(GET_CATEGORIES, { variables: { userId: currentUser?.uid ?? '' } });

  const categoriesList = categoriesData?.getCategories;

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
      } catch (err) {
        console.error(err);
      } finally {
        categoriesRefetch();
      }
    }
  };

  // Open edit category dialog
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  // Open delete category dialog
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    // setSelectedAccount(itemId);
  };

  // Close delete category dialog
  const handleCloseDeleteDialog = async () => {
    setOpenDeleteDialog(false);
    // setSelectedAccount(undefined);
    // if (payload?.itemId) {
    //   try {
    //     await defaultAxios.post('http://localhost:3000/api/item/remove', payload);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     linkedAccountRefetch();
    //   }
    // }
  };

  if (categoriesLoading) return <Skeleton variant="rounded" width="400px" height="300px" />;
  if (categoriesError) {
    console.error(categoriesError);
    return <div>Error: {categoriesError.message}</div>;
  }

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
        <AddButton onClick={handleAddCategoryButtonClick}>Add Category</AddButton>
        {categoriesList?.length ? (
          <Paper
            variant="outlined"
            sx={{
              width: '400px',
            }}
          >
            <AddCategoriesDialog
              open={addCategoriesDialogOpen}
              handleClose={handleCloseAddCategoriesDialog}
              categoryColorsGqlResponse={categoryColorsGqlResponse}
            />
            {categoriesList?.map((category) => (
              <Fragment key={category.id}>
                <List>
                  <ListItem>
                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Grid item>
                        <ListItemText
                          primary={category.name}
                          sx={{ color: category.category_color, marginBottom: '0px' }}
                        />
                        {category.budget && (
                          <ListItemText
                            primary={`$${category.budget} per month`}
                            primaryTypographyProps={{ variant: 'subtitle1' }}
                            sx={{ color: themeColors.greyText, marginTop: '0px' }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <IconButton onClick={handleOpenEditDialog}>
                          <EditIcon sx={{ color: themeColors.greyText }} />
                        </IconButton>
                        <IconButton onClick={handleOpenDeleteDialog}>
                          <CancelIcon sx={{ color: themeColors.danger }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Fragment>
            ))}
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ width: '400px', height: '200px' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h3"> No categories created</Typography>
            </Grid>
          </Paper>
        )}
      </Stack>
    </>
  );
};
