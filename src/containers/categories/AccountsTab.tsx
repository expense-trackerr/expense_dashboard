import { Alert, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { PlaidContext } from '../../contexts/PlaidContext';
import { PlaidLink } from '../plaid/PlaidLink';

const mockAccounts = [
  {
    id: '1',
    name: 'TD Bank',
  },
  {
    id: '2',
    name: 'Scotia Bank',
  },
];

export const AccountsTab = () => {
  const { linkToken, linkTokenError } = useContext(PlaidContext);

  return (
    <>
      {linkToken === null && (
        <>
          <Alert severity="warning">
            Unable to fetch link_token: please make sure your backend server is running and that your .env file has been
            configured correctly.
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
      <Paper variant="outlined">
        {mockAccounts.map((account) => (
          <List key={account.id}>
            <ListItem>
              <ListItemText primary={account.name} primaryTypographyProps={{ variant: 'h3' }} />
            </ListItem>
          </List>
        ))}
      </Paper>
    </>
  );
};
