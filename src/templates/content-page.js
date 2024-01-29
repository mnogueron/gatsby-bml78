import React from 'react';
import {graphql} from 'gatsby';
import ContentPageTemplate from '../containers/Articles/ContentPageTemplate';
import PageHead from '../components/PageHead';

const ContentPage = ({data}) => {
  const {markdownRemark: post} = data;
  const {frontmatter: fm} = post;

  return (
    <ContentPageTemplate
      heading={fm.heading}
      subheading={fm.subheading}
      body={post.htmlAst}
    />
  );
};

export const Head = ({data, pageContext}) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default ContentPage;

export const contentPageQuery = graphql`
  query ContentPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      htmlAst
      frontmatter {
        title
        heading
        subheading
        templateKey
      }
    }
  }
`;
