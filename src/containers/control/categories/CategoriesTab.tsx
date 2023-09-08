import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ExpandableListItem } from '../../../components/ExpandableListItem';
import { formatDate } from '../../../utils/function-utils';
import { themeColors } from '../../../utils/theme-utils';

export const CategoriesTab = () => {
  const categories = [];

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="flex-end">
        {/* <LinkAccountButton linkToken={linkToken} /> */}
        {categories?.length ? (
          <Paper
            variant="outlined"
            sx={{
              width: '400px',
            }}
          >
            {categories?.map((account) => (
              <Fragment key={account.item_id}>
                <List>
                  <ListItem>
                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Grid item>
                        <ExpandableListItem
                          primaryText={account.alias_name ? account.alias_name : account.name}
                          secondaryText={formatDate(account.created_at)}
                          nestedItems={account.linked_sub_accounts?.map((subAccount) => (
                            <Stack
                              key={subAccount.account_id}
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <ListItemText primary={subAccount.alias_name ? subAccount.alias_name : subAccount.name} />
                              <ListItemText primary={`$${subAccount.balance}`} />
                            </Stack>
                          ))}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleOpenEditDialog(account.item_id)}>
                          <EditIcon sx={{ color: themeColors.greyText }} />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteDialog(account.item_id)}>
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
              <Typography variant="h3"> No categories created</Typography>
            </Grid>
          </Paper>
        )}
      </Stack>
    </>
  );
};
