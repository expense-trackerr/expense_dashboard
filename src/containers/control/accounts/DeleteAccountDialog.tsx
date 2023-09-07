import { Stack, Typography } from '@mui/material';
import { SaveDialog } from '../../../components/SaveDialog';
import { themeColors } from '../../../utils/theme-utils';
import { GetLinkedAccountsQuery } from '../../../__generated__/graphql';

export type EditAccountsDialogProps = {
  open: boolean;
  handleClose: (payload: { itemId: string } | undefined) => void;
  accountDetails: GetLinkedAccountsQuery['getLinkedAccounts'][0];
};

export const DeleteAccountDialog = ({ open, handleClose, accountDetails }: EditAccountsDialogProps) => {
  const handleCloseDialog = (shouldSave: boolean) => () => {
    if (shouldSave) {
      const payload = {
        itemId: accountDetails.item_id,
      };
      handleClose(payload);
    } else {
      handleClose(undefined);
    }
  };

  return (
    <SaveDialog open={open} handleCloseDialog={handleCloseDialog} dialogTitle="Delete Account">
      <Stack direction="column" spacing={2}>
        <Typography variant="body1" sx={{ color: themeColors.normalText }}>
          Are you sure you want to delete this account? The transactions linked to this account will be shown as "Delete
          account"
        </Typography>
      </Stack>
    </SaveDialog>
  );
};
