import React, {useMemo} from 'react';
import {graphql} from 'gatsby';
import ResultsPageTemplate from '../containers/Articles/ResultsPageTemplate';
import {preparePosts} from '../utils';
import PageHead from '../components/PageHead';

const ResultsPage = ({data}) => {
  const {frontmatter: fm} = data.markdownRemark;
  const {edges: posts} = data.allMarkdownRemark;
  const preparedPosts = useMemo(() => preparePosts(posts), [posts]);

  return (
    <ResultsPageTemplate
      heading={fm.heading}
      subheading={fm.subheading}
      posts={preparedPosts}
      body={data.markdownRemark.htmlAst}
    />
  );
};

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default ResultsPage;

export const resultsPageQuery = graphql`
  query ResultsPage($id: String!, $title: String!) {
    markdownRemark(id: {eq: $id}) {
      html
      htmlAst
      frontmatter {
        title
        heading
        subheading
        templateKey
      }
    }
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {templateKey: {eq: "result-page"}, category: {eq: $title}}
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            cardTitle
            heading
            templateKey
            category
            date
            featuredimage {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 640
                    placeholder: BLURRED
                    aspectRatio: 1.5
                    transformOptions: {fit: COVER, cropFocus: CENTER}
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
