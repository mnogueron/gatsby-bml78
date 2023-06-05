import React from 'react';
import {
  Box,
  Divider,
  Heading,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

const ICTeamRanking = () => {
  return (
    <Box paddingLeft={{ base: 2, md: 0 }} mb={{ base: 4, md: 6 }}>
      <VStack
        padding={4}
        paddingStart={{ base: 4, md: 12 }}
        backgroundColor="white"
        borderRadius={8}
        boxShadow="md"
        alignItems="initial"
        spacing={{ base: 2, md: 4 }}
      >
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th px={2}>#</Th>
                <Th px={2} textAlign="center">Èquipes</Th>
                <Th px={2} textAlign="center">Jouées</Th>
                <Th px={2} textAlign="center">Gagnées</Th>
                <Th px={2} textAlign="center">Nulles</Th>
                <Th px={2} textAlign="center">Perdues</Th>
                <Th px={2} textAlign="center">Forfaits</Th>
                <Th px={2} textAlign="center">Bonus</Th>
                <Th px={2} textAlign="center">Pénalités</Th>
                <Th px={2} textAlign="center">Points</Th>
                <Th px={2} textAlign="center">Match +/-</Th>
                <Th px={2} textAlign="center">Sets +/-</Th>
                <Th px={2} textAlign="center">PTS +/-</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={2}>1</Td>
                <Td px={2}> Les Volants d'Elancourt</Td>
                <Td px={2} textAlign="center">12</Td>
                <Td px={2} textAlign="center">10</Td>
                <Td px={2} textAlign="center">2</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">34</Td>
                <Td px={2} textAlign="center">32</Td>
                <Td px={2} textAlign="center">58</Td>
                <Td px={2} textAlign="center">462</Td>
              </Tr>
              <Tr>
                <Td px={2}>2</Td>
                <Td px={2}> Les Volants d'Elancourt</Td>
                <Td px={2} textAlign="center">12</Td>
                <Td px={2} textAlign="center">10</Td>
                <Td px={2} textAlign="center">2</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">34</Td>
                <Td px={2} textAlign="center">32</Td>
                <Td px={2} textAlign="center">58</Td>
                <Td px={2} textAlign="center">462</Td>
              </Tr>
              <Tr>
                <Td px={2}>3</Td>
                <Td px={2}> Les Volants d'Elancourt</Td>
                <Td px={2} textAlign="center">12</Td>
                <Td px={2} textAlign="center">10</Td>
                <Td px={2} textAlign="center">2</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">34</Td>
                <Td px={2} textAlign="center">32</Td>
                <Td px={2} textAlign="center">58</Td>
                <Td px={2} textAlign="center">462</Td>
              </Tr>
              <Tr>
                <Td px={2}>4</Td>
                <Td px={2}> Les Volants d'Elancourt</Td>
                <Td px={2} textAlign="center">12</Td>
                <Td px={2} textAlign="center">10</Td>
                <Td px={2} textAlign="center">2</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">0</Td>
                <Td px={2} textAlign="center">34</Td>
                <Td px={2} textAlign="center">32</Td>
                <Td px={2} textAlign="center">58</Td>
                <Td px={2} textAlign="center">462</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
};

export default ICTeamRanking;
