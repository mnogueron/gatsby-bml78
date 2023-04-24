import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import ArticlePageTemplate from './components/ArticlePageTemplate';
import PageLayout from '../components/PageLayout';

const TournamentPage = ({ data, pageContext }) => {
  const { markdownRemark: project } = data;
  const { frontmatter: fm } = project;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <ArticlePageTemplate
          location={fm.location}
          heading={fm.heading}
          image={fm.featuredimage}
          body={project.htmlAst}
        />
      </PageLayout>
    </>
  );
};

export default TournamentPage;

export const tournamentQuery = graphql`
  query TournamentPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      excerpt
      frontmatter {
        title
        heading
        templateKey
        featuredimage {
          alt
          hidden
          image {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
              fixed {
                src
              }
            }
          }
        }
      }
    }
  }
`;
