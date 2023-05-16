import * as React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import useSiteMetadata from './SiteMetadata';
import { useScroll } from '../hooks/useScroll';
import BreakpointTag from './BreakpointTag';
import {Box} from "@chakra-ui/react";

const Layout = ({ children, pageContext }) => {
  // set global title and description on global layout, can be overwritten on a per-page basis with MyHelmet
  const { title, description } = useSiteMetadata();
  const { scrollY, scrollDirection } = useScroll();

  return (
    <Box>
      <Helmet>
        <html lang="en" />
        <title>{title} | BML</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="flex flex-col h-screen justify-between">
        <Navbar
          className={`transition transform duration-300 ease-in-out ${
            scrollDirection === 'down' || scrollY < 200
              ? ''
              : '-translate-y-full'
          }`}
          isTransparentAtTop={pageContext.templateKey === 'index-page'}
        />
        {/* Navbar height will be h-12 sm:h-14 md:h-18 */}
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>

      {/* small badge to display current break-point (only in dev mode) */}
      {process.env.NODE_ENV === 'development' && <BreakpointTag />}
    </Box>
  );
};

export default Layout;
