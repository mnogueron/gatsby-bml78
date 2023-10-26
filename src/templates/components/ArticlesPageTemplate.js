import React from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import { CardGrid } from '../../components/Sections';
import BigCard from '../../components/BigCard';
import { Center, Heading, VStack } from '@chakra-ui/react';

const EmptyPlaceholder = () => {
  return (
    <Center pt={{base: 8, sm: 12}} pb={20}>
      <VStack spacing={8}>
        <Heading as="h3" size="xl" textAlign="center">
          C'est le début de la saison ! 🏸
        </Heading>
        <Heading as="h3" size="md" textAlign="center">
          Bientôt de nouveaux résultats...
        </Heading>
      </VStack>
    </Center>
  );
};

function ArticlesPageTemplate({ heading, subheading, posts = [] }) {
  const [latestPost, ...otherPosts] = posts;
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Container px={8} pt={8} pb={16} maxW="7xl">
        {latestPost ? (
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
        ) : (
          <EmptyPlaceholder />
        )}
      </Container>
    </>
  );
}

export default ArticlesPageTemplate;
