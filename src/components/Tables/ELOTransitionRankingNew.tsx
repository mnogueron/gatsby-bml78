import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {NEW_SEUILS} from '../Calculator/ELOCoteConverter/constants';

const ELOTransitionRankingNew = () => {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead borderBottomWidth="4px">
          <Tr>
            <Th />
            <Th>Max</Th>
            {NEW_SEUILS.male.single.map(s => (
              <Th key={s[0]}>{s[0]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Simple Dame</Td>
            <Td>{NEW_SEUILS.female.single[0][2]}</Td>
            {NEW_SEUILS.female.single.map(s => (
              <Td key={s[0]}>{s[1]}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Simple Homme</Td>
            <Td>{NEW_SEUILS.male.single[0][2]}</Td>
            {NEW_SEUILS.male.single.map(s => (
              <Td key={s[0]}>{s[1]}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Double Dame</Td>
            <Td>{NEW_SEUILS.female.double[0][2]}</Td>
            {NEW_SEUILS.female.double.map(s => (
              <Td key={s[0]}>{s[1]}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Double Homme</Td>
            <Td>{NEW_SEUILS.male.double[0][2]}</Td>
            {NEW_SEUILS.male.double.map(s => (
              <Td key={s[0]}>{s[1]}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Mixte Dame</Td>
            <Td>{NEW_SEUILS.female.mixed[0][2]}</Td>
            {NEW_SEUILS.female.mixed.map(s => (
              <Td key={s[0]}>{s[1]}</Td>
            ))}
          </Tr>
          <Tr>
            <Td>Mixte Homme</Td>
            <Td>{NEW_SEUILS.male.mixed[0][2]}</Td>
            {NEW_SEUILS.male.mixed.map(s => (
              <Td key={s[0]}>{s[1]}</Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ELOTransitionRankingNew;
