import React from 'react';
import { graphql } from 'gatsby';
import MyHelmet from '../components/MyHelmet';
import ContactPageTemplate from './components/ContactPageTemplate';
import PageLayout from '../components/PageLayout';

function ContactPage({ data }) {
  const { markdownRemark: contact } = data;
  const { title, subheading, heading, contactform, office } =
    contact.frontmatter;

  return (
    <>
      <MyHelmet title={title} description={subheading} />
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
