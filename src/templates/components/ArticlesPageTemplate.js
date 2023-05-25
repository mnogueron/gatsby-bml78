import React from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import { CardGrid } from '../../components/Sections';
import BigCard from '../../components/BigCard';
import { VStack } from '@chakra-ui/react';

function ArticlesPageTemplate({ heading, subheading, posts = [] }) {
  const [latestPost, ...otherPosts] = posts;
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Container px={8} pt={8} pb={16} maxW="7xl">
        <VStack spacing={{ base: 6, sm: 8, lg: 12 }} alignItems="initial">
          <BigCard
            image={latestPost.node.frontmatter.featuredimage}
            heading={
              latestPost.node.frontmatter.cardTitle ||
              latestPost.node.frontmatter.heading
            }
            subtitle={latestPost.node.frontmatter.cardSubtitle}
            date={latestPost.node.frontmatter.date}
            to={latestPost.node.fields.slug}
          />
          <CardGrid posts={otherPosts} />
        </VStack>
      </Container>
    </>
  );
}

export default ArticlesPageTemplate;
