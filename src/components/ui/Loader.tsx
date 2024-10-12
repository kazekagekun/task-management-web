import React from 'react';
import { Loader as MantineLoader, LoaderProps } from '@mantine/core';

const Loader: React.FC<LoaderProps> = ({
  type = 'dots',
  color = 'teal',
  ...props
}) => <MantineLoader color={color} type={type} {...props} />;

export default Loader;
