export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}

export type Seuils = [string, number, number][];

export type RankingSeuils = {
  single: Seuils;
  double: Seuils;
  mixed: Seuils;
};
