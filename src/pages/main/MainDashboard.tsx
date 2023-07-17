import { Alert, Container, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { Categories } from '../../containers/categories/Categories';
import Navbar from '../../containers/NavBar';
import { PlaidLink } from '../../containers/plaid/PlaidLink';
import { PlaidContext } from './PlaidContext';

export function MainDashboard() {
  const { linkToken, linkTokenError } = useContext(PlaidContext);

  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Categories />
          </Grid>
          {linkToken === null && (
            <>
              <Alert severity="warning">
                Unable to fetch link_token: please make sure your backend server is running and that your .env file has
                been configured correctly.
              </Alert>
              <div>Error Message: {linkTokenError}</div>
            </>
          )}
          {linkToken === '' ? (
            <div>
              <Typography>Loading...</Typography>
            </div>
          ) : (
            <PlaidLink />
          )}

          {/* <AddCategories /> */}
        </Grid>
      </Container>
    </>
  );
}
