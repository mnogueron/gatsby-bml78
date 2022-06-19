import React, { useMemo } from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
} from '@chakra-ui/react';

const RankingBadge = ({ ranking }) => {
  const textColor = useMemo(() => {
    switch (ranking) {
      case 'NC':
        return 'white';
      case 'P12':
      case 'P11':
      case 'P10':
        return 'black';
      case 'D9':
      case 'D8':
      case 'D7':
        return 'black';
      case 'R6':
      case 'R5':
      case 'R4':
        return 'white';
      case 'N3':
      case 'N2':
      case 'N1':
        return 'white';
    }
    return 'black';
  }, [ranking]);

  const bgColor = useMemo(() => {
    switch (ranking) {
      case 'NC':
        return 'gray.400';
      case 'P12':
      case 'P11':
      case 'P10':
        return '#f8e71c';
      case 'D9':
      case 'D8':
      case 'D7':
        return '#7ed321';
      case 'R6':
      case 'R5':
      case 'R4':
        return '#4a90e2';
      case 'N3':
      case 'N2':
      case 'N1':
        return '#f80220';
    }
    return 'gray';
  }, [ranking]);

  return (
    <Flex
      width={8}
      height={8}
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
    >
      <Text color={textColor} fontWeight="bold" letterSpacing="tight">
        {ranking}
      </Text>
    </Flex>
  );
};

const ScoreCell = ({ children }) => {
  return (
    <Td borderBottom="none" textAlign="center">
      {children}
    </Td>
  );
};

const Scoreboard = ({ matches, hideHeader }) => {
  return (
    <TableContainer maxW={'5xl'} margin="auto">
      <Table size="sm">
        {!hideHeader && (
          <Thead>
            <Tr borderBottomWidth={3}>
              <Th width={'100px'}>Club</Th>
              <Th width={'150px'} textAlign="center">
                Classement
              </Th>
              <Th>Name</Th>
              <Th textAlign="center">Score</Th>
            </Tr>
          </Thead>
        )}
        <Tbody>
          {matches.map((match, index) => {
            const {teamA, teamB, score} = match;
            return (
              <React.Fragment key={`match-${index}`}>
                <Tr>
                  <Td width={'100px'}>
                    <VStack alignItems={'flex-start'}>
                      {teamA.players.map(p => (
                        <div key={`${p.name}-${p.club}`}>{p.club}</div>
                      ))}
                    </VStack>
                  </Td>
                  <Td width={'150px'}>
                    <VStack>
                      {teamA.players.map(p => (
                        <RankingBadge key={`${p.name}-${p.ranking}`} ranking={p.ranking}/>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems={'flex-start'}>
                      {teamA.players.map(p => (
                        <div key={`${p.name}`}>{p.name}</div>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <Table size="sm">
                      <Tr>
                        <ScoreCell>{score.set[0].scoreA}</ScoreCell>
                        <Center height="50px">
                          <Divider orientation="vertical" />
                        </Center>
                        <ScoreCell>{score.set[1].scoreA}</ScoreCell>
                        <Center height="50px">
                          <Divider orientation="vertical" />
                        </Center>
                        <ScoreCell>{score.set[2].scoreA}</ScoreCell>
                      </Tr>
                    </Table>
                  </Td>
                </Tr>
                <Tr borderBottomWidth={`${index < matches.length - 1 ? 4 : 1}px !important`}>
                  <Td width={'100px'}>
                    <VStack alignItems={'flex-start'}>
                      {teamB.players.map(p => (
                        <div key={`${p.name}-${p.club}`}>{p.club}</div>
                      ))}
                    </VStack>
                  </Td>
                  <Td width={'150px'}>
                    <VStack>
                      {teamB.players.map(p => (
                        <RankingBadge key={`${p.name}-${p.ranking}`} ranking={p.ranking}/>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <VStack alignItems={'flex-start'}>
                      {teamB.players.map(p => (
                        <div key={`${p.name}`}>{p.name}</div>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <Table size="sm">
                      <Tr>
                        <ScoreCell>{score.set[0].scoreB}</ScoreCell>
                        <Center height="50px">
                          <Divider orientation="vertical" />
                        </Center>
                        <ScoreCell>{score.set[1].scoreB}</ScoreCell>
                        <Center height="50px">
                          <Divider orientation="vertical" />
                        </Center>
                        <ScoreCell>{score.set[2].scoreB}</ScoreCell>
                      </Tr>
                    </Table>
                  </Td>
                </Tr>
              </React.Fragment>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Scoreboard;
