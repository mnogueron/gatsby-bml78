import CMS from 'decap-cms-app';
import {fr} from 'decap-cms-locales';

import IndexPagePreview from './preview-templates/IndexPagePreview';
import ArticlesPagePreview from './preview-templates/ArticlesPagePreview';
import ArticlePagePreview from './preview-templates/ArticlePagePreview';
import ContentPagePreview from './preview-templates/ContentPagePreview';
import ContactPagePreview from './preview-templates/ContactPagePreview';
import BoardChartPagePreview from './preview-templates/BoardChartPagePreview';
import youtubeEditorComponent from './editor-components/youtube';
import scoreboardEditorComponent from './editor-components/scoreboard';
import teamScoreboardEditorComponent from './editor-components/teamScoreboard';
import galleryEditorComponent from './editor-components/gallery';
import withPreviewWrapper from './withPreviewWrapper';

import './cms-utils';

const previewTemplates = {
  index: IndexPagePreview,
  'articles-index': ArticlesPagePreview,
  articles: ArticlePagePreview,
  tournaments: ArticlePagePreview,
  contact: ContactPagePreview,

  results: ContentPagePreview,
  inscription: ContentPagePreview,
  avantages: ContentPagePreview,
  entrainements: ContentPagePreview,
  sections: ContentPagePreview,
  'acces-horaires': ContentPagePreview,
  calendrier: ContentPagePreview,
  bureau: BoardChartPagePreview,
  'result-sections': ArticlesPagePreview,
  'all-results-index': ArticlesPagePreview,
};

CMS.registerLocale('fr', fr);

Object.entries(previewTemplates).forEach(([pageTitle, TemplateComponent]) => {
  CMS.registerPreviewTemplate(pageTitle, withPreviewWrapper(TemplateComponent));
});

CMS.registerEditorComponent(youtubeEditorComponent);
CMS.registerEditorComponent(scoreboardEditorComponent);
CMS.registerEditorComponent(teamScoreboardEditorComponent);
CMS.registerEditorComponent(galleryEditorComponent);
/*CMS.registerEditorComponent(fileEditorComponent);*/
/*CMS.registerEditorComponent(gridEditorComponent);*/

CMS.init();
