import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Grid, IconButton, List, ListItem, ListItemText, Paper, Skeleton, Stack } from '@mui/material';
import { useContext } from 'react';
import { PlaidContext } from '../../contexts/PlaidContext';
import { themeColors } from '../../utils/theme-utils';
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

const LinkAccountButton = ({ linkToken }: { linkToken: string | undefined }) => {
  //   if (linkToken === undefined)
  //     return (
  //       <Alert severity="warning">
  //         Unable to fetch link_token: please make sure your backend server is running and that your .env file has been
  //         configured correctly.
  //       </Alert>
  //     );
  if (!linkToken) return <Skeleton variant="text" sx={{ fontSize: '3rem', width: '100px' }} />;
  return <PlaidLink />;
};

export const AccountsTab = () => {
  const { linkToken } = useContext(PlaidContext);

  return (
    <Stack direction="column" justifyContent="center" alignItems="flex-end">
      <LinkAccountButton linkToken={linkToken} />
      <Paper
        variant="outlined"
        sx={{
          width: '400px',
        }}
      >
        {mockAccounts.map((account) => (
          <List key={account.id}>
            <ListItem>
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                  <ListItemText primary={account.name} primaryTypographyProps={{ variant: 'h3' }} />
                </Grid>
                <Grid item>
                  <IconButton>
                    <EditIcon sx={{ color: themeColors.greyText }} />
                  </IconButton>
                  <IconButton>
                    <CancelIcon sx={{ color: themeColors.danger }} />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        ))}
      </Paper>
    </Stack>
  );
};
