import { format } from 'date-fns';
import Decimal from 'decimal.js-light';
import { themeColors } from './theme-utils';

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

export const formatDisplayPrice = (price: string) => {
  const decimalPrice = new Decimal(price);
  // Plaid returns a negative price for a credit transaction
  if (decimalPrice.isNegative()) {
    return `+ $${decimalPrice
      .abs()
      .toNumber()
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${decimalPrice.toNumber().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const getDisplayPriceColor = (price: string) => {
  const decimalPrice = new Decimal(price);
  if (decimalPrice.isNegative()) {
    return themeColors.creditAmount;
  }
  return themeColors.debitAmount;
};
