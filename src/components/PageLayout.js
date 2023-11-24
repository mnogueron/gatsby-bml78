import React from 'react';
import {Box} from '@chakra-ui/react';

const PageLayout = ({children, ...boxProps}) => {
  return (
    <Box
      height="100%"
      marginTop={{
        base: 'bml.navbar.height.base',
        sm: 'bml.navbar.height.sm',
        lg: 'bml.navbar.height.md',
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default PageLayout;
