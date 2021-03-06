import CMS from 'netlify-cms-app'
import {fr} from 'netlify-cms-locales';

import IndexPagePreview from './preview-templates/IndexPagePreview'
import ArticlesPagePreview from './preview-templates/ArticlesPagePreview'
import ArticlePagePreview from './preview-templates/ArticlePagePreview'
import ContentPagePreview from './preview-templates/ContentPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import youtubeEditorComponent from './editor-components/youtube'
import scoreboardEditorComponent from "./editor-components/scoreboard";
import fileEditorComponent from "./editor-components/file";
import gridEditorComponent from "./editor-components/grid";
import withPreviewWrapper from "./withPreviewWrapper";

const previewTemplates = {
  'index': IndexPagePreview,
  'articles-index': ArticlesPagePreview,
  'articles': ArticlePagePreview,
  'contact': ContactPagePreview,

  'results': ContentPagePreview,
  'inscription': ContentPagePreview,
  'avantages': ContentPagePreview,
  'entrainements': ContentPagePreview,
  'sections': ContentPagePreview,
  'acces-horaires': ContentPagePreview,
  'calendrier': ContentPagePreview,
  'result-sections': ArticlesPagePreview,
  'all-results-index': ArticlesPagePreview,
}

CMS.registerLocale('fr', fr);

Object.entries(previewTemplates).forEach(([templateKey, TemplateComponent]) => {
  CMS.registerPreviewTemplate(templateKey, withPreviewWrapper(TemplateComponent))
})

CMS.registerEditorComponent(youtubeEditorComponent);
CMS.registerEditorComponent(scoreboardEditorComponent);
/*CMS.registerEditorComponent(fileEditorComponent);*/
/*CMS.registerEditorComponent(gridEditorComponent);*/
