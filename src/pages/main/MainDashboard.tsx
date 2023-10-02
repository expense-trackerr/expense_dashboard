import { Grid, Typography } from '@mui/material';
import { DateRangePicker } from '../../components/DateRangePicker';

export const MainDashboard = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h1">Summary</Typography>
      </Grid>
      <Grid item style={{ position: 'relative' }}>
        <DateRangePicker />
      </Grid>
    </Grid>
  );
};
