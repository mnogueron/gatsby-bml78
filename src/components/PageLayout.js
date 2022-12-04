import React from 'react';
import { Box } from '@chakra-ui/react';

const PageLayout = ({ children, ...boxProps }) => {
  return (
    <Box
      height="100%"
      marginTop={{
        base: 'bml.navbar.height.base',
        sm: 'bml.navbar.height.sm',
        md: 'bml.navbar.height.md',
      }}
      backgroundColor="blackAlpha.20"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default PageLayout;
