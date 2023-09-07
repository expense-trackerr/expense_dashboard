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
  primaryButtonText?: string;
  primaryButtonColor?: string;
  secondaryButtonText?: string;
};

export const SaveDialog = ({
  open,
  handleCloseDialog,
  dialogTitle,
  isSaveButtonDisabled,
  primaryButtonText = 'Save',
  primaryButtonColor = themeColors.linkText,
  secondaryButtonText = 'Cancel',
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
            color: primaryButtonColor,
            border: `1px solid ${primaryButtonColor}`,
          }}
          disabled={isSaveButtonDisabled}
        >
          {primaryButtonText}
        </Button>
        <Button
          variant="outlined"
          onClick={handleCloseDialog(false)}
          sx={{
            color: themeColors.normalText,
            border: `1px solid ${themeColors.normalText}`,
          }}
        >
          {secondaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
