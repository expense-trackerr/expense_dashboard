import { useQuery } from '@apollo/client';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import axios from '../../config/axiosConfig';
import { useAuth } from '../../contexts/AuthContext';
import { gql } from '../../__generated__/gql';
import { AddCategoriesDialog } from './AddCategoriesDialog';

export type HandleCloseAddCategoriesDialogProps = (
  shouldSave: boolean,
  values?: { categoryName: string; categoryBudget: number | '' }
) => () => void;

const GET_CATEGORIES = gql(`
  query getCategories($userId: String!) {
    getCategories(userId: $userId) {
      id
      name
    }
  }
`);

export const Categories = () => {
  const { currentUser } = useAuth();
  const [addCategoriesDialogOpen, setAddCategoriesDialogOpen] = useState(false);

  const { data, error, loading, refetch } = useQuery(GET_CATEGORIES, {
    variables: { userId: currentUser?.uid ?? '' },
  });
  const categoriesList = data?.getCategories;

  const handleAddCategory = () => {
    setAddCategoriesDialogOpen(true);
  };

  const handleCloseAddCategoriesDialog: HandleCloseAddCategoriesDialogProps =
    (shouldSave, values) => () => {
      if (shouldSave && values) {
        console.log('Saved', values.categoryName, values.categoryBudget);
      }
      setAddCategoriesDialogOpen(false);
    };

  const handleDeleteCategory = (categoryId: number | undefined | null) => {
    axios
      .post('http://localhost:3000/api/categories/delete', {
        categoriesId: categoryId,
      })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        const axiosError = err as AxiosError<{ message: string }>;
        console.error(axiosError.response?.data.message);
      });
  };

  if (error) console.error(error);
  if (!categoriesList) return <CircularProgress />;

  return (
    <>
      <AddCategoriesDialog
        addCategoriesDialogOpen={addCategoriesDialogOpen}
        handleCloseAddCategoriesDialog={handleCloseAddCategoriesDialog}
      />
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Categories</Typography>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              +
            </Button>
          </Grid>
          <List>
            {loading && <CircularProgress />}
            {categoriesList.map((category, index) => (
              <ListItem key={index}>
                <ListItemText primary={category.name} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <RemoveIcon />
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
