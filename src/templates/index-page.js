import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

import IndexPageTemplate from './components/IndexPageTemplate';
import PageLayout from '../components/PageLayout';

const IndexPage = ({ data, pageContext }) => {
  const { frontmatter: fm } = data.markdownRemark;

  // latest posts and results
  const { edges: posts } = data.allPostsMarkdownRemark;
  const { edges: results } = data.allResultsMarkdownRemark;
  const videos = useMemo(() => {
    if (data.allVideosMarkdownRemark.edges.length === 0) {
      return [];
    }

    return data.allVideosMarkdownRemark.edges[0].node.frontmatter.videos;
  }, []);

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout marginTop={0}>
        <IndexPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          image={fm.image}
          headerImage={fm.headerImage}
          banner={fm.banner}
          clubSectionContent={data.markdownRemark.htmlAst}
          posts={posts}
          results={results}
          videos={videos}
          about={fm.about}
        />
      </PageLayout>
    </>
  );
};

export default IndexPage;

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
        templateKey
        image {
          childImageSharp {
            gatsbyImageData(width: 1024, placeholder: BLURRED)
          }
        }
        headerImage {
          childImageSharp {
            gatsbyImageData(width: 1024, placeholder: BLURRED)
          }
        }
        heading
        subheading
        banner {
          text
          level
          hide
        }
      }
    }
    allVideosMarkdownRemark: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "all-videos-page" } } }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            videos {
              id
            }
          }
        }
      }
    }
    allPostsMarkdownRemark: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "article-page" } } }
      limit: 5
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
            date
            featuredimage {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 640
                    placeholder: BLURRED
                    aspectRatio: 1.5
                  )
                }
              }
            }
          }
        }
      }
    }
    allResultsMarkdownRemark: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "result-page" } } }
      limit: 3
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
            date
            featuredimage {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 640
                    placeholder: BLURRED
                    aspectRatio: 1.5
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
