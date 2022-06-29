import React from 'react';
import { graphql } from 'gatsby';
import MyHelmet from '../components/MyHelmet';
import AboutPageTemplate from './components/AboutPageTemplate';
import PageLayout from '../components/PageLayout';

const InscriptionPage = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter: fm } = post;

  return (
    <>
      <MyHelmet title={fm.title} description={fm.subheading} />
      <PageLayout>
        <AboutPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          html={post.htmlAst}
          team={fm.team}
        />
      </PageLayout>
    </>
  );
};

export default InscriptionPage;

export const inscriptionPageQuery = graphql`
  query InscriptionPage($id: String!) {
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
