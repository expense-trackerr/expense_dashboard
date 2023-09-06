import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { NameValueText } from '../../../components/NameValueText';
import { CTextField } from '../../../components/TextField';
import { formatDate } from '../../../utils/function-utils';
import { themeColors } from '../../../utils/theme-utils';
import { GetLinkedAccountsQuery } from '../../../__generated__/graphql';

export type EditAccountsDialogProps = {
  open: boolean;
  handleClose: (payload: { itemId: string; accountName: string } | undefined) => void;
  accountDetails: GetLinkedAccountsQuery['getLinkedAccounts'][0];
};

export const EditAccountsDialog = ({ open, handleClose, accountDetails }: EditAccountsDialogProps) => {
  console.log('accountDetails:', accountDetails);
  const [aliasAccountName, setAliasAccountName] = useState<string>(accountDetails.alias_name ?? '');

  const handleAliasAccountNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAliasAccountName(event.target.value);
  };

  useEffect(() => {
    setAliasAccountName(accountDetails.alias_name ?? '');
  }, [accountDetails]);

  const handleCloseDialog = (shouldSave: boolean) => () => {
    if (shouldSave) {
      const payload = {
        itemId: accountDetails.item_id,
        accountName: aliasAccountName,
      };
      handleClose(payload);
    } else {
      handleClose(undefined);
    }
    setAliasAccountName(accountDetails.alias_name ?? '');
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog(false)} fullWidth>
      <DialogTitle>Edit Account Details</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <NameValueText name="Account Name" value={accountDetails.name} />
          <NameValueText name="Created On" value={formatDate(accountDetails.created_at)} />
          <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
            Alias Account Name
          </Typography>
          <CTextField
            size="small"
            value={aliasAccountName}
            onChange={handleAliasAccountNameChange}
            sx={{ marginTop: '4px !important', width: '200px' }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: themeColors.linkText,
                cursor: 'pointer',
              }}
              onClick={() => console.log('Refresh Access Token')}
            >
              Refresh Access Token
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleCloseDialog(true)}
          sx={{
            color: themeColors.linkText,
            border: `1px solid ${themeColors.linkText}`,
          }}
          disabled={aliasAccountName === accountDetails.alias_name}
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
