import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { HandleCloseAddCategoriesDialogProps } from './Categories';

type AddCategoriesDialogProps = {
  addCategoriesDialogOpen: boolean;
  handleCloseAddCategoriesDialog: HandleCloseAddCategoriesDialogProps;
};

export const AddCategoriesDialog = ({
  addCategoriesDialogOpen,
  handleCloseAddCategoriesDialog,
}: AddCategoriesDialogProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryBudget, setCategoryBudget] = useState<number | ''>('');

  const isSaveDisabled = categoryName === '';

  const handleCategoryNameTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleCategoryBudgetTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value === 0) {
      setCategoryBudget('');
    } else if (!isNaN(value)) {
      setCategoryBudget(value);
    }
  };

  return (
    <Dialog open={addCategoriesDialogOpen} onClose={handleCloseAddCategoriesDialog(false)}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="Category Name"
          type="text"
          fullWidth
          variant="standard"
          value={categoryName}
          onChange={handleCategoryNameTextChange}
        />
        <TextField
          margin="dense"
          id="budget"
          label="Budget"
          type="number"
          fullWidth
          variant="standard"
          value={categoryBudget}
          onChange={handleCategoryBudgetTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddCategoriesDialog(false)}>Cancel</Button>
        <Button
          onClick={handleCloseAddCategoriesDialog(true, { categoryName, categoryBudget })}
          disabled={isSaveDisabled}
        >
          Create Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};
