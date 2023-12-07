import React from 'react';
import {Box} from '@chakra-ui/react';

/**
 * Basic container to add max-w-7xl, some p-x and p-y
 */
const LegacyContainer = ({children, ...rest}) => {
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
