import React from 'react';
import IndexPageTemplate from '../../templates/components/IndexPageTemplate';

const IndexPagePreview = ({ data, getAsset }) => {
  return (
    <IndexPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      image={getAsset(data.image)}
      posts={[]}
      about={data.about || {}}
      about_image={getAsset(data.about.image.image)}
    />
  );
};

export default IndexPagePreview;
