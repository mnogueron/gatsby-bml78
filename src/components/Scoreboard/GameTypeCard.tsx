import React, {useMemo} from 'react';
import {BoxProps, Center, Heading, Icon, Link, VStack} from '@chakra-ui/react';
import {FaYoutube} from 'react-icons/fa';
import {GameType, MatchType, TournamentStep} from './types';

type GameTypeCardProps = {
  type?: GameType;
  youtubeLink?: string;
} & BoxProps;

const GameTypeCard = ({type, youtubeLink, ...rest}: GameTypeCardProps) => {
  const padding = useMemo(() => {
    switch (type) {
      case TournamentStep.POOL:
      case TournamentStep.TH_1_32:
      case TournamentStep.TH_1_16:
      case TournamentStep.TH_1_8:
      case TournamentStep.QUARTER:
      case TournamentStep.FINAL:
        return {base: 1, md: 2};
      case TournamentStep.SEMI_FINAL:
        return {base: 0, md: 1};
      case MatchType.SH:
      case MatchType.SD:
      case MatchType.DH:
      case MatchType.DD:
      case MatchType.MX:
      default:
        return 2;
    }
  }, [type]);
  const fontSize = useMemo(() => {
    switch (type) {
      case TournamentStep.POOL:
      case TournamentStep.TH_1_32:
      case TournamentStep.TH_1_16:
      case TournamentStep.TH_1_8:
      case TournamentStep.QUARTER:
      case TournamentStep.SEMI_FINAL:
      case TournamentStep.FINAL:
        return {base: 'md', md: 'xl'};
      case MatchType.SH:
      case MatchType.SD:
      case MatchType.DH:
      case MatchType.DD:
      case MatchType.MX:
      default:
        return {base: 'md', md: 'xl'};
    }
  }, [type]);

  if (!type && !youtubeLink) {
    return null;
  }

  if (youtubeLink) {
    return (
      <Link
        href={`https://www.youtube.com${youtubeLink}`}
        isExternal={true}
        role="group"
        textDecoration="none"
        _hover={{
          color: 'red.600',
          textDecoration: 'none',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        <Center
          height={{base: 12, md: 16}}
          width={{base: 12, md: 16}}
          padding={padding}
          bg="white"
          borderRadius={8}
          boxShadow="lg"
          {...rest}
        >
          <VStack spacing={0}>
            {type && (
              <Heading
                overflowWrap="anywhere"
                textAlign="center"
                textTransform="uppercase"
                fontSize={fontSize}
              >
                {type === '1/8ème' ? '1/8 ème' : type}
              </Heading>
            )}
            <Icon
              as={FaYoutube}
              height={6}
              width={8}
              color="red.600"
              _groupHover={{color: 'red.500'}}
            />
          </VStack>
        </Center>
      </Link>
    );
  }

  return (
    <Center
      height={{base: 12, md: 16}}
      width={{base: 12, md: 16}}
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

export default GameTypeCard;
