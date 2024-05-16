import React from 'react';
import {Badge, useBreakpointValue} from '@chakra-ui/react';

const BreakpointTag = () => {
  const label = useBreakpointValue(['base', 'sm', 'md', 'lg', 'xl', '2xl']);
  return (
    <Badge
      colorScheme="red"
      fontSize="sm"
      bottom={4}
      right={4}
      position="fixed"
    >
      {label}
    </Badge>
  );
};

export default BreakpointTag;
