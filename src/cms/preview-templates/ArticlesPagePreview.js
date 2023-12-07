import React from 'react';
import ArticlesPageTemplate from '../../containers/Articles/ArticlesPageTemplate';

const ArticlesPagePreview = ({data}) => {
  return (
    <ArticlesPageTemplate heading={data.heading} subheading={data.subheading} />
  );
};

export default ArticlesPagePreview;
