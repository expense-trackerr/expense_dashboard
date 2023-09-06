import moment from 'moment';

export const isValidDate = (date: Date | string | undefined) => {
  if (typeof date === 'string') {
    const dateFormat = new Date(date);
    return !isNaN(dateFormat.getTime());
  }
  if (date && date.toString() !== 'Invalid Date') return true;
  return false;
};

export const formatDate = (date: Date | string) => {
  if (!isValidDate(date)) return '';
  const dateFormat = new Date(date);
  return moment(dateFormat).format("DD MMM 'YY HH:mm");
};
