import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { NameValueText } from '../../../components/NameValueText';
import { SaveDialog } from '../../../components/SaveDialog';
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
  const [aliasAccountName, setAliasAccountName] = useState<string>(accountDetails.alias_name ?? '');
  const isAliasAccountNameChanged = useRef<boolean>(false);

  const handleAliasAccountNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAliasAccountName(event.target.value);
    isAliasAccountNameChanged.current = true;
    const initialAliasAccountNameToString = accountDetails.alias_name ?? '';
    if (event.target.value === '' && initialAliasAccountNameToString === '') {
      isAliasAccountNameChanged.current = false;
    }
  };

  // Sets the intial value of aliasAccountName
  useEffect(() => {
    setAliasAccountName(accountDetails.alias_name ?? '');
  }, [accountDetails]);

  useEffect(() => {
    const initialAliasAccountNameToString = accountDetails.alias_name ?? '';
    if (aliasAccountName === initialAliasAccountNameToString) {
      isAliasAccountNameChanged.current = false;
    }
  }, [aliasAccountName]);

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
    <SaveDialog
      open={open}
      handleCloseDialog={handleCloseDialog}
      dialogTitle="Edit Account Details"
      isSaveButtonDisabled={!isAliasAccountNameChanged.current || aliasAccountName === accountDetails.alias_name}
    >
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
    </SaveDialog>
  );
};
