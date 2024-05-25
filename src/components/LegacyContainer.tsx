import React from 'react';
import {Box, BoxProps} from '@chakra-ui/react';

type LegacyContainerProps = {
  children: React.ReactNode;
} & BoxProps;

/**
 * Basic container to add max-w-7xl, some p-x and p-y
 */
const LegacyContainer = ({children, ...rest}: LegacyContainerProps) => {
  return (
    <Box
      maxW="7xl"
      px={{base: 4, sm: 6, lg: 8}}
      py={{base: 10, lg: 16}}
      mx="auto"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default LegacyContainer;
