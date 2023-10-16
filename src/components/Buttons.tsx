import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { themeColors } from '../utils/theme-utils';

type MainButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  primaryButtonColor?: string;
  startIcon?: React.ReactNode;
} & ButtonProps;

export const MainButton = ({
  children,
  onClick,
  primaryButtonColor = themeColors.linkText,
  startIcon,
  ...rest
}: MainButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: primaryButtonColor,
        border: `1px solid ${primaryButtonColor}`,
      }}
      startIcon={startIcon}
      {...rest}
    >
      {children}
    </Button>
  );
};
