import CMS from 'netlify-cms-app'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import ArticlesPagePreview from './preview-templates/ArticlesPagePreview'
import ArticlePagePreview from './preview-templates/ArticlePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import ContentPagePreview from './preview-templates/ContentPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import youtubeEditorComponent from './editor-components/youtube'
import scoreboardEditorComponent from "./editor-components/scoreboard";
import withPreviewWrapper from "./withPreviewWrapper";

CMS.registerPreviewTemplate('index', withPreviewWrapper(IndexPagePreview))
CMS.registerPreviewTemplate('articles-index', withPreviewWrapper(ArticlesPagePreview))
CMS.registerPreviewTemplate('articles', withPreviewWrapper(ArticlePagePreview))
CMS.registerPreviewTemplate('about', withPreviewWrapper(AboutPagePreview))
CMS.registerPreviewTemplate('inscription', withPreviewWrapper(ContentPagePreview))
CMS.registerPreviewTemplate('results', withPreviewWrapper(ContentPagePreview))
CMS.registerPreviewTemplate('contact', withPreviewWrapper(ContactPagePreview))

CMS.registerEditorComponent(youtubeEditorComponent);
CMS.registerEditorComponent(scoreboardEditorComponent);