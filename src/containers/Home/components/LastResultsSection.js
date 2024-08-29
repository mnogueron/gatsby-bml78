import React from 'react';
import CardGrid from '../../../components/CardGrid';
import HomeSection from './HomeSection';
import {SimpleGrid, VStack} from '@chakra-ui/react';
import PostBigCard from '../../../components/PostBigCard';

const LastResultsSection = ({results}) => {
  const [firstPost, ...otherPosts] = results;
  return (
    <HomeSection
      title="Les derniers résultats du club"
      moreButtonRedirectTo="/results"
    >
      {results.length > 0 && (
        <>
          <VStack
            spacing={{base: 6, sm: 8, lg: 10}}
            alignItems="initial"
            display={{base: 'none', lg: 'flex'}}
          >
            <CardGrid
              posts={results}
              subheading="Résultats"
              getIdKey={i => `card-grid-last-result-${i + 1}`}
            />
          </VStack>
          <VStack
            spacing={{base: 6, sm: 8, lg: 10}}
            alignItems="initial"
            display={{base: 'flex', lg: 'none'}}
          >
            <PostBigCard
              id={`big-card-last-result-1`}
              post={firstPost}
              size={{base: 'sm', sm: 'md'}}
            />
            <SimpleGrid columns={{base: 1, sm: 2}} spacing={{base: 6}}>
              {otherPosts.map((p, i) => (
                <PostBigCard
                  key={i}
                  post={p}
                  size="sm"
                  id={`big-card-last-result-${i + 2}`}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </>
      )}
    </HomeSection>
  );
};

export default LastResultsSection;
