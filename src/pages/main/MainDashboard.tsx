import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';

export const MainDashboard = () => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const handleDateRangeChange = (item: RangeKeyDict) => {
    setDateRange([item.selection]);
  };

  return (
    <DateRangePicker
      onChange={handleDateRangeChange}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={dateRange}
      direction="horizontal"
    />
  );
};
