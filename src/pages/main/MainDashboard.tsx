import { Button, Grid, Typography } from '@mui/material';
import { addDays } from 'date-fns';
import { useState, useRef, useEffect } from 'react';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { formatDate } from '../../utils/function-utils';

export const MainDashboard = () => {
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close date range picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // ensures that event listener returns early if the picker button is clicked
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return;
      }
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowDateRangePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateRangeChange = (item: RangeKeyDict) => {
    setDateRange([item.selection]);
  };

  const togglePicker = () => {
    setShowDateRangePicker(!showDateRangePicker);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h1">Summary</Typography>
      </Grid>
      <Grid item style={{ position: 'relative' }}>
        <Button ref={buttonRef} onClick={togglePicker}>
          {formatDate(dateRange[0].startDate, false)} - {formatDate(dateRange[0].endDate, false)}
        </Button>
        {showDateRangePicker && (
          <div ref={pickerRef} style={{ position: 'absolute', top: '100%', right: '-80%', zIndex: 1000 }}>
            <DateRangePicker
              onChange={handleDateRangeChange}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={dateRange}
              direction="horizontal"
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
};
