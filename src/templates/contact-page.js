import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import ContactPageTemplate from './components/ContactPageTemplate';
import PageLayout from '../components/PageLayout';

function ContactPage({ data, pageContext }) {
  const { markdownRemark: contact } = data;
  const { subheading, heading, contactform } = contact.frontmatter;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <ContactPageTemplate
          heading={heading}
          subheading={subheading}
          contactform={contactform}
          body={contact.htmlAst}
        />
      </PageLayout>
    </>
  );
}

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
