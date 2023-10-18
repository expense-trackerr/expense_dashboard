import { Grid, Slider, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpenseSavingsBar } from '../../components/ExpenseSavingsBar';
import { themeColors } from '../../utils/theme-utils';

export const OverviewData = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item container sm="auto" justifyContent="flex-start" alignItems="center" spacing={6}>
        <Grid item>
          <Typography variant="h4" sx={{ color: themeColors.creditAmount }}>
            Income
          </Typography>
          <Typography variant="h2">$5000</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ color: themeColors.debitAmount }}>
            Expenses
          </Typography>
          <Typography variant="h2">$3000</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ color: themeColors.neutralAmount }}>
            Savings
          </Typography>
          <Typography variant="h2">$1000</Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="flex-end" sm={4}>
        <ExpenseSavingsBar expenses={4000} savings={1000} />
      </Grid>
    </Grid>
  );
};
