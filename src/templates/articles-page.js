import React, {useMemo} from 'react';
import {graphql, navigate} from 'gatsby';
import ArticlesPageTemplate from '../containers/Articles/ArticlesPageTemplate';
import {preparePosts} from '../utils';
import PageHead from '../components/PageHead';
import Pagination from '../components/Pagination/Pagination';

const ArticlesPage = ({data, pageContext}) => {
  const {frontmatter: fm} = data.markdownRemark;
  const {currentPage, numPages} = pageContext;
  const {edges: posts} = data.allMarkdownRemark;
  const preparedPosts = useMemo(() => preparePosts(posts), [posts]);

  const handlePageChange = page => {
    if (page === 1) {
      navigate(`/articles`);
    } else {
      navigate(`/articles/${page}`);
    }
  };

  return (
    <ArticlesPageTemplate
      heading={fm.heading}
      subheading={fm.subheading}
      posts={preparedPosts}
      disableHighlight={currentPage > 1}
    >
      <Pagination
        mt={16}
        currentPage={currentPage}
        totalPages={numPages}
        onPageChange={handlePageChange}
      />
    </ArticlesPageTemplate>
  );
};

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default ArticlesPage;

export const articlesPageQuery = graphql`
  query ArticlesPage(
    $id: String!
    $hiddenCheck: [Boolean]!
    $skip: Int!
    $limit: Int!
  ) {
    markdownRemark(id: {eq: $id}) {
      html
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
        frontmatter: {
          templateKey: {eq: "article-page"}
          hidden: {in: $hiddenCheck}
        }
      }
      limit: $limit
      skip: $skip
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
            hidden
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
