import * as React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import BreakpointTag from './BreakpointTag';

const Layout = ({children, pageContext}) => {
  return (
    <Box>
      <Flex direction="column" height="100vh" justifyContent="space-between">
        <Navbar
          isTransparentAtTop={pageContext?.templateKey === 'index-page'}
        />
        <Box
          as="main"
          mb="auto"
          height="100%"
          marginTop={
            pageContext?.templateKey !== 'index-page'
              ? {
                  base: 'bml.navbar.height.base',
                  sm: 'bml.navbar.height.sm',
                  lg: 'bml.navbar.height.md',
                }
              : 0
          }
        >
          {children}
        </Box>
        <Footer />
      </Flex>

      {/* small badge to display current break-point (only in dev mode) */}
      {process.env.NODE_ENV === 'development' && <BreakpointTag />}
    </Box>
  );
};

export default Layout;
