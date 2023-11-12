import React from 'react';
import { SimpleGrid, VStack } from '@chakra-ui/react';
import { CardGrid } from '../../components/Sections';
import BigCard from '../../components/BigCard';
import HomeSection from './HomeSection';

const LastNewsSection = ({ posts }) => {
  const [firstPost, secondPost, ...otherPosts] = posts;
  return (
    <HomeSection
      title="Les dernières actus du club"
      moreButtonRedirectTo="/articles"
    >
      <>
        <VStack
          spacing={{ base: 6, sm: 8, lg: 10 }}
          alignItems="initial"
          display={{ base: 'none', lg: 'flex' }}
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2 }}
            spacing={{ base: 6, sm: 6, lg: 8 }}
          >
            <BigCard
              image={firstPost.featuredimage}
              heading={firstPost.cardTitle || firstPost.heading}
              subtitle={firstPost.cardSubtitle}
              date={firstPost.date}
              to={firstPost.fields.slug}
              size="sm"
            />
            <BigCard
              image={secondPost.featuredimage}
              heading={secondPost.cardTitle || secondPost.heading}
              subtitle={secondPost.cardSubtitle}
              date={secondPost.date}
              to={secondPost.fields.slug}
              size="sm"
            />
          </SimpleGrid>
          <CardGrid posts={otherPosts} subheading={'Actualités'} />
        </VStack>
        <VStack
          spacing={{ base: 6, sm: 8, lg: 10 }}
          alignItems="initial"
          display={{ base: 'flex', lg: 'none' }}
        >
          <BigCard
            image={firstPost.featuredimage}
            heading={firstPost.cardTitle || firstPost.heading}
            subtitle={firstPost.cardSubtitle}
            date={firstPost.date}
            to={firstPost.fields.slug}
            size="md"
          />
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 6 }}>
            {posts.slice(1, posts.length).map((p, i) => (
              <BigCard
                key={i}
                image={p.featuredimage}
                heading={p.cardTitle || p.heading}
                subtitle={p.cardSubtitle}
                date={p.date}
                to={p.fields.slug}
                size="sm"
              />
            ))}
          </SimpleGrid>
        </VStack>
      </>
    </HomeSection>
  );
};

export default LastNewsSection;
