import React from 'react';
import { Container, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { CardGrid } from '../../components/Sections';
import BigCard from '../../components/BigCard';
import SeeMoreButton from './SeeMoreButton';

const LastNewsSection = ({ posts }) => {
  const [firstPost, secondPost, ...otherPosts] = posts;
  return (
    <Container maxW="7xl" my={{ base: 8, md: 12, lg: 16 }} as="section">
      <div className="flex justify-between items-baseline">
        <Heading as="h2" size="xl">
          Les dernières actus du club
        </Heading>
        <SeeMoreButton display={{ base: 'none', md: 'flex' }} to="/articles" />
      </div>
      <div className="mt-8">
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
              image={firstPost.node.frontmatter.featuredimage}
              heading={
                firstPost.node.frontmatter.cardTitle ||
                firstPost.node.frontmatter.heading
              }
              subtitle={firstPost.node.frontmatter.cardSubtitle}
              date={firstPost.node.frontmatter.date}
              to={firstPost.node.fields.slug}
              size="sm"
            />
            <BigCard
              image={secondPost.node.frontmatter.featuredimage}
              heading={
                secondPost.node.frontmatter.cardTitle ||
                secondPost.node.frontmatter.heading
              }
              subtitle={secondPost.node.frontmatter.cardSubtitle}
              date={secondPost.node.frontmatter.date}
              to={secondPost.node.fields.slug}
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
            image={firstPost.node.frontmatter.featuredimage}
            heading={
              firstPost.node.frontmatter.cardTitle ||
              firstPost.node.frontmatter.heading
            }
            subtitle={firstPost.node.frontmatter.cardSubtitle}
            date={firstPost.node.frontmatter.date}
            to={firstPost.node.fields.slug}
            size="md"
          />
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 6 }}>
            {posts.slice(1, posts.length).map((p, i) => (
              <BigCard
                key={i}
                image={p.node.frontmatter.featuredimage}
                heading={
                  p.node.frontmatter.cardTitle || p.node.frontmatter.heading
                }
                subtitle={p.node.frontmatter.cardSubtitle}
                date={p.node.frontmatter.date}
                to={p.node.fields.slug}
                size="sm"
              />
            ))}
          </SimpleGrid>
        </VStack>
      </div>
      <SeeMoreButton
        display={{ base: 'flex', md: 'none' }}
        to="/articles"
        variant="outline"
        my={4}
        mx="auto"
        maxW="2xs"
      />
    </Container>
  );
};

export default LastNewsSection;
