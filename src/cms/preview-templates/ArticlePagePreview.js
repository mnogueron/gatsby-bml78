import React from 'react';
import ArticlePageTemplate from '../../containers/Articles/ArticlePageTemplate';
import useProcessedHAST from '../useProcessedHAST';

const ArticlePagePreview = ({data, getAsset}) => {
  // get image assets and transform markdown
  const image =
    data.featuredimage && data.featuredimage.image
      ? {
          ...data.featuredimage,
          image: getAsset(data.featuredimage.image),
        }
      : {image: null, alt: ''};

  const body = useProcessedHAST(data.body);

  return (
    <ArticlePageTemplate
      heading={data.heading}
      date={
        data.date
          ? new Date(data.date).toLocaleDateString('en-GB', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : undefined
      }
      image={image}
      body={body}
    />
  );
};

export default ArticlePagePreview;
