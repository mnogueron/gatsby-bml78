import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

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

export const getSEOData = (data) => {
  const { frontmatter: fm } = data.markdownRemark;
  switch (fm.templateKey) {
    case 'article-page':
    case 'tournament-page':
      return {
        title: fm.heading,
        description: data.markdownRemark.excerpt,
        image: fm.featuredimage?.image?.childImageSharp?.fixed?.src,
        article: true,
      };
    case 'all-results-page':
    case 'articles-page':
    case 'contact-page':
    case 'content-page':
    case 'board-chart-page':
    case 'index-page':
      return {
        title: fm.title,
        description: fm.subheading,
      };
    case 'result-page': {
      const date = format(new Date(fm.date), 'PP', { locale: frLocale });
      const featuredImageSrc =
        fm.featuredimage?.image?.childImageSharp?.fixed?.src;
      return {
        title: fm.heading,
        description: fm.subheading || `${fm.heading} - ${date}`,
        image: featuredImageSrc?.endsWith('/shuttle.jpg')
          ? undefined
          : featuredImageSrc,
        article: true,
      };
    }
    case 'results-page':
      return {
        title: fm.heading,
        description: fm.subheading,
      };
    default:
      return {};
  }
};

const SEO = ({ data, pageContext }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);
  const { seo: override } = pageContext;
  const {
    title,
    description,
    image,
    article = false,
  } = useMemo(() => getSEOData(data), []);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = site.siteMetadata;

  const seo = {
    title: override?.title || title,
    description: override?.description || description || defaultDescription,
    image: `${siteUrl}${override?.image || image || defaultImage}`,
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
