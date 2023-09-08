import { Grid, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { AddButton } from '../../../components/Buttons';
import { AddCategoriesDialog, AddCategoriesDialogProps } from './AddCategoriesDialog';

const mockCategories = [
  {
    id: 1,
    name: 'Groceries',
  },
  {
    id: 2,
    name: 'Restaurants',
  },
  {
    id: 3,
    name: 'Gas',
  },
];

export const CategoriesTab = () => {
  const [addCategoriesDialogOpen, setAddCategoriesDialogOpen] = useState(false);

  const handleAddCategoryButtonClick = () => {
    setAddCategoriesDialogOpen(true);
  };

  const handleCloseAddCategoriesDialog: AddCategoriesDialogProps['handleClose'] = (payload) => {
    setAddCategoriesDialogOpen(false);
    if (payload?.categoryName) {
      console.log('Sending request to add category', payload.categoryName);
    }
  };

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={2}>
        <AddButton onClick={handleAddCategoryButtonClick}>Add Category</AddButton>
        {mockCategories?.length ? (
          <Paper
            variant="outlined"
            sx={{
              width: '400px',
            }}
          >
            <AddCategoriesDialog open={addCategoriesDialogOpen} handleClose={handleCloseAddCategoriesDialog} />
            {mockCategories?.map((category) => (
              <Fragment key={category.id}>
                <List>
                  <ListItem>
                    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Grid item>
                        <ListItemText primary={category.name} />
                      </Grid>
                      <Grid item>
                        {/* <IconButton onClick={() => handleOpenEditDialog(account.item_id)}>
                          <EditIcon sx={{ color: themeColors.greyText }} />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDeleteDialog(account.item_id)}>
                          <CancelIcon sx={{ color: themeColors.danger }} />
                        </IconButton> */}
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
