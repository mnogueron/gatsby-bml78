import React from 'react';
import {ArticleHeader} from '../../components/Header';
import Content from '../../components/Content';

function ContentPageTemplate({heading, date, subheading, body}) {
  return (
    <>
      <ArticleHeader heading={heading} subheading={subheading} date={date} />
      {body && <Content html={body} as="section" />}
    </>
  );
}

export default ContentPageTemplate;
