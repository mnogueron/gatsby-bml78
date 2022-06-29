import React from 'react';
import Image from '../../components/Image';
import Content from '../../components/Content';
import { ProjectHeader } from '../../components/Header';
import { Container } from '../../components/Sections';

function ArticlePageTemplate({ title, date, image, body }) {
  return (
    <>
      <ProjectHeader heading={title} date={date} />
      <Container className="text-center -mt-24 sm:-mt-28 lg:-mt-36">
        <Image className="rounded-md" image={image.image} alt={image.alt} />
      </Container>
      {body && <Content html={body} className="-mt-20" />}
    </>
  );
}

export default ArticlePageTemplate;
