import React from 'react';
import {graphql} from 'gatsby';
import SEO from '../components/SEO';
import ContentPageTemplate from './components/ContentPageTemplate';
import PageLayout from '../components/PageLayout';
import ArticleNavigation from '../containers/Articles/ArticleNavigation';

const ResultPage = ({data, pageContext}) => {
  const {next, previous} = pageContext;
  const {markdownRemark: result} = data;
  const {frontmatter: fm} = result;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <ContentPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          date={fm.date}
          body={result.htmlAst}
        />

        <ArticleNavigation
          toNext={previous?.fields?.slug}
          nextTitle={
            previous?.frontmatter?.cardTitle || previous?.frontmatter?.heading
          }
          toPrevious={next?.fields?.slug}
          previousTitle={
            next?.frontmatter?.cardTitle || next?.frontmatter?.heading
          }
        />
      </PageLayout>
    </>
  );
};

export default ResultPage;

export const resultQuery = graphql`
  query ResultPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      htmlAst
      excerpt
      frontmatter {
        title
        heading
        subheading
        date
        templateKey
        featuredimage {
          alt
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
