import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import ContentPageTemplate from './components/ContentPageTemplate';
import PageLayout from '../components/PageLayout';

const ContentPage = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;
  const { frontmatter: fm } = post;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <ContentPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          body={post.htmlAst}
        />
      </PageLayout>
    </>
  );
};

export default ContentPage;

export const contentPageQuery = graphql`
  query ContentPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
        heading
        subheading
        templateKey
      }
    }
  }
`;
