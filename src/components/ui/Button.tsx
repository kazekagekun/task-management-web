import React from 'react';
import { Button as MantineButton, ButtonProps } from '@mantine/core';

interface DefaultButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<DefaultButtonProps> = ({
  children,
  onClick,
  ...props
}) => (
  <MantineButton color="teal" onClick={onClick} {...props}>
    {children}
  </MantineButton>
);

export default Button;
