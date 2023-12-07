import React from 'react';
import ContentPageTemplate from '../../containers/Articles/ContentPageTemplate';
import useProcessedHAST from '../useProcessedHAST';

const ContentPagePreview = ({data}) => {
  const body = useProcessedHAST(data.body);

  return (
    <ContentPageTemplate
      heading={data.heading}
      subheading={data.subheading}
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
      body={body}
    />
  );
};

export default ContentPagePreview;
