import React from 'react';
import { graphql, Link } from 'gatsby';
import MyHelmet from '../components/MyHelmet';
import { Container } from '../components/Sections';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import ArticlePageTemplate from './components/ArticlePageTemplate';
import PageLayout from '../components/PageLayout';

const ArticlePage = ({ data, pageContext }) => {
  const { next, previous } = pageContext;
  const { markdownRemark: project } = data;
  const { frontmatter: fm } = project;

  return (
    <>
      <MyHelmet title={fm.title} description={project.excerpt} />
      <PageLayout>
        <ArticlePageTemplate
          location={fm.location}
          title={fm.title}
          date={fm.date}
          image={fm.featuredimage}
          body={project.htmlAst}
        />

        {/* Links to previous and next project */}
        <Container>
          <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 border-t py-4">
            {previous && previous.frontmatter.templateKey === 'article-page' ? (
              <Link to={previous.fields.slug} className="group">
                <div className="flex items-center gap-x-2 text-gray-500">
                  <ArrowNarrowLeftIcon className="w-5 h-5" />
                  Suivant
                </div>
                {/*<p className="mt-4 uppercase text-green-600 font-bold text-xs tracking-wide">
                  {previous.frontmatter.location}
                </p>*/}
                <h3 className="font-bold text-lg text-gray-700 group-hover:underline">
                  {previous.frontmatter.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {next && next.frontmatter.templateKey === 'article-page' ? (
              <div className="mt-6 sm:mt-0">
                <Link to={next.fields.slug} className="group sm:text-right">
                  <div className="flex items-center gap-x-2 text-gray-500 sm:justify-end">
                    Précédent
                    <ArrowNarrowRightIcon className="w-5 h-5" />
                  </div>
                  {/*<p className="mt-4 uppercase text-green-600 font-bold text-xs tracking-wide">
                    {next.frontmatter.location}
                  </p>*/}
                  <h3 className="font-bold text-lg text-gray-700 group-hover:underline">
                    {next.frontmatter.title}
                  </h3>
                </Link>
              </div>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </PageLayout>
    </>
  );
};

export default ArticlePage;

export const articleQuery = graphql`
  query ArticlePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      excerpt
      frontmatter {
        title
        date
        featuredimage {
          alt
          image {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;
