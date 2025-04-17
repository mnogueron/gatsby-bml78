import {Gender, Seuils} from './types';
import {NEW_SEUILS, OLD_SEUILS} from './constants';

const getInterval = (
  cote: number,
  seuils: Seuils
): {interval: [number, number]; rank: string} => {
  const seuil = seuils.find(s => cote >= s[1] && cote < s[2]) || seuils[0];
  const rank = seuil[0];
  return {
    interval: [seuil[1], seuil[2]],
    rank,
  };
};

const getIntervalFromRank = (
  rank: string,
  seuils: Seuils
): {interval: [number, number]; rank: string} => {
  const seuil = seuils.find(s => s[0] === rank) || seuils[seuils.length - 1];
  return {
    interval: [seuil[1], seuil[2]],
    rank,
  };
};

const convertToELO = (
  cote: number,
  oldSeuils: Seuils,
  newSeuils: Seuils
): {old: {cote: number; rank: string}; new: {cote: number; rank: string}} => {
  const {
    interval: [oldSeuilMin, oldSeuilMax],
    rank: oldRank,
  } = getInterval(cote, oldSeuils);

  const {
    interval: [newSeuilMin, newSeuilMax],
  } = getIntervalFromRank(oldRank, newSeuils);

  console.log(
    cote,
    oldSeuils,
    newSeuils,
    oldRank,
    [oldSeuilMin, oldSeuilMax],
    [newSeuilMin, newSeuilMax]
  );

  const newCote = Math.round(
    (newSeuilMax - newSeuilMin) *
      Math.log2(1 + (cote - oldSeuilMin) / (oldSeuilMax - oldSeuilMin)) +
      newSeuilMin
  );
  const {rank: newRank} = getInterval(newCote, newSeuils);
  return {
    old: {cote, rank: oldRank},
    new: {cote: newCote, rank: newRank},
  };
};

export const convertCotesToELO = (
  gender: Gender,
  cote: [number, number, number]
): {
  old: {cotes: [number, number, number]; ranks: [string, string, string]};
  new: {cotes: [number, number, number]; ranks: [string, string, string]};
} => {
  const [single, double, mixed] = cote;
  const genderOldSeuils = OLD_SEUILS[gender];
  const genderNewSeuils = NEW_SEUILS[gender];

  const {
    old: {cote: oldSingleCote, rank: oldSingleRank},
    new: {cote: newSingleCote, rank: newSingleRank},
  } = convertToELO(single, genderOldSeuils.single, genderNewSeuils.single);
  const {
    old: {cote: oldDoubleCote, rank: oldDoubleRank},
    new: {cote: newDoubleCote, rank: newDoubleRank},
  } = convertToELO(double, genderOldSeuils.double, genderNewSeuils.double);
  const {
    old: {cote: oldMixedCote, rank: oldMixedRank},
    new: {cote: newMixedCote, rank: newMixedRank},
  } = convertToELO(mixed, genderOldSeuils.mixed, genderNewSeuils.mixed);

  return {
    old: {
      cotes: [oldSingleCote, oldDoubleCote, oldMixedCote],
      ranks: [oldSingleRank, oldDoubleRank, oldMixedRank],
    },
    new: {
      cotes: [newSingleCote, newDoubleCote, newMixedCote],
      ranks: [newSingleRank, newDoubleRank, newMixedRank],
    },
  };
};
