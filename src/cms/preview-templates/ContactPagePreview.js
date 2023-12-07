import React from 'react';
import ContactPageTemplate from '../../containers/Contact/ContactPageTemplate';
import useProcessedHAST from '../useProcessedHAST';

const ContactPagePreview = ({data, getAsset}) => {
  const html = useProcessedHAST(data.body);
  // get image assets and transform markdown
  const contactform = {
    ...data.contactform,
    image: getAsset(data.contactform.image),
  };

  return (
    <ContactPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      contactform={contactform}
      body={html}
    />
  );
};

export default ContactPagePreview;
