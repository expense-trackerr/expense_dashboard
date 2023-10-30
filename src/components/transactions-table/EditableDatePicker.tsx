import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as DatePicketMUI } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const EditableDatePicker = ({
  defaultValue,
  onChange,
}: {
  defaultValue: Date | null;
  onChange: (newValue: Date | null) => void;
}) => {
  // const [value, setValue] = useState<Date | null>(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicketMUI
        defaultValue={defaultValue}
        onChange={onChange}
        format="dd MMM 'yy"
        sx={{
          width: '140px',
          '& .MuiInputBase-root': {
            height: '37px',
          },
        }}
      />
    </LocalizationProvider>
  );
};
