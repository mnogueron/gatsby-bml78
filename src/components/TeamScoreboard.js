import React from 'react';
import {
  Center,
  Heading,
  Stack,
  VStack,
  Text,
  useBreakpointValue,
  Divider,
  Box,
} from '@chakra-ui/react';

const TeamScore = ({score, opponentScore}) => {
  const isWinning = score > opponentScore;

  return (
    <Center
      borderRadius={4}
      bg="blackAlpha.100"
      width={{base: '26px', lg: '32px'}}
      height={{base: '32px', lg: '38px'}}
    >
      <Text
        fontSize={{base: 'md', lg: 'lg'}}
        textColor={
          score === opponentScore
            ? 'gray.500'
            : isWinning
              ? 'green.500'
              : 'red.500'
        }
        fontWeight={isWinning ? 'bold' : 'normal'}
      >
        {typeof score === 'undefined' ? '-' : score}
      </Text>
    </Center>
  );
};

const TeamResult = ({team, isRight, opponentScore}) => {
  const isMobile = useBreakpointValue({base: true, md: false});
  const isWinning = team.result > opponentScore;
  return (
    <Stack
      direction={{base: 'row', md: isRight ? 'row-reverse' : 'row'}}
      flex={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        flex={1}
        borderRadius={8}
        pe={2}
        ps={{base: 0, md: isRight ? 2 : 0}}
        py={2}
        bg={
          isWinning
            ? `linear-gradient(${
                !isMobile && isRight ? 'to left' : 'to right'
              }, #FFFFFF, var(--chakra-colors-green-100))`
            : undefined
        }
      >
        <Heading
          as="h3"
          fontSize={{base: 'md', sm: 'lg', md: 'xl'}}
          textAlign={{base: 'left', md: isRight ? 'right' : 'left'}}
        >
          {isMobile
            ? team.shortName || team.longName
            : team.longName || team.shortName}
        </Heading>
      </Box>
      <TeamScore score={team.result} opponentScore={opponentScore} />
    </Stack>
  );
};

const TeamScoreboard = ({teamScore}) => {
  const {teamA, teamB} = teamScore || {};

  if (!teamA || !teamB) {
    return null;
  }

  return (
    <Box paddingLeft={{base: 2, md: 0}} mb={{base: 4, md: 6}}>
      <VStack
        padding={4}
        paddingStart={{base: 4, md: 12}}
        backgroundColor="white"
        borderRadius={8}
        boxShadow="md"
        alignItems="initial"
        spacing={{base: 2, md: 4}}
      >
        <Heading
          as="h2"
          fontSize={{base: 'md', md: 'lg'}}
          textAlign="center"
          mt={{base: 0, md: 1}}
        >
          {"Résultat d'équipe"}
        </Heading>
        <Divider />
        <Stack direction={{base: 'column', md: 'row'}}>
          <TeamResult team={teamA} opponentScore={teamB.result} />
          <TeamResult
            team={teamB}
            opponentScore={teamA.result}
            isRight={true}
          />
        </Stack>
      </VStack>
    </Box>
  );
};

export default TeamScoreboard;
