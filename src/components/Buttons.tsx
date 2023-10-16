import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { themeColors } from '../utils/theme-utils';

type MainButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  buttonColor?: string;
  startIcon?: React.ReactNode;
} & ButtonProps;

export const MainButton = ({
  children,
  onClick,
  buttonColor = themeColors.linkText,
  startIcon,
  ...rest
}: MainButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: buttonColor,
        border: `1px solid ${buttonColor}`,
      }}
      startIcon={startIcon}
      {...rest}
    >
      {children}
    </Button>
  );
};

type SecondaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  buttonColor?: string;
} & ButtonProps;

export const SecondaryButton = ({
  children,
  onClick,
  buttonColor = themeColors.normalText,
  ...rest
}: SecondaryButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        color: buttonColor,
        border: `1px solid ${buttonColor}`,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
