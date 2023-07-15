import { Container, Grid } from '@mui/material';
import { Categories } from '../containers/categories/Categories';
import Navbar from '../containers/NavBar';

export function MainDashboard() {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Categories />
          </Grid>
          {/* <AddCategories /> */}
        </Grid>
      </Container>
    </>
  );
}
