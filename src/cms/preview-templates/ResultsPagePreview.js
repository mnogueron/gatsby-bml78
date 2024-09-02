import React from 'react';
import ResultsPageTemplate from '../../containers/Articles/ResultsPageTemplate';
import useProcessedHAST from '../useProcessedHAST';

const ResultsPagePreview = ({data}) => {
  const body = useProcessedHAST(data.body);

  return (
    <ResultsPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      posts={[]}
      body={body}
    />
  );
};

export default ResultsPagePreview;
