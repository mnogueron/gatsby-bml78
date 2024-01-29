import React from 'react';
import {graphql} from 'gatsby';
import VideosPageTemplate from '../containers/Videos/VideosPageTemplate';
import PageHead from '../components/PageHead';

const AllVideosPage = ({data}) => {
  const {frontmatter: fm} = data.markdownRemark;

  return (
    <VideosPageTemplate
      heading={fm.heading}
      subheading={fm.subheading}
      videos={fm.videos}
    />
  );
};

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
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
