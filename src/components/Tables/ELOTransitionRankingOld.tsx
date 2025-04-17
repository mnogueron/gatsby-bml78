import React from 'react';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  MyFFBadSeuils2,
  OLD_SEUILS,
} from '../Calculator/ELOCoteConverter/constants';
import * as dateFns from 'date-fns';

const ELOTransitionRankingOld = () => {
  return (
    <>
      <Text fontWeight="semibold" pb={4}>
        {`Mis à jour le ${dateFns.format(
          dateFns.parseISO(MyFFBadSeuils2.GeneratedDate),
          'dd/MM/yyyy'
        )}`}
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead borderBottomWidth="4px">
            <Tr>
              <Th />
              <Th>Max</Th>
              {OLD_SEUILS.male.single.map(s => (
                <Th key={s[0]}>{s[0]}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Simple Dame</Td>
              <Td>{OLD_SEUILS.female.single[0][2]}</Td>
              {OLD_SEUILS.female.single.map(s => (
                <Td key={s[0]}>{s[1]}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Simple Homme</Td>
              <Td>{OLD_SEUILS.male.single[0][2]}</Td>
              {OLD_SEUILS.male.single.map(s => (
                <Td key={s[0]}>{s[1]}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Double Dame</Td>
              <Td>{OLD_SEUILS.female.double[0][2]}</Td>
              {OLD_SEUILS.female.double.map(s => (
                <Td key={s[0]}>{s[1]}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Double Homme</Td>
              <Td>{OLD_SEUILS.male.double[0][2]}</Td>
              {OLD_SEUILS.male.double.map(s => (
                <Td key={s[0]}>{s[1]}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Mixte Dame</Td>
              <Td>{OLD_SEUILS.female.mixed[0][2]}</Td>
              {OLD_SEUILS.female.mixed.map(s => (
                <Td key={s[0]}>{s[1]}</Td>
              ))}
            </Tr>
            <Tr>
              <Td>Mixte Homme</Td>
              <Td>{OLD_SEUILS.male.mixed[0][2]}</Td>
              {OLD_SEUILS.male.mixed.map(s => (
                <Td key={s[0]}>{s[1]}</Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ELOTransitionRankingOld;
