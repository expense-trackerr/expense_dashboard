import { InputLabel, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { NameValueText } from '../../../components/NameValueText';
import { CTextField } from '../../../components/TextField';
import { themeColors } from '../../../utils/theme-utils';

type EditAccountsDialogProps = {
  open: boolean;
  handleClose: () => void;
  accountDetails: {
    itemId: string;
    name: string;
    aliasName: string | undefined;
    createdAt: string;
  };
};

export const EditAccountsDialog = ({ open, handleClose, accountDetails }: EditAccountsDialogProps) => {
  const [aliasAccountName, setAliasAccountName] = useState<string>('');

  const handleAliasAccountNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAliasAccountName(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Account Details</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <NameValueText name="Account Name" value={accountDetails.name} />
          <NameValueText name="Created On" value={accountDetails.createdAt} />
          <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
            Alias Account Name
          </Typography>
          <CTextField
            size="small"
            value={aliasAccountName}
            onChange={handleAliasAccountNameChange}
            sx={{ marginTop: '4px !important' }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
