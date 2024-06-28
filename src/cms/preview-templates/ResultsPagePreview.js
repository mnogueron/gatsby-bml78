import React from 'react';
import ResultsPageTemplate from '../../containers/Articles/ResultsPageTemplate';

const ResultsPagePreview = ({data}) => {
  return (
    <ResultsPageTemplate heading={data.heading} subheading={data.subheading} />
  );
};

export default ResultsPagePreview;
