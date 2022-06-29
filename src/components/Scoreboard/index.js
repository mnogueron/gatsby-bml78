import React, { useMemo } from 'react';
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
} from '@chakra-ui/react';
import RankingBadge from './RankingBadge';
import Score from './Score';

const NameCell = ({ player }) => (
  <Flex alignItems={'center'} flex={1}>
    <Text
      as="span"
      fontWeight={'bold'}
      marginRight={1}
      textTransform="uppercase"
    >
      {player.lastname}
    </Text>
    {player.firstname}
  </Flex>
);

const PlayersCell = ({ team }) => (
  <VStack alignItems={'flex-start'} height={'100%'} justifyContent="center">
    {team.map((p) => (
      <NameCell key={`${p.lastname}-${p.firstname}`} player={p} />
    ))}
  </VStack>
);

const RankingsCell = ({ team }) => (
  <VStack justifyContent="center" height={'100%'}>
    {team.map((p) => (
      <Flex
        key={`${p.lastname}-${p.firstname}-${p.ranking}`}
        alignItems={'center'}
        flex={1}
      >
        <RankingBadge ranking={p.ranking} />
      </Flex>
    ))}
  </VStack>
);

const ClubsCell = ({ team }) => {
  const clubs = useMemo(() => {
    const allClubs = team.map((p) => p.club);
    if (new Set(allClubs).size === 1) {
      return [allClubs[0]];
    }
    return allClubs;
  }, [team]);

  return (
    <VStack alignItems={'flex-start'} height={'100%'} justifyContent="center">
      {clubs.map((club, index) => (
        <Flex key={`${club}-${index}`} alignItems={'center'} flex={1}>
          {club}
        </Flex>
      ))}
    </VStack>
  );
};

const PointsCell = ({ team }) => (
  <VStack justifyContent="center" height={'100%'}>
    {team.map((p, index) => (
      <Flex
        key={`${p.lastname}-${p.firstname}-${index}`}
        alignItems={'center'}
        flex={1}
      >
        <Text as="span" fontWeight={'bold'}>
          {p.points}
        </Text>
      </Flex>
    ))}
  </VStack>
);

const ScoreboardHeader = ({ hideClub, hideRanking, hidePoints }) => (
  <Thead>
    <Tr borderBottomWidth={3}>
      {!hideClub && <Th width={'100px'}>Club</Th>}
      {!hideRanking && (
        <Th width={'150px'} textAlign="center">
          Classement
        </Th>
      )}
      <Th>Name</Th>
      {!hidePoints && (
        <Th width={'100px'} textAlign="center">
          Points
        </Th>
      )}
      <Th textAlign="center">Score</Th>
    </Tr>
  </Thead>
);

const ScoreboardLine = ({
  team,
  score,
  scoreOpponent,
  hideClub,
  hideRanking,
  hidePoints,
  ...props
}) => (
  <Tr {...props}>
    {!hideClub && (
      <Td width={'100px'} height={'1px'}>
        <ClubsCell team={team} />
      </Td>
    )}
    {!hideRanking && (
      <Td width={'150px'} height={'1px'}>
        <RankingsCell team={team} />
      </Td>
    )}
    <Td height={'1px'}>
      <PlayersCell team={team} />
    </Td>
    {!hidePoints && (
      <Td width={'100px'} height={'1px'}>
        <PointsCell team={team} />
      </Td>
    )}
    <Td height={'1px'}>
      <Score score={score} oppositeScore={scoreOpponent} />
    </Td>
  </Tr>
);

const ScoreboardMatch = ({
  match,
  isLast,
  hideClub,
  hideRanking,
  hidePoints,
}) => {
  const { teamA = [], teamB = [], score = [] } = match;
  const normalisedScore = useMemo(
    () => [
      [score.set[0]?.scoreA, score.set[1]?.scoreA, score.set[2]?.scoreA],
      [score.set[0]?.scoreB, score.set[1]?.scoreB, score.set[2]?.scoreB],
    ],
    [score]
  );
  return (
    <>
      <ScoreboardLine
        team={teamA}
        score={normalisedScore[0]}
        scoreOpponent={normalisedScore[1]}
        hideClub={hideClub}
        hideRanking={hideRanking}
        hidePoints={hidePoints}
      />
      <ScoreboardLine
        team={teamB}
        score={normalisedScore[1]}
        scoreOpponent={normalisedScore[0]}
        borderBottomWidth={`${isLast ? 1 : 4}px !important`}
        hideClub={hideClub}
        hideRanking={hideRanking}
        hidePoints={hidePoints}
      />
    </>
  );
};

const hasPlayerDataContent = (matches, key) => {
  return matches?.some(
    (m) =>
      m.teamA?.some((p) => Boolean(p[key]) || p[key] === 0) ||
      m.teamB?.some((p) => Boolean(p[key]) || p[key] === 0) ||
      false
  );
};

const Scoreboard = ({ matches, hideHeader }) => {
  const hideClub = useMemo(
    () => !hasPlayerDataContent(matches, 'club'),
    [matches]
  );

  const hideRanking = useMemo(
    () => !hasPlayerDataContent(matches, 'ranking'),
    [matches]
  );

  const hidePoints = useMemo(
    () => !hasPlayerDataContent(matches, 'points'),
    [matches]
  );

  if (!matches) {
    return null;
  }

  return (
    <TableContainer my={10} mx={{ base: 0, md: 4 }}>
      <Table size="sm">
        {!hideHeader && (
          <ScoreboardHeader
            hideClub={hideClub}
            hideRanking={hideRanking}
            hidePoints={hidePoints}
          />
        )}
        <Tbody>
          {matches.map((match, index) => (
            <ScoreboardMatch
              key={`match-${index}`}
              match={match}
              isLast={index >= matches.length - 1}
              hideClub={hideClub}
              hideRanking={hideRanking}
              hidePoints={hidePoints}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Scoreboard;
