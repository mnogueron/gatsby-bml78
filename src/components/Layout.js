import * as React from 'react';
import {Helmet} from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import useSiteMetadata from './SiteMetadata';
import BreakpointTag from './BreakpointTag';
import {Box, Flex} from '@chakra-ui/react';

const Layout = ({children, pageContext}) => {
  // set global title and description on global layout, can be overwritten on a per-page basis with MyHelmet
  const {title, description} = useSiteMetadata();

  return (
    <Box>
      <Helmet>
        <html lang="en" />
        <title>{title} | BML</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Helmet>
      <Flex direction="column" height="100vh" justifyContent="space-between">
        <Navbar
          isTransparentAtTop={pageContext?.templateKey === 'index-page'}
        />
        <Box as="main" mb="auto">
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
