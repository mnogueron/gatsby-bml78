export enum Rank {
  NC = 'NC',
  P12 = 'P12',
  P11 = 'P11',
  P10 = 'P10',
  D9 = 'D9',
  D8 = 'D8',
  D7 = 'D7',
  R6 = 'R6',
  R5 = 'R5',
  R4 = 'R4',
  N3 = 'N3',
  N2 = 'N2',
  N1 = 'N1',
}

export enum TournamentStep {
  POOL = 'Poule',
  TH_1_32 = '1/32ème',
  TH_1_16 = '1/16ème',
  TH_1_8 = '1/8ème',
  QUARTER = 'Quarts',
  SEMI_FINAL = 'Demi',
  FINAL = 'Finale',
}

export enum MatchType {
  SH = 'SH',
  SD = 'SD',
  DH = 'DH',
  DD = 'DD',
  MX = 'MX',
}

export type GameType = MatchType | TournamentStep | string;

/*export type GameType */

export enum SpecialGameStatus {
  AB = 'AB.',
  WO = 'WO',
}

export type SetScore = number | undefined;

export type TeamScores = [SetScore, SetScore, SetScore];

export type PlayerInfo = {
  firstname: string;
  lastname: string;
  ranking?: Rank;
  club?: string;
  status?: SpecialGameStatus;
  points?: number;
};

export type Match = {
  teamA: PlayerInfo[];
  teamB: PlayerInfo[];
  score: {
    set: {
      scoreA: SetScore;
      scoreB: SetScore;
    }[];
  };
  type?: GameType;
  hideClub?: boolean;
  youtubeLink?: string;
};
