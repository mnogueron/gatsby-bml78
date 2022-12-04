import React, { useMemo } from 'react';
import {
  Flex,
  Text,
  VStack,
  Center,
  Heading,
  Stack,
  useBreakpointValue,
  Tag,
  Divider,
} from '@chakra-ui/react';
import SmallRankingBadge from './SmallRankingBadge';
import Point from './Score/Point';
import RankingBadge from './RankingBadge';

const WO_STATUS = 'WO';
const AB_STATUS = 'AB.';

const hasPlayerDataContent = (matches, key) => {
  return matches?.some(
    (m) =>
      m.teamA?.some((p) => Boolean(p[key]) || p[key] === 0) ||
      m.teamB?.some((p) => Boolean(p[key]) || p[key] === 0) ||
      false
  );
};

const ClubText = ({ club, ...rest }) => {
  return (
    <Text
      display={{ base: 'none', md: 'inline' }}
      as="span"
      fontSize={{ base: 'xs', md: 'sm' }}
      color="gray.500"
      {...rest}
    >{`(${club})`}</Text>
  );
};

const TeamScore = ({ score, scoreOpponent }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack
      direction={{ base: 'row', md: 'column' }}
      alignItems="center"
      justifyContent="center"
      spacing={{ base: 1, md: 2 }}
    >
      <Point score={score[0]} oppositeScore={scoreOpponent[0]} />
      <Point score={score[1]} oppositeScore={scoreOpponent[1]} />
      {(isMobile ||
        typeof score[2] !== 'undefined' ||
        typeof scoreOpponent[2] !== 'undefined') && (
        <Point score={score[2]} oppositeScore={scoreOpponent[2]} />
      )}
    </Stack>
  );
};

const PlayerLine = ({ player, isRight, hideClub }) => {
  const { firstname, lastname, ranking, club, status } = player;
  const name =
    firstname || lastname
      ? `${lastname.toUpperCase()} ${firstname}`
      : undefined;
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack
      gap={1}
      direction={{
        base: 'row',
        md: !isMobile && isRight ? 'row-reverse' : 'row',
      }}
      alignItems="center"
    >
      {isMobile ? (
        <SmallRankingBadge ranking={ranking} />
      ) : (
        <RankingBadge ranking={ranking} />
      )}
      <Stack
        spacing={1}
        fontSize={{ base: 'sm', md: 'md' }}
        direction={{
          base: 'row',
          md: !isMobile && isRight ? 'row-reverse' : 'row',
        }}
        alignItems="center"
        textAlign={!isMobile && isRight ? 'right' : 'left'}
      >
        <Text as="span">{name}</Text>
        {(status === 'AB.' || status === 'WO') && (
          <Tag
            fontSize={{ base: 'xs', sm: 'sm' }}
            size={isMobile ? 'sm' : 'md'}
          >
            {status}
          </Tag>
        )}
        {!hideClub && <ClubText club={club} ms={1} />}
      </Stack>
    </Stack>
  );
};

const TeamLine = ({
  team,
  score,
  scoreOpponent,
  isRight,
  isWinning,
  hideClub,
  ...rest
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Flex
      flexDirection={{ base: 'row', md: isRight ? 'row-reverse' : 'row' }}
      justifyContent="space-between"
      flex={1}
      {...rest}
    >
      <VStack
        justifyContent="center"
        alignItems="initial"
        p={2}
        pl={{ base: 0, md: 2 }}
        ml={{ base: 0, md: isRight ? 2 : 0 }}
        mr={{ base: 2, md: isRight ? 0 : 2 }}
        bg={
          isWinning
            ? `linear-gradient(${
                !isMobile && isRight ? 'to left' : 'to right'
              }, #FFFFFF, var(--chakra-colors-green-100))`
            : undefined
        }
        flex={1}
        borderRadius={8}
      >
        {team.map((p, i) => (
          <PlayerLine
            key={`player-${i}`}
            player={p}
            isRight={isRight}
            hideClub={hideClub}
          />
        ))}
      </VStack>
      <TeamScore score={score} scoreOpponent={scoreOpponent} />
    </Flex>
  );
};

