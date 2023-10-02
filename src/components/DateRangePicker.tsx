import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Typography } from '@mui/material';
import { addDays } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DateRangePicker as DRP, Range, RangeKeyDict } from 'react-date-range';
import { formatDate } from '../utils/function-utils';
import { themeColors } from '../utils/theme-utils';

export const DateRangePicker = () => {
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
    <>
      <Button
        ref={buttonRef}
        onClick={togglePicker}
        variant="outlined"
        startIcon={<CalendarMonthIcon />}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          color: themeColors.greyText,
          border: `1px solid ${themeColors.greyText}`,
        }}
      >
        <Typography variant="body1">
          {formatDate(dateRange[0].startDate, false)}
          <span style={{ marginLeft: '8px', marginRight: '8px' }}>-</span>
          {formatDate(dateRange[0].endDate, false)}
        </Typography>
      </Button>
      {showDateRangePicker && (
        <div
          ref={pickerRef}
          style={{
            position: 'absolute',
            top: '100%',
            right: '-80%',
            zIndex: 1000,
            border: `1px solid ${themeColors.greyText}`,
          }}
        >
          <DRP
            onChange={handleDateRangeChange}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
          />
        </div>
      )}
    </>
  );
};
