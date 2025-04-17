import {Rank} from '../../Scoreboard/types';

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}

export type Seuils = [Rank, number, number][];

export type RankingSeuils = {
  single: Seuils;
  double: Seuils;
  mixed: Seuils;
};
