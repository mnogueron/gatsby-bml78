import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

export const getSEOData = data => {
  const {frontmatter: fm} = data.markdownRemark || {};
  switch (fm?.templateKey) {
    case 'article-page':
    case 'tournament-page':
      return {
        title: fm.heading,
        description: data.markdownRemark.excerpt,
        image: fm.featuredimage?.image?.childImageSharp?.fixed?.src,
        article: true,
      };
    case 'all-results-page':
    case 'articles-page':
    case 'contact-page':
    case 'content-page':
    case 'boutique-page':
    case 'board-chart-page':
    case 'index-page':
      return {
        title: fm.title,
        description: fm.subheading,
      };
    case 'result-page': {
      const date = format(new Date(fm.date), 'PP', {locale: frLocale});
      const featuredImageSrc =
        fm.featuredimage?.image?.childImageSharp?.fixed?.src;
      return {
        title: fm.heading,
        description: fm.subheading || `${fm.heading} - ${date}`,
        image: featuredImageSrc?.endsWith('/shuttle.jpg')
          ? undefined
          : featuredImageSrc,
        article: true,
      };
    }
    case 'results-page':
      return {
        title: fm.heading,
        description: fm.subheading,
      };
    default:
      return {};
  }
};
