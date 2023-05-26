import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from '../components/SEO';
import { Container } from '../components/Sections';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import ContentPageTemplate from './components/ContentPageTemplate';
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';
import PageLayout from '../components/PageLayout';

const ResultPage = ({ data, pageContext }) => {
  const { next, previous } = pageContext;
  const { markdownRemark: result } = data;
  const { frontmatter: fm } = result;
  const date = format(new Date(fm.date), 'PP', { locale: frLocale });

  return (
    <>
      <SEO data={data} pageContext={pageContext} />
      <PageLayout>
        <ContentPageTemplate
          heading={fm.heading}
          subheading={fm.subheading}
          date={fm.date}
          body={result.htmlAst}
        />

        {/* Links to previous and next result */}
        <Container as="nav">
          <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 border-t py-4">
            {previous && previous.frontmatter.templateKey === 'result-page' ? (
              <Link to={previous.fields.slug} className="group">
                <div className="flex items-center gap-x-2 text-gray-500">
                  <ArrowNarrowLeftIcon className="w-5 h-5" />
                  Suivant
                </div>
                <h3 className="font-bold text-lg text-gray-700 group-hover:underline">
                  {previous.frontmatter.cardTitle || previous.frontmatter.heading}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {next && next.frontmatter.templateKey === 'result-page' ? (
              <div className="mt-6 sm:mt-0">
                <Link to={next.fields.slug} className="group sm:text-right">
                  <div className="flex items-center gap-x-2 text-gray-500 sm:justify-end">
                    Précédent
                    <ArrowNarrowRightIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-700 group-hover:underline">
                    {next.frontmatter.cardTitle || next.frontmatter.heading}
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

export default ResultPage;

export const resultQuery = graphql`
  query ResultPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      excerpt
      frontmatter {
        title
        heading
        subheading
        date
        templateKey
        featuredimage {
          alt
          image {
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
              fixed {
                src
              }
            }
          }
        }
      }
    }
  }
`;
