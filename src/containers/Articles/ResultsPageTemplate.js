import React from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import CardGrid from '../../components/CardGrid';
import {Center, Heading, SimpleGrid, VStack} from '@chakra-ui/react';
import PostBigCard from '../../components/PostBigCard';
import TeamRanking from '../../components/TeamRanking';

const EmptyPlaceholder = () => {
  return (
    <Center pt={{base: 8, sm: 12}} pb={20}>
      <VStack spacing={8}>
        <Heading as="h3" size="xl" textAlign="center">
          {"C'est le début de la saison ! 🏸"}
        </Heading>
        <Heading as="h3" size="md" textAlign="center">
          Bientôt de nouveaux résultats...
        </Heading>
      </VStack>
    </Center>
  );
};

const ResultsPageTemplate = ({heading, subheading, posts = []}) => {
  const [firstPost, secondPost, ...otherPosts] = posts;
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Container px={8} pt={8} pb={16} maxW="7xl" as={VStack} spacing={8}>
        <TeamRanking width="full" />

        {firstPost ? (
          <>
            <VStack
              spacing={{base: 6, sm: 8, lg: 12}}
              alignItems="initial"
              display={{base: 'none', lg: 'flex'}}
            >
              <SimpleGrid
                columns={secondPost ? {base: 1, sm: 2} : 1}
                spacing={{base: 6, sm: 6, lg: 8}}
              >
                <PostBigCard post={firstPost} />
                {secondPost && <PostBigCard post={secondPost} />}
              </SimpleGrid>
              <CardGrid posts={otherPosts} />
            </VStack>
            <VStack
              spacing={{base: 6, sm: 8, lg: 12}}
              alignItems="initial"
              display={{base: 'flex', lg: 'none'}}
            >
              <PostBigCard post={firstPost} size={{base: 'sm', sm: 'md'}} />
              <SimpleGrid columns={{base: 1, sm: 2}} spacing={{base: 6}}>
                {[secondPost, ...otherPosts].filter(Boolean).map((p, i) => (
                  <PostBigCard key={i} post={p} size="sm" />
                ))}
              </SimpleGrid>
            </VStack>
          </>
        ) : (
          <EmptyPlaceholder />
        )}
      </Container>
    </>
  );
};

export default ResultsPageTemplate;
