import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, List, ListItem, ListItemText, Paper, Skeleton, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { PlaidContext } from '../../../contexts/PlaidContext';
import { themeColors } from '../../../utils/theme-utils';
import { PlaidLink } from '../../plaid/PlaidLink';
import { gql } from '../../../__generated__/gql';
import { useAuth } from '../../../contexts/AuthContext';
import { useQuery } from '@apollo/client';
import { formatDate } from '../../../utils/function-utils';
import { EditAccountsDialog } from './EditAccountsDialog';

const GET_LINKED_ACCOUNTS = gql(`
    query getLinkedAccounts($userId: String!) {
        getLinkedAccounts(userId: $userId) {
            item_id
            name
            alias_name
            created_at
        }
    }
`);

const LinkAccountButton = ({ linkToken }: { linkToken: string | undefined }) => {
  if (!linkToken) return <Skeleton variant="text" sx={{ fontSize: '3rem', width: '100px' }} />;
  return <PlaidLink />;
};

export const AccountsTab = () => {
  const { linkToken } = useContext(PlaidContext);
  const { currentUser } = useAuth();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { data, error, loading } = useQuery(GET_LINKED_ACCOUNTS, {
    variables: { userId: currentUser?.uid ?? '' },
  });
  const linkedAccounts = data?.getLinkedAccounts;

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  if (loading) return <Skeleton variant="rounded" width="400px" height="300px" />;
  if (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="flex-end">
        <LinkAccountButton linkToken={linkToken} />
        <Paper
          variant="outlined"
          sx={{
            width: '400px',
          }}
        >
          {linkedAccounts?.map((account) => (
            <>
              <EditAccountsDialog
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                accountDetails={{
                  itemId: account.item_id,
                  name: account.name,
                  aliasName: account.alias_name ?? undefined,
                  createdAt: account.created_at,
                }}
              />
              <List key={account.item_id}>
                <ListItem>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <ListItemText primary={account.name} primaryTypographyProps={{ variant: 'h3' }} />
                      <ListItemText
                        primary={formatDate(account.created_at)}
                        primaryTypographyProps={{ variant: 'subtitle1' }}
                        sx={{ color: themeColors.greyText }}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleOpenEditDialog}>
                        <EditIcon sx={{ color: themeColors.greyText }} />
                      </IconButton>
                      <IconButton>
                        <CancelIcon sx={{ color: themeColors.danger }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </>
          ))}
        </Paper>
      </Stack>
    </>
  );
};
