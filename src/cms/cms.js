import CMS from 'netlify-cms-app'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import ArticlesPagePreview from './preview-templates/ArticlesPagePreview'
import ArticlePagePreview from './preview-templates/ArticlePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import InscriptionPagePreview from './preview-templates/InscriptionPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('articles-index', ArticlesPagePreview)
CMS.registerPreviewTemplate('articles', ArticlePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('inscription', InscriptionPagePreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)