import React from 'react';
import {graphql} from 'gatsby';
import ArticlePageTemplate from '../containers/Articles/ArticlePageTemplate';
import ArticleNavigation from '../containers/Articles/components/ArticleNavigation';
import PageHead from '../components/PageHead';

const ArticlePage = ({data, pageContext}) => {
  const {next, previous} = pageContext;
  const {markdownRemark: project} = data;
  const {frontmatter: fm} = project;

  return (
    <>
      <ArticlePageTemplate
        heading={fm.heading}
        date={fm.date}
        image={fm.featuredimage}
        body={project.htmlAst}
      />

      <ArticleNavigation
        toNext={previous?.fields?.slug}
        nextTitle={
          previous?.frontmatter?.cardTitle || previous?.frontmatter?.title
        }
        toPrevious={next?.fields?.slug}
        previousTitle={next?.frontmatter?.cardTitle || next?.frontmatter?.title}
      />
    </>
  );
};

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default ArticlePage;

export const articleQuery = graphql`
  query ArticlePage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      htmlAst
      excerpt
      frontmatter {
        title
        heading
        date
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
