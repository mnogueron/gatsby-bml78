import {Divider, Flex} from '@chakra-ui/react';
import NextArticleButton from './NextArticleButton';
import PreviousArticleButton from './PreviousArticleButton';
import LegacyContainer from '../../../components/LegacyContainer';
import React from 'react';

const ArticleNavigation = ({toPrevious, previousTitle, toNext, nextTitle}) => {
  return (
    <LegacyContainer as="nav">
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
    </LegacyContainer>
  );
};

export default ArticleNavigation;
