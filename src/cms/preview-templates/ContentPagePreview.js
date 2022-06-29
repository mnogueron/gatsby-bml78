import React from 'react';
import ContentPageTemplate from '../../templates/components/ContentPageTemplate';
import useProcessedHAST from "../useProcessedHAST";

const ContentPagePreview = ({ data }) => {
  const html = useProcessedHAST(data.body);

  return (
    <ContentPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      html={html}
      /*team={team}*/
    />
  )
};

export default ContentPagePreview;
