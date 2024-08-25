import React from 'react';
import {graphql, PageProps} from 'gatsby';
// @ts-ignore
import ContentPageTemplate from '../containers/Articles/ContentPageTemplate';
// @ts-ignore
import PageHead from '../components/PageHead';
import {SitePageContext} from '../types/gatsby';
import MemberAccessGuard from '../components/MemberAccessGuard';

const BoutiquePage = ({data}: PageProps<Queries.BoutiquePageQuery>) => {
  const {frontmatter: fm, htmlAst} = data.markdownRemark!!;

  if (!fm) {
    return null;
  }

  return (
    <MemberAccessGuard>
      <ContentPageTemplate
        heading={fm.heading}
        subheading={fm.subheading}
        body={htmlAst}
      />
    </MemberAccessGuard>
  );
};

export const Head = ({
  data,
  pageContext,
}: PageProps<Queries.BoutiquePageQuery, SitePageContext>) => {
  return <PageHead data={data} pageContext={pageContext} />;
};

export default BoutiquePage;

export const boutiquePageQuery = graphql`
  query BoutiquePage($id: String!) {
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
