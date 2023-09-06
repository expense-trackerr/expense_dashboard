import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, List, ListItem, ListItemText, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { PlaidContext } from '../../../contexts/PlaidContext';
import { themeColors } from '../../../utils/theme-utils';
import { PlaidLink } from '../../plaid/PlaidLink';
import { gql } from '../../../__generated__/gql';
import { useAuth } from '../../../contexts/AuthContext';
import { useQuery } from '@apollo/client';
import { formatDate } from '../../../utils/function-utils';
import { EditAccountsDialog, EditAccountsDialogProps } from './EditAccountsDialog';
import defaultAxios from '../../../config/axiosConfig';

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

  const { data, error, loading, refetch } = useQuery(GET_LINKED_ACCOUNTS, {
    variables: { userId: currentUser?.uid ?? '' },
  });
  const linkedAccounts = data?.getLinkedAccounts;

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog: EditAccountsDialogProps['handleClose'] = async (payload) => {
    setOpenEditDialog(false);
    if (payload?.accountName) {
      try {
        await defaultAxios.put('http://localhost:3000/api/update_account_name', payload);
      } catch (err) {
        console.error(err);
      } finally {
        refetch();
      }
    }
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
        {linkedAccounts?.length ? (
          <Paper
            variant="outlined"
            sx={{
              width: '400px',
            }}
          >
            {linkedAccounts?.map((account) => (
              <Fragment key={account.item_id}>
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
                <List>
                  <ListItem>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <ListItemText
                          primary={account.alias_name ? account.alias_name : account.name}
                          primaryTypographyProps={{ variant: 'h3' }}
                        />
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
              </Fragment>
            ))}
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ width: '400px', height: '200px' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h3"> No linked accounts</Typography>
            </Grid>
          </Paper>
        )}
      </Stack>
    </>
  );
};
