import * as React from 'react';
import {Box} from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';
import BreakpointTag from './BreakpointTag';
import FeatherChaseProvider from '../containers/FeatherChase/FeatherChaseProvider';

const Layout = ({children, pageContext}) => {
  return (
    <FeatherChaseProvider f={pageContext.feather}>
      <Navbar isTransparentAtTop={pageContext?.templateKey === 'index-page'} />
      <Box
        as="main"
        mb="auto"
        minHeight="100%"
        paddingTop={
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

      {/* small badge to display current break-point (only in dev mode) */}
      {process.env.NODE_ENV === 'development' && <BreakpointTag />}
    </FeatherChaseProvider>
  );
};

export default Layout;
