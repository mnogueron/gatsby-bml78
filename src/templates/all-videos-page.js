import React from 'react';
import {graphql, navigate} from 'gatsby';
import VideosPageTemplate from '../containers/Videos/VideosPageTemplate';
import PageHead from '../components/PageHead';
import Pagination from '../components/Pagination/Pagination';

const AllVideosPage = ({data, pageContext}) => {
  const {frontmatter: fm} = data.markdownRemark;
  const {currentPage, numPages, limit, skip} = pageContext;

  const handlePageChange = page => {
    if (page === 1) {
      navigate(`/results/videos`);
    } else {
      navigate(`/results/videos/${page}`);
    }
  };

  return (
    <VideosPageTemplate
      heading={fm.heading}
      subheading={fm.subheading}
      videos={fm.videos.slice(skip, skip + limit)}
    >
      <Pagination
        mt={16}
        currentPage={currentPage}
        totalPages={numPages}
        onPageChange={handlePageChange}
      />
    </VideosPageTemplate>
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
