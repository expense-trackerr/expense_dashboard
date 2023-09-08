import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { themeColors } from '../utils/theme-utils';
import AddIcon from '@mui/icons-material/Add';

type AddButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  primaryButtonColor?: string;
} & ButtonProps;

export const AddButton = ({
  children,
  onClick,
  primaryButtonColor = themeColors.linkText,
  ...rest
}: AddButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: primaryButtonColor,
        border: `1px solid ${primaryButtonColor}`,
      }}
      startIcon={<AddIcon />}
      {...rest}
    >
      {children}
    </Button>
  );
};
