import React, {useCallback, useMemo, useState} from 'react';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Gender} from './types';
import {convertCotesToELO} from './ELOConverterUtils';

const ELOCoteConverter = () => {
  const [gender, setGender] = useState<Gender | undefined>(undefined);
  const [coteSimple, setCoteSimple] = useState('0');
  const [coteDouble, setCoteDouble] = useState('0');
  const [coteMixte, setCoteMixte] = useState('0');

  const onGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setGender(e.target.value as Gender);
    },
    []
  );

  const newCotes = useMemo(() => {
    if (gender) {
      return convertCotesToELO(gender, [
        parseFloat(coteSimple),
        parseFloat(coteDouble),
        parseFloat(coteMixte),
      ]);
    }
    return undefined;
  }, [coteDouble, coteMixte, coteSimple, gender]);

  return (
    <VStack p={4} spacing={4} alignItems="initial">
      <FormControl>
        <FormLabel>Sexe</FormLabel>
        <Select
          placeholder="Selectionnez votre genre"
          value={gender}
          onChange={onGenderChange}
        >
          <option value={Gender.FEMALE}>Femme</option>
          <option value={Gender.MALE}>Homme</option>
        </Select>
      </FormControl>

      <Stack direction={{base: 'column', md: 'row'}}>
        <FormControl>
          <FormLabel>Cote en simple</FormLabel>
          <NumberInput
            value={coteSimple}
            onChange={setCoteSimple}
            precision={2}
            step={0.1}
            min={0}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Cote en double</FormLabel>
          <NumberInput
            value={coteDouble}
            onChange={setCoteDouble}
            precision={2}
            step={0.1}
            min={0}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Cote en mixte</FormLabel>
          <NumberInput
            value={coteMixte}
            onChange={setCoteMixte}
            precision={2}
            step={0.1}
            min={0}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
      </Stack>

      {newCotes && (
        <>
          <Text>Vos cotes dans le système post-transition :</Text>
          <Text>Classement simple : {newCotes.new.ranks[0]}</Text>
          <Text>Classement double : {newCotes.new.ranks[1]}</Text>
          <Text>Classement mixte : {newCotes.new.ranks[2]}</Text>

          <Stack direction={{base: 'column', md: 'row'}}>
            <FormControl>
              <FormLabel>Cote en simple</FormLabel>
              <NumberInput
                value={newCotes.new.cotes[0]}
                precision={2}
                isDisabled={true}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Cote en double</FormLabel>
              <NumberInput
                value={newCotes.new.cotes[1]}
                precision={2}
                isDisabled={true}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Cote en mixte</FormLabel>
              <NumberInput
                value={newCotes.new.cotes[2]}
                precision={2}
                isDisabled={true}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </Stack>
        </>
      )}
    </VStack>
  );
};

export default ELOCoteConverter;
