import { Stack, Typography } from '@mui/material';
import { themeColors } from '../utils/theme-utils';

export const NameValueText = ({ name, value }: { name: string; value: string }) => {
  return (
    <Stack direction="column" spacing={0.5}>
      <Typography variant="subtitle1" sx={{ color: themeColors.greyText }}>
        {name}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Stack>
  );
};
