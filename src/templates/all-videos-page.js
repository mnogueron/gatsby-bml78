import React from 'react';
import {graphql} from 'gatsby';
import SEO from '../components/SEO';
import PageLayout from '../components/PageLayout';
import VideosPageTemplate from '../containers/Videos/VideosPageTemplate';

const AllVideosPage = ({data, pageContext}) => {
  const {frontmatter: fm} = data.markdownRemark;

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <VideosPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          videos={fm.videos}
          seo={fm.seo}
        />
      </PageLayout>
    </>
  );
};

export default AllVideosPage;

export const allVideosPageQuery = graphql`
  query AllVideosPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        title
        heading
        subheading
        templateKey
        videos {
          id
        }
      }
    }
  }
`;
