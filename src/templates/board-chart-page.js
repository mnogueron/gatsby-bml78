import React from 'react';
import {graphql} from 'gatsby';
import SEO from '../components/SEO';
import PageLayout from '../components/PageLayout';
import BoardChartPageTemplate from '../containers/Board/BoardChartPageTemplate';

const BoardChartPage = ({data, pageContext}) => {
  const {markdownRemark: post} = data;
  const {frontmatter: fm} = post;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <BoardChartPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          html={post.htmlAst}
          president={fm.president}
          treasurer={fm.treasurer}
          secretary={fm.secretary}
          team={fm.board}
        />
      </PageLayout>
    </>
  );
};

export default BoardChartPage;

export const boardChartPageQuery = graphql`
  query BoardChartPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      htmlAst
      frontmatter {
        title
        heading
        subheading
        templateKey
        president {
          name
          picture {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
        treasurer {
          name
          picture {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
        secretary {
          name
          picture {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
        board {
          name
          title
          picture {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
