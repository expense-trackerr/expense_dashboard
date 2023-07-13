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
import { gql } from '../__generated__/gql';

const GET_CATEGORIES = gql(`
  query getCategories($userId: String!) {
    getCategories(userId: $userId) {
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

  const handleAddCategory = () => {
    console.log('Added category');
  };

  if (error) console.error(error);

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
          {categoriesList?.map((category, index) => (
            <ListItem key={index}>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
