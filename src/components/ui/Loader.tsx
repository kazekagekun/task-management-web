import React from 'react';
import { Loader as MantineLoader, LoaderProps } from '@mantine/core';

interface DefaultLoaderProps extends LoaderProps {
  children: React.ReactNode;
}

const Loader: React.FC<DefaultLoaderProps> = ({
  children,
  type = 'dots',
  color = 'teal',
  ...props
}) => (
  <MantineLoader color={color} type={type} {...props}>
    {children}
  </MantineLoader>
);

export default Loader;
