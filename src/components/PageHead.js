import React, {useMemo} from 'react';
import {getSEOData} from '../seoUtils';
import {useLocation} from '@reach/router';
import {graphql, useStaticQuery} from 'gatsby';

const PageHead = ({data, pageContext}) => {
  const {pathname} = useLocation();
  const {seo: override} = pageContext;
  const {site} = useStaticQuery(graphql`
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
  `);

  const seo = useMemo(() => {
    const {
      titleTemplate,
      defaultDescription,
      siteUrl,
      defaultImage,
      defaultTitle,
    } = site.siteMetadata;

    const {title, description, image, article} = getSEOData(data);

    return {
      title: override?.title || title || defaultTitle,
      description: override?.description || description || defaultDescription,
      image: `${siteUrl}${override?.image || image || defaultImage}`,
      url: `${siteUrl}${pathname !== '/' ? pathname : ''}`,
      article,
      titleTemplate,
    };
  }, [
    data,
    override?.description,
    override?.image,
    override?.title,
    pathname,
    site.siteMetadata,
  ]);

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <html lang="en" />

      <title>{seo.titleTemplate.replace('%s', seo.title)}</title>

      {seo.description && (
        <>
          <meta name="description" content={seo.description} />
          <meta name="twitter:description" content={seo.description} />
          <meta property="og:description" content={seo.description} />
          <meta itemProp="description" content={seo.description} />
        </>
      )}

      {seo.title && (
        <>
          <meta name="twitter:title" content={seo.title} />
          <meta name="og:title" content={seo.title} />
          <meta itemProp="name" content={seo.title} />
        </>
      )}

      {seo.image && (
        <>
          <meta name="image" content={seo.image} />
          <meta name="twitter:image" content={seo.image} />
          <meta name="og:image" content={seo.image} />
          <meta property="og:image" content={seo.image} />
          <meta itemProp="name" content={seo.image} />
          <meta itemProp="thumbnailUrl" content={seo.image} />
          <meta itemProp="image" content={seo.image} />
          <meta itemProp="imageUrl" content={seo.image} />
        </>
      )}

      {seo.url && (
        <>
          <meta name="og:url" content={seo.url} />
          <meta itemProp="url" content={seo.url} />
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="og:type" content={seo.article ? 'article' : 'website'} />
    </>
  );
};

export default PageHead;
