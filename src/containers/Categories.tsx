import { useQuery } from '@apollo/client';
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
import { useAuth } from '../contexts/AuthContext';
import RemoveIcon from '@mui/icons-material/Remove';
import { gql } from '../__generated__/gql';
import { AxiosError } from 'axios';
import axios from '../config/axiosConfig';

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
  const { data, error, loading } = useQuery(GET_CATEGORIES, {
    variables: { userId: currentUser?.uid ?? '' },
  });
  const categoriesList = data?.getCategories;
  console.log('categoriesList:', categoriesList);

  const handleAddCategory = () => {
    console.log('Added category');
  };

  const handleDeleteCategory = (categoryId: number | undefined | null) => {
    axios
      .post('http://localhost:3000/api/categories/delete', {
        categoriesId: categoryId,
      })
      .catch((err) => {
        const axiosError = err as AxiosError<{ message: string }>;
        console.error(axiosError.response?.data.message);
      });
  };

  if (error) console.error(error);
  if (!categoriesList) return <CircularProgress />;

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Categories</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
          >
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
  );
};
