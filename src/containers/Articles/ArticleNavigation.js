import {Divider, Flex} from '@chakra-ui/react';
import NextArticleButton from '../../components/NextArticleButton';
import PreviousArticleButton from '../../components/PreviousArticleButton';
import {Container} from '../../components/Sections';
import React from 'react';

const ArticleNavigation = ({toPrevious, previousTitle, toNext, nextTitle}) => {
  return (
    <Container as="nav">
      <Divider borderColor={'gray.200'} />
      <Flex
        direction={{base: 'column', sm: 'row'}}
        justifyContent="space-between"
        alignItems={{base: 'initial', sm: 'center'}}
        gap={4}
        py={4}
      >
        {toNext ? <NextArticleButton to={toNext} title={nextTitle} /> : <div />}

        {toPrevious ? (
          <PreviousArticleButton to={toPrevious} title={previousTitle} />
        ) : (
          <div />
        )}
      </Flex>
    </Container>
  );
};

export default ArticleNavigation;
