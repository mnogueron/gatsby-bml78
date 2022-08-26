import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import ArticlesPageTemplate from './components/ArticlesPageTemplate';
import PageLayout from '../components/PageLayout';

const AllResultsPage = ({ data, pageContext }) => {
  const { frontmatter: fm } = data.markdownRemark;
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <ArticlesPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          posts={posts}
          seo={fm.seo}
        />
      </PageLayout>
    </>
  );
};

export default AllResultsPage;

export const allResultsPageQuery = graphql`
  query AllResultsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        subheading
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "result-page" } } }
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
                    transformOptions: { fit: COVER, cropFocus: CENTER }
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
