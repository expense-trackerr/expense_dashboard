import { Slider, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { themeColors } from '../utils/theme-utils';

const StyledSlider = styled(Slider)({
  height: 10, // Set the height of the bar

  '&.MuiSlider-root': {
    borderRadius: '2px',
  },
  '& .MuiSlider-thumb': {
    display: 'none', // Hide the thumb
    pointerEvents: 'none',
  },
  '& .MuiSlider-track': {
    backgroundColor: themeColors.debitAmount, // Set the color for expenses
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: themeColors.neutralAmount, // Set the color for savings
    opacity: 1,
  },
});

export const ExpenseSavingsBar = ({ expenses, savings }: { expenses: number; savings: number }) => {
  const total = expenses + savings;

  const expensePercentage = (expenses / total) * 100;

  const handleSliderChange = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Tooltip title={`Expenses: ${expensePercentage}%, Savings: ${100 - expensePercentage}%`} arrow>
      <StyledSlider value={expensePercentage} onChange={handleSliderChange} />
    </Tooltip>
  );
};
