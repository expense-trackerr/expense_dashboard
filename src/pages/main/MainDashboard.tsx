import { Alert, Button, Container, Grid, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import defaultAxios from '../../config/axiosConfig';
import { Categories } from '../../containers/categories/Categories';
import { PlaidLink } from '../../containers/plaid/PlaidLink';
import { PlaidContext } from './PlaidContext';
import { NavBar } from '../../containers/NavBar';

export function MainDashboard() {
  const { linkToken, linkTokenError, accessToken } = useContext(PlaidContext);

  // const [transactions, setTransactions] = useState();

  const handleGetTransactions = () => {
    if (accessToken) {
      defaultAxios
        .get('http://localhost:3000/api/transactions')
        .then((res) => {
          console.log(res.data);
          // setTransactions(res.data.transactions);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={2}>
          <Grid item md={4}></Grid>
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
          {accessToken && <Button onClick={handleGetTransactions}>Get transactions</Button>}
        </Grid>
      </Container>
    </>
  );
}
