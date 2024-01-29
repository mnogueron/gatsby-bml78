import React from 'react';
import {graphql} from 'gatsby';
import ArticlePageTemplate from '../containers/Articles/ArticlePageTemplate';
import PageHead from '../components/PageHead';

const TournamentPage = ({data}) => {
  const {markdownRemark: project} = data;
  const {frontmatter: fm} = project;

  return (
    <ArticlePageTemplate
      location={fm.location}
      heading={fm.heading}
      image={fm.featuredimage}
      body={project.htmlAst}
    />
  );
};

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default TournamentPage;

export const tournamentQuery = graphql`
  query TournamentPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
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
