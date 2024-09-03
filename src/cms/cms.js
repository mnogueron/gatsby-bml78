import CMS from 'decap-cms-app';
import {fr} from 'decap-cms-locales';

import IndexPagePreview from './preview-templates/IndexPagePreview';
import ArticlesPagePreview from './preview-templates/ArticlesPagePreview';
import ArticlePagePreview from './preview-templates/ArticlePagePreview';
import ContentPagePreview from './preview-templates/ContentPagePreview';
import ContactPagePreview from './preview-templates/ContactPagePreview';
import BoardChartPagePreview from './preview-templates/BoardChartPagePreview';
import ResultsPagePreview from './preview-templates/ResultsPagePreview';
import withPreviewWrapper from './withPreviewWrapper';

import './cms-utils';
import {registerEditorComponents} from './editor-components';

console.log(CMS);

const ContentPages = [
  'results',
  'inscription',
  'avantages',
  'entrainements',
  'sections',
  'calendrier',
  'acces-horaires',
  'histoire-badminton',
  'regles-badminton',
  'interclubs',
  'boutique',
  'histoire',
  'regles',
  'interclubs',
];

const previewTemplates = {
  ...ContentPages.reduce((acc, pageKey) => {
    acc[pageKey] = ContentPagePreview;
    return acc;
  }, {}),
  index: IndexPagePreview,
  'articles-index': ArticlesPagePreview,
  articles: ArticlePagePreview,
  tournaments: ArticlePagePreview,
  contact: ContactPagePreview,

  bureau: BoardChartPagePreview,
  'result-sections': ResultsPagePreview,
  'all-results-index': ResultsPagePreview,
};

CMS.registerLocale('fr', fr);

Object.entries(previewTemplates).forEach(([pageTitle, TemplateComponent]) => {
  CMS.registerPreviewTemplate(pageTitle, withPreviewWrapper(TemplateComponent));
});

registerEditorComponents();

CMS.init();
