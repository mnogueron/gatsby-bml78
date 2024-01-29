import React from 'react';
import {graphql} from 'gatsby';
import ContactPageTemplate from '../containers/Contact/ContactPageTemplate';
import PageHead from '../components/PageHead';

function ContactPage({data}) {
  const {markdownRemark: contact} = data;
  const {subheading, heading, contactform} = contact.frontmatter;

  return (
    <ContactPageTemplate
      heading={heading}
      subheading={subheading}
      contactform={contactform}
      body={contact.htmlAst}
    />
  );
}

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      htmlAst
      frontmatter {
        title
        heading
        subheading
        templateKey
        contactform {
          heading
          description
          image {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
