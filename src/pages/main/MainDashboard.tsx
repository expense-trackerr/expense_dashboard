import { Container, Grid } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Categories } from '../../containers/categories/Categories';
import Navbar from '../../containers/NavBar';
import { PlaidContext, PlaidContextProvider } from './PlaidContext';

export function MainDashboard() {
  const { linkToken, linkTokenError } = useContext(PlaidContext);

  useEffect(() => {
    console.log('MainDashboard');
  }, []);

  return (
    <PlaidContextProvider>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Categories />
          </Grid>
          {/* <AddCategories /> */}
        </Grid>
      </Container>
    </PlaidContextProvider>
  );
}
