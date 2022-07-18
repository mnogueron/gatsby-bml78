import React from 'react';
import ArticlePageTemplate from '../../templates/components/ArticlePageTemplate';
import useProcessedHAST from "../useProcessedHAST";

const ArticlePagePreview = ({ data, entry, getAsset }) => {
  // get image assets and transform markdown
  const image =
    data.featuredimage && data.featuredimage.image
      ? {
          ...data.featuredimage,
          image: getAsset(data.featuredimage.image),
        }
      : { image: null, alt: '' };

  const body = useProcessedHAST(data.body);

  return (
    <ArticlePageTemplate
      title={data.title}
      date={new Date(data.date).toLocaleDateString('en-GB', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
      image={image}
      body={body}
    />
  );
};

export default ArticlePagePreview;
