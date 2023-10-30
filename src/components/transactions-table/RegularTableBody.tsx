import { TableCell, Typography } from '@mui/material';
import { formatDate, formatDisplayPrice, getDisplayPriceColor } from '../../utils/function-utils';
import { themeColors } from '../../utils/theme-utils';
import { GetTransactionsQuery } from '../../__generated__/graphql';
import { CategoryChip } from './CategoryChip';

export const RegularTableBody = ({ txn }: { txn: GetTransactionsQuery['getTransactions'][0] }) => {
  return (
    <>
      <TableCell>{formatDate(txn.date, false)}</TableCell>
      <TableCell>
        {txn.name}
        <Typography variant="subtitle1" sx={{ color: themeColors.greyText, marginTop: '0px' }}>
          {txn.linked_sub_account.alias_name ?? txn.linked_sub_account.name}
        </Typography>
      </TableCell>
      <TableCell>
        <CategoryChip category={txn.category} />
      </TableCell>
      <TableCell sx={{ color: getDisplayPriceColor(txn.amount) }}>{formatDisplayPrice(txn.amount)}</TableCell>
    </>
  );
};
