import React, {useCallback, useMemo, useState} from 'react';
import {
  FormControl,
  FormLabel,
  HStack,
  Icon,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Gender} from './types';
import {convertCotesToELO} from './ELOConverterUtils';
import MediumRankBadge from '../../Scoreboard/RankBadge/MediumRankBadge';
import {Rank} from '../../Scoreboard/types';
import {HiArrowNarrowDown, HiArrowNarrowRight} from 'react-icons/hi';
import {OLD_SEUILS} from './constants';

type RankingCardProps = {
  rank: Rank;
  cote: number;
};

const RankingCard = ({rank, cote}: RankingCardProps) => {
  return (
    <VStack
      width={24}
      padding={4}
      bg="white"
      borderRadius={8}
      boxShadow="lg"
      spacing={2}
    >
      <MediumRankBadge rank={rank} />
      <Text fontWeight="semibold">{cote}</Text>
    </VStack>
  );
};

const ELOCoteConverter = () => {
  const [gender, setGender] = useState<Gender | undefined>(undefined);
  const [coteSimple, setCoteSimple] = useState('0');
  const [coteDouble, setCoteDouble] = useState('0');
  const [coteMixte, setCoteMixte] = useState('0');

  const maxSingle = gender ? OLD_SEUILS[gender].single[0][2] : Infinity;
  const maxDouble = gender ? OLD_SEUILS[gender].double[0][2] : Infinity;
  const maxMixed = gender ? OLD_SEUILS[gender].mixed[0][2] : Infinity;

  const onGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newGender = e.target.value as Gender;
      const maxSingle = newGender
        ? OLD_SEUILS[newGender].single[0][2]
        : Infinity;
      const maxDouble = newGender
        ? OLD_SEUILS[newGender].double[0][2]
        : Infinity;
      const maxMixed = newGender ? OLD_SEUILS[newGender].mixed[0][2] : Infinity;

      setCoteSimple(prev => Math.min(parseFloat(prev), maxSingle) + '');
      setCoteDouble(prev => Math.min(parseFloat(prev), maxDouble) + '');
      setCoteMixte(prev => Math.min(parseFloat(prev), maxMixed) + '');
      setGender(newGender);
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
            max={maxSingle}
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
            max={maxDouble}
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
            max={maxMixed}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
      </Stack>

      {newCotes && (
        <>
          <Stack
            direction={{base: 'column', md: 'row'}}
            justifyContent="center"
            alignItems="center"
            spacing={{base: 4, md: 2}}
            py={{base: 4, md: 8}}
          >
            <HStack>
              <RankingCard
                rank={newCotes.old.ranks[0]}
                cote={newCotes.old.cotes[0]}
              />

              <RankingCard
                rank={newCotes.old.ranks[1]}
                cote={newCotes.old.cotes[1]}
              />

              <RankingCard
                rank={newCotes.old.ranks[2]}
                cote={newCotes.old.cotes[2]}
              />
            </HStack>

            <Icon
              as={HiArrowNarrowRight}
              width={16}
              height={10}
              display={{base: 'none', md: 'block'}}
            />
            <Icon
              as={HiArrowNarrowDown}
              width={16}
              height={10}
              display={{base: 'block', md: 'none'}}
            />

            <HStack>
              <RankingCard
                rank={newCotes.new.ranks[0]}
                cote={newCotes.new.cotes[0]}
              />

              <RankingCard
                rank={newCotes.new.ranks[1]}
                cote={newCotes.new.cotes[1]}
              />

              <RankingCard
                rank={newCotes.new.ranks[2]}
                cote={newCotes.new.cotes[2]}
              />
            </HStack>
          </Stack>

          {newCotes.old.ranks.some(r => r === Rank.N1) && (
            <Text fontWeight="semibold">{`⚠️ Si vous avez un classement N1 et faites partie du top BWF, votre classement peut être supérieur à la valeur max indiquée et aller jusqu'à 4000 points.`}</Text>
          )}
        </>
      )}
    </VStack>
  );
};

export default ELOCoteConverter;
