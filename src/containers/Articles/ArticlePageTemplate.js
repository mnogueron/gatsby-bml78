import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Image from '../../components/Image';
import Content from '../../components/Content';
import {ArticleHeader} from '../../components/Header';

function ArticlePageTemplate({heading, date, image, body}) {
  return (
    <>
      <ArticleHeader heading={heading} date={date} />
      {!image.hidden && (
        <Flex px={4} justifyContent="center">
          <Box
            as={Image}
            image={image.image}
            alt={image.alt}
            borderRadius="md"
            sx={{
              '& img': {
                maxHeight: {base: '600px', md: '800px'},
              },
            }}
          />
        </Flex>
      )}
      {body && <Content html={body} as="article" />}
    </>
  );
}

export default ArticlePageTemplate;
