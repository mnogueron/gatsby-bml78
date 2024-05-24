import React from 'react';
import {Stack, Tag, Text} from '@chakra-ui/react';
import PlayerClubExtra from './PlayerClubExtra';
import RankBadge from './RankBadge';
import {PlayerInfo, SpecialGameStatus} from './types';

type PlayerDetailsProps = {
  player: PlayerInfo;
  isRightAligned?: boolean;
  hideClub?: boolean;
};

const PlayerDetails = ({
  player,
  isRightAligned,
  hideClub,
}: PlayerDetailsProps) => {
  const {firstname, lastname, ranking, club, status} = player;
  const name =
    firstname || lastname
      ? `${lastname.toUpperCase()} ${firstname}`
      : undefined;
  return (
    <Stack
      gap={1}
      direction={{
        base: 'row',
        md: isRightAligned ? 'row-reverse' : 'row',
      }}
      alignItems="center"
    >
      {ranking && <RankBadge rank={ranking} />}
      <Stack
        spacing={1}
        fontSize={{base: 'sm', md: 'md'}}
        direction={{
          base: 'row',
          md: isRightAligned ? 'row-reverse' : 'row',
        }}
        alignItems="center"
        textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
      >
        <Text as="span">{name}</Text>
        {(status === SpecialGameStatus.AB ||
          status === SpecialGameStatus.WO) && (
          <Tag fontSize={{base: 'xs', sm: 'sm'}} size={{base: 'sm', md: 'md'}}>
            {status}
          </Tag>
        )}
        {!hideClub && club && <PlayerClubExtra club={club} />}
      </Stack>
    </Stack>
  );
};

export default PlayerDetails;
