import React from 'react';
import {Badge, Box, useBreakpointValue} from '@chakra-ui/react';

const BreakpointTag = () => {
  const breakpoint = useBreakpointValue([
    'base',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
  ]);
  return (
    <Box bottom={4} right={4} position="fixed">
      <Badge colorScheme="red" fontSize="sm">
        {breakpoint}
      </Badge>
    </Box>
  );
};

export default BreakpointTag;
