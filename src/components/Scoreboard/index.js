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

const Scoreboard = ({ teamA, teamB, score, hideHeader }) => {
  return (
    <TableContainer maxW={'5xl'} margin="auto">
      <Table size="sm">
        {!hideHeader && (
          <Thead>
            <Tr>
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
          <Tr>
            <Td width={'100px'}>
              <VStack alignItems={'flex-start'}>
                <div>{teamA[0].club}</div>
                <div>{teamA[1].club}</div>
              </VStack>
            </Td>
            <Td width={'150px'}>
              <VStack>
                <RankingBadge ranking={teamA[0].classement} />
                <RankingBadge ranking={teamA[1].classement} />
              </VStack>
            </Td>
            <Td>
              <VStack alignItems={'flex-start'}>
                <div>{teamA[0].name}</div>
                <div>{teamA[1].name}</div>
              </VStack>
            </Td>
            <Td>
              <Table size="sm">
                <Tr>
                  <ScoreCell>{score[0][0]}</ScoreCell>
                  <Center height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <ScoreCell>{score[1][0]}</ScoreCell>
                  <Center height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <ScoreCell>{score[2][0]}</ScoreCell>
                </Tr>
              </Table>
            </Td>
          </Tr>
          <Tr>
            <Td width={'100px'}>
              <VStack alignItems={'flex-start'}>
                <div>{teamB[0].club}</div>
                <div>{teamB[1].club}</div>
              </VStack>
            </Td>
            <Td width={'150px'}>
              <VStack>
                <RankingBadge ranking={teamB[0].classement} />
                <RankingBadge ranking={teamB[1].classement} />
              </VStack>
            </Td>
            <Td>
              <VStack alignItems={'flex-start'}>
                <div>{teamB[0].name}</div>
                <div>{teamB[1].name}</div>
              </VStack>
            </Td>
            <Td>
              <Table size="sm">
                <Tr>
                  <ScoreCell>{score[0][1]}</ScoreCell>
                  <Center height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <ScoreCell>{score[1][1]}</ScoreCell>
                  <Center height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <ScoreCell>{score[2][1]}</ScoreCell>
                </Tr>
              </Table>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Scoreboard;
