import { gql, useQuery } from '@apollo/client';
import {
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const GET_CATEGORIES = gql`
  query getCategories($userId: String!) {
    getCategories(userId: $userId) {
      name
    }
  }
`;

const categories = ['Category 1', 'Category 2', 'Category 3']; // Replace with your actual category data

export const Categories = () => {
  const { currentUser } = useAuth();
  const { data, error, loading } = useQuery(GET_CATEGORIES, {
    variables: { userId: currentUser?.uid },
  });
  const categoriesList = data?.getCategories;

  const handleAddCategory = () => {
    console.log('Added category');
  };

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
          {categories.map((category, index) => (
            <ListItem key={index}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
