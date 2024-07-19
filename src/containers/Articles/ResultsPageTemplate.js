import React from 'react';
import Header from '../../components/Header';
import Container from '../../components/Container';
import CardGrid from '../../components/CardGrid';
import {Center, Heading, SimpleGrid, VStack} from '@chakra-ui/react';
import PostBigCard from '../../components/PostBigCard';
import TeamRanking from '../../components/TeamRanking';
import TeamCalendar from '../../components/TeamCalendar';

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

const mockTeams = [
  {
    id: 0,
    name: 'Equipe 1',
    playedDays: 10,
    win: 10,
    equal: 0,
    loss: 0,
    bonus: 1,
    malus: 0,
    points: 51,
  },
  {
    id: 1,
    name: 'Equipe 2',
    playedDays: 10,
    win: 7,
    equal: 1,
    loss: 2,
    bonus: 2,
    malus: -4,
    points: 38,
  },
  {
    id: 2,
    name: 'Equipe 3',
    playedDays: 10,
    win: 4,
    equal: 1,
    loss: 5,
    bonus: 4,
    malus: 0,
    points: 32,
  },
  {
    id: 3,
    name: 'Equipe 4',
    playedDays: 10,
    win: 3,
    equal: 3,
    loss: 4,
    bonus: 1,
    malus: -1,
    points: 28,
  },
  {
    id: 4,
    name: 'Equipe 5',
    playedDays: 10,
    win: 2,
    equal: 1,
    loss: 7,
    bonus: 4,
    malus: 0,
    points: 24,
  },
];

const calendar = [
  {
    date: new Date(2024, 4, 16),
    teamA: {
      longName: 'Test 2',
      score: 4,
    },
    teamB: {
      longName: 'BML',
      score: 4,
      isHost: true,
      isBML: true,
    },
  },
  {
    date: new Date(2024, 2, 15),
    teamA: {
      longName: 'BML',
      score: 6,
      isBML: true,
      isHost: true,
    },
    teamB: {
      longName: 'Test',
      score: 2,
    },
  },
  {
    date: new Date(2024, 2, 16),
    teamA: {
      longName: 'Test 2',
      score: 2,
      isHost: true,
    },
    teamB: {
      longName: 'BML',
      score: 6,
      isBML: true,
    },
  },
  {
    date: new Date(2024, 7, 15),
    teamA: {
      longName: 'BML',
      isHost: true,
      isBML: true,
    },
    teamB: {
      longName: 'Test',
    },
  },
  {
    date: new Date(2024, 7, 16),
    teamA: {
      longName: 'Test 2',
      isHost: true,
      isBML: true,
    },
    teamB: {
      longName: 'BML',
    },
  },
];

const ResultsPageTemplate = ({heading, subheading, posts = []}) => {
  const [firstPost, secondPost, ...otherPosts] = posts;
  return (
    <>
      <Header heading={heading} subheading={subheading} />
      <Container px={8} pt={8} pb={16} maxW="7xl" as={VStack} spacing={8}>
        {/*<TeamRanking width="full" teams={mockTeams} />

        <TeamCalendar calendar={calendar} width="full" />*/}

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
