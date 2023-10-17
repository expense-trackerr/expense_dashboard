import { Chip } from '@mui/material';
import { GetTransactionsQuery } from '../../__generated__/graphql';

export const CategoryChip = ({ category }: { category: GetTransactionsQuery['getTransactions'][0]['category'] }) => {
  if (category?.name) {
    return <Chip label={category.name} variant="outlined" sx={{ color: category.category_color }} />;
  } else {
    return <Chip label="" variant="outlined" sx={{ borderColor: 'red', width: '80px' }} />;
  }
};
