import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
      }
    }
  }
`;

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname !== '/' ? pathname : ''}`,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && [
          <meta property="og:url" content={seo.url} />,
          <meta itemProp="url" content={seo.url} />
        ]
      }
      <meta property="og:type" content={article ? 'article' : 'website'} />
      {seo.title && [
          <meta property="og:title" content={seo.title} />,
          <meta itemProp="name" content={seo.title} />,
          <meta name="twitter:title" content={seo.title} />,
      ]}
      {seo.description && [
          <meta property="og:description" content={seo.description} />,
          <meta itemProp="description" content={seo.description} />,
          <meta name="twitter:description" content={seo.description} />,
      ]}
      {seo.image && [
          <meta property="og:image" content={seo.image} />,
          <meta itemProp="thumbnailUrl" content={seo.image} />,
          <meta itemProp="image" content={seo.image} />,
          <meta itemProp="imageUrl" content={seo.image} />,
          <meta name="twitter:image" content={seo.image} />,
      ]}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
