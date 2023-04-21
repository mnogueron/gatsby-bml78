import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Image from '../../components/Image';
import Content from '../../components/Content';
import { ArticleHeader } from '../../components/Header';

function ArticlePageTemplate({ heading, date, image, body }) {
  return (
    <>
      <ArticleHeader heading={heading} date={date} />
      {!image.hidden && (
        <Flex px={4} mb={{ base: 0, md: 5, lg: 10 }} justifyContent="center">
          <Box
            as={Image}
            className="rounded-md"
            image={image.image}
            alt={image.alt}
            sx={{
              '& img': {
                maxHeight: { base: '600px', md: '800px' },
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
