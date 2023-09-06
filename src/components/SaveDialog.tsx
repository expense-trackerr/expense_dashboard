import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { themeColors } from '../utils/theme-utils';

type SaveDialogProps = {
  open: boolean;
  handleCloseDialog: (shouldSave: boolean) => () => void;
  dialogTitle: string;
  children: React.ReactNode;
  isSaveButtonDisabled?: boolean;
};

export const SaveDialog = ({
  open,
  handleCloseDialog,
  dialogTitle,
  isSaveButtonDisabled,
  children,
}: SaveDialogProps) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog(false)} fullWidth>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleCloseDialog(true)}
          sx={{
            color: themeColors.linkText,
            border: `1px solid ${themeColors.linkText}`,
          }}
          disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={handleCloseDialog(false)}
          sx={{
            color: themeColors.normalText,
            border: `1px solid ${themeColors.normalText}`,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
