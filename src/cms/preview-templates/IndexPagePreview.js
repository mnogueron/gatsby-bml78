import React from 'react';
import IndexPageTemplate from '../../templates/components/IndexPageTemplate';
import useProcessedHAST from "../useProcessedHAST";

const IndexPagePreview = ({ data, getAsset }) => {
  const clubSectionContent = useProcessedHAST(data.body);

  return (
    <IndexPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      image={getAsset(data.image)}
      headerImage={getAsset(data.headerImage)}
      banner={data.banner}
      clubSectionContent={clubSectionContent}
      posts={[]}
      results={[]}
      videos={[]}
    />
  );
};

export default IndexPagePreview;