const GameType = ({ type, ...rest }) => {
  const padding = useMemo(() => {
    switch (type) {
      case 'Poule':
      case '1/32ème':
      case '1/16ème':
      case '1/8ème':
      case 'Quarts':
      case 'Finale':
        return { base: 1, md: 2 };
      case 'Demi':
        return { base: 0, md: 1 };
      case 'SH':
      case 'SD':
      case 'DH':
      case 'DD':
      case 'MX':
      default:
        return 2;
    }
  }, [type]);
  const fontSize = useMemo(() => {
    switch (type) {
      case 'Poule':
      case '1/32ème':
      case '1/16ème':
      case '1/8ème':
      case 'Quarts':
      case 'Demi':
      case 'Finale':
        return { base: 'md', md: 'xl' };
      case 'SH':
      case 'SD':
      case 'DH':
      case 'DD':
      case 'MX':
      default:
        return { base: 'lg', md: 'xl' };
    }
  }, [type]);
  return (
    <Center
      height={{ base: 12, md: 16 }}
      width={{ base: 12, md: 16 }}
      padding={padding}
      bg="white"
      borderRadius={8}
      boxShadow="lg"
      {...rest}
    >
      <Heading
        overflowWrap="anywhere"
        textAlign="center"
        textTransform="uppercase"
        fontSize={fontSize}
      >
        {type === '1/8ème' ? '1/8 ème' : type}
      </Heading>
    </Center>
  );
};

const GameScoreboard = ({ match }) => {
  const { teamA = [], teamB = [], score = [] } = match;
  const normalisedScore = useMemo(
    () => [
      [score.set[0]?.scoreA, score.set[1]?.scoreA, score.set[2]?.scoreA],
      [score.set[0]?.scoreB, score.set[1]?.scoreB, score.set[2]?.scoreB],
    ],
    [score]
  );

  const winningTeam = useMemo(() => {
    if (teamA.some((p) => p.status === WO_STATUS || p.status === AB_STATUS)) {
      return 1;
    }
    if (teamB.some((p) => p.status === WO_STATUS || p.status === AB_STATUS)) {
      return 0;
    }

    const { winningSetsA, winningSetsB } = score.set.reduce(
      (agg, s) => {
        if (s.scoreA > s.scoreB) {
          return { ...agg, winningSetsA: agg.winningSetsA + 1 };
        } else if (s.scoreB > s.scoreA) {
          return { ...agg, winningSetsB: agg.winningSetsB + 1 };
        }
        return agg;
      },
      { winningSetsA: 0, winningSetsB: 0 }
    );

    return winningSetsA === winningSetsB
      ? -1
      : winningSetsA > winningSetsB
      ? 0
      : 1;
  }, [normalisedScore]);
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      padding={4}
      paddingStart={match.type ? { base: 6, md: 12 } : { base: 4, md: 4 }}
      paddingEnd={{ base: 4, md: 4 }}
      backgroundColor="white"
      alignItems="initial"
      borderRadius={8}
      position="relative"
      boxShadow="md"
    >
      <TeamLine
        team={teamA}
        score={normalisedScore[0]}
        scoreOpponent={normalisedScore[1]}
        isWinning={winningTeam === 0}
        hideClub={match.hideClub}
      />
      <Divider
        display={{ base: 'block', md: 'none' }}
        my={teamA.length === 2 || teamB.length === 2 ? 3 : 2}
        width="80%"
        mx="auto"
      />
      <TeamLine
        ml={{ base: 0, md: 2 }}
        team={teamB}
        score={normalisedScore[1]}
        scoreOpponent={normalisedScore[0]}
        isRight={true}
        isWinning={winningTeam === 1}
        hideClub={match.hideClub}
      />
      {match.type && (
        <GameType
          type={match.type}
          position="absolute"
          left={{ base: -6, md: -10 }}
          top="50%"
          transform="translateY(-50%)"
          marginTop={'0 !important'}
        />
      )}
    </Flex>
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
    <VStack
      alignItems="initial"
      spacing={{ base: 2, md: 4 }}
      paddingLeft={{ base: 2, md: 0 }}
    >
      {matches.map((match, index) => (
        <GameScoreboard
          key={`match-${index}`}
          match={match}
          isLast={index >= matches.length - 1}
          hideRanking={hideRanking}
          hidePoints={hidePoints}
        />
      ))}
    </VStack>
  );
};

export default Scoreboard;
