import React from 'react';
import { Box } from '@chakra-ui/react';

const PageLayout = ({ children, ...boxProps }) => {
  return (
    <Box
      marginTop={{
        base: 'bml.navbar.height.base',
        sm: 'bml.navbar.height.sm',
        md: 'bml.navbar.height.md',
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default PageLayout;
