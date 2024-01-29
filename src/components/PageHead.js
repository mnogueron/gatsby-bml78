import React from 'react';
import SEO from './SEO';
import {Helmet} from 'react-helmet';
import useSiteMetadata from './SiteMetadata';

const PageHead = ({data, pageContext}) => {
  const {title, description} = useSiteMetadata();
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title} | BML</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Helmet>
      <SEO data={data} pageContext={pageContext} />
    </>
  );
};

export default PageHead;
