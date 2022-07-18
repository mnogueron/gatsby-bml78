import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import ContentPageTemplate from './components/ContentPageTemplate';
import PageLayout from '../components/PageLayout';

const ContentPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter: fm } = post;

  return (
    <>
      <SEO title={fm.title} description={fm.subheading} />
      <PageLayout>
        <ContentPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          html={post.htmlAst}
          team={fm.team}
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
      }
    }
  }
`;
