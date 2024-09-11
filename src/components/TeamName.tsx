import React from 'react';
import {BoxProps, Link, Text} from '@chakra-ui/react';
import {Link as GatsbyLink} from 'gatsby-link';
import {TeamDetails} from './TeamCalendar/types';

type TeamNameProps = {
  team: TeamDetails;
  textProps?: BoxProps;
};

const TeamName = ({team, textProps}: TeamNameProps) => {
  const content = (
    <>
      <Text display={{base: 'block', lg: 'none'}} {...textProps}>
        {team.shortName || team.longName}
      </Text>
      <Text display={{base: 'none', lg: 'block'}} {...textProps}>
        {team.longName || team.shortName}
      </Text>
    </>
  );

  return team.icBadTeamId ? (
    <Link
      as={GatsbyLink}
      href={`https://icbad.ffbad.org/equipe/${team.icBadTeamId}`}
      target="_blank"
      rel="noopener noreferrer"
      textDecoration="none"
      _hover={{
        textDecoration: 'underline',
      }}
    >
      {content}
    </Link>
  ) : (
    content
  );
};

export default TeamName;
