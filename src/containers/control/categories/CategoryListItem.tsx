import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Fragment } from 'react';
import { themeColors } from '../../../utils/theme-utils';
import { GetCategoriesQuery } from '../../../__generated__/graphql';

type CategoryListItemProps = {
  category: GetCategoriesQuery['getCategories'][0];
  handleOpenEditDialog: (categoryId: string) => void;
  handleOpenDeleteDialog: (categoryId: string) => void;
};

export const CategoryListItem = ({ category, handleOpenEditDialog, handleOpenDeleteDialog }: CategoryListItemProps) => {
  return (
    <Fragment key={category.id}>
      <List>
        <ListItem>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Grid item>
              <ListItemText primary={category.name} sx={{ color: category.category_color, marginBottom: '0px' }} />
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleOpenEditDialog(category.id)}>
                <EditIcon sx={{ color: themeColors.greyText }} />
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteDialog(category.id)}>
                <CancelIcon sx={{ color: themeColors.danger }} />
              </IconButton>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Fragment>
  );
};
