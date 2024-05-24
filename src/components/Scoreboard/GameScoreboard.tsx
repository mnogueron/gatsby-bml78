import React, {useMemo} from 'react';
import {Divider, Flex} from '@chakra-ui/react';
import TeamRow from './TeamRow';
import GameTypeCard from './GameTypeCard';
import {Match, SpecialGameStatus, TeamScores} from './types';

type GameScoreboardProps = {
  match: Match;
};

const GameScoreboard = ({match}: GameScoreboardProps) => {
  const {teamA = [], teamB = [], score} = match;
  const [teamScoreA, teamScoreB]: [TeamScores, TeamScores] = useMemo(
    () => [
      [score.set[0]?.scoreA, score.set[1]?.scoreA, score.set[2]?.scoreA],
      [score.set[0]?.scoreB, score.set[1]?.scoreB, score.set[2]?.scoreB],
    ],
    [score]
  );

  const winningTeam = useMemo(() => {
    if (
      teamA.some(
        p =>
          p.status === SpecialGameStatus.WO || p.status === SpecialGameStatus.AB
      )
    ) {
      return 1;
    }
    if (
      teamB.some(
        p =>
          p.status === SpecialGameStatus.WO || p.status === SpecialGameStatus.AB
      )
    ) {
      return 0;
    }

    const {winningSetsA, winningSetsB} = score.set.reduce(
      (agg, s) => {
        if ((s.scoreA || -1) > (s.scoreB || -1)) {
          return {...agg, winningSetsA: agg.winningSetsA + 1};
        } else if ((s.scoreB || -1) > (s.scoreA || -1)) {
          return {...agg, winningSetsB: agg.winningSetsB + 1};
        }
        return agg;
      },
      {winningSetsA: 0, winningSetsB: 0}
    );

    return winningSetsA === winningSetsB
      ? -1
      : winningSetsA > winningSetsB
        ? 0
        : 1;
  }, [score.set, teamA, teamB]);

  return (
    <Flex
      flexDirection={{base: 'column', md: 'row'}}
      padding={4}
      paddingStart={match.type ? {base: 6, md: 12} : {base: 4, md: 4}}
      paddingEnd={{base: 4, md: 4}}
      backgroundColor="white"
      alignItems="initial"
      borderRadius={8}
      position="relative"
      boxShadow="md"
    >
      <TeamRow
        team={teamA}
        score={teamScoreA}
        scoreOpponent={teamScoreB}
        isWinning={winningTeam === 0}
        hideClub={match.hideClub}
      />
      <Divider
        display={{base: 'block', md: 'none'}}
        my={teamA.length === 2 || teamB.length === 2 ? 3 : 2}
        width="80%"
        mx="auto"
      />
      <TeamRow
        ml={{base: 0, md: 2}}
        team={teamB}
        score={teamScoreB}
        scoreOpponent={teamScoreA}
        isRightAligned={true}
        isWinning={winningTeam === 1}
        hideClub={match.hideClub}
      />
      {(match.type || match.youtubeLink) && (
        <GameTypeCard
          type={match.type}
          youtubeLink={match.youtubeLink}
          position="absolute"
          left={{base: -6, md: -10}}
          top="50%"
          transform="translateY(-50%)"
          marginTop={'0 !important'}
        />
      )}
    </Flex>
  );
};

export default GameScoreboard;
