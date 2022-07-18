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
    title: titleTemplate.replace('%s', title || defaultTitle),
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname !== '/' ? pathname : ''}`,
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={titleTemplate}
      meta={[
        seo.description && { name: 'description', content: seo.description },
        { name: 'image', content: seo.image },
        seo.title && { name: 'twitter:title', content: seo.title },
        seo.description && {
          name: 'twitter:description',
          content: seo.description,
        },
        seo.image && { name: 'twitter:image', content: seo.image },
        { name: 'twitter:card', content: 'summary_large_image' },
        seo.url && { property: 'og:url', content: seo.url },
        { property: 'og:type', content: article ? 'article' : 'website' },
        seo.title && { property: 'og:title', content: seo.title },
        seo.description && {
          property: 'og:description',
          content: seo.description,
        },
        seo.image && { property: 'og:image', content: seo.image },
        seo.url && { itemProp: 'url', content: seo.url },
        seo.title && { itemProp: 'name', content: seo.title },
        seo.description && {
          itemProp: 'description',
          content: seo.description,
        },
        seo.image && { itemProp: 'thumbnailUrl', content: seo.image },
        seo.image && { itemProp: 'image', content: seo.image },
        seo.image && { itemProp: 'imageUrl', content: seo.image },
      ].filter(Boolean)}
    />
  );
};

export default SEO;

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
