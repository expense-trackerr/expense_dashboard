import { format } from 'date-fns';

export const isValidDate = (date: Date | string | undefined) => {
  if (typeof date === 'string') {
    const dateFormat = new Date(date);
    return !isNaN(dateFormat.getTime());
  }
  if (date && date.toString() !== 'Invalid Date') return true;
  return false;
};

export const formatDate = (date?: Date | string, showTime = true) => {
  if (!date) return '';
  if (!isValidDate(date)) return '';
  const dateFormat = new Date(date);
  if (showTime) return format(dateFormat, "dd MMM ''yy, HH:mm");
  return format(dateFormat, "dd MMM ''yy");
};
