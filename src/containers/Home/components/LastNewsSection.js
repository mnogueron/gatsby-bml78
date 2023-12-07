import React from 'react';
import {SimpleGrid, VStack} from '@chakra-ui/react';
import CardGrid from '../../../components/CardGrid';
import HomeSection from './HomeSection';
import PostBigCard from '../../../components/PostBigCard';

const LastNewsSection = ({posts}) => {
  const [firstPost, secondPost, ...otherPosts] = posts;
  return (
    <HomeSection
      title="Les dernières actus du club"
      moreButtonRedirectTo="/articles"
    >
      {posts.length > 0 && (
        <>
          <VStack
            spacing={{base: 6, sm: 8, lg: 10}}
            alignItems="initial"
            display={{base: 'none', lg: 'flex'}}
          >
            <SimpleGrid
              columns={{base: 1, sm: 2}}
              spacing={{base: 6, sm: 6, lg: 8}}
            >
              <PostBigCard post={firstPost} size="sm" />
              <PostBigCard post={secondPost} size="sm" />
            </SimpleGrid>
            <CardGrid posts={otherPosts} subheading="Actualités" />
          </VStack>
          <VStack
            spacing={{base: 6, sm: 8, lg: 10}}
            alignItems="initial"
            display={{base: 'flex', lg: 'none'}}
          >
            <PostBigCard post={firstPost} size={{base: 'sm', sm: 'md'}} />
            <SimpleGrid columns={{base: 1, sm: 2}} spacing={{base: 6}}>
              {[secondPost, ...otherPosts].map((p, i) => (
                <PostBigCard key={i} post={p} size="sm" />
              ))}
            </SimpleGrid>
          </VStack>
        </>
      )}
    </HomeSection>
  );
};

export default LastNewsSection;
