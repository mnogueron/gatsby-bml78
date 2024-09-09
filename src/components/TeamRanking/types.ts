export type TeamRankDetails = {
  team: {
    longName: string;
    shortName: string;
    teamNumber: number;
    department: string;
    icBadTeamId: string;
  };
  playedDays: number;
  win: number;
  equal: number;
  loss: number;
  retire: number;
  penalties: number;
  points: number;
};
