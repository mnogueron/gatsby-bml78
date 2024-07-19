export type Meeting = {
  date: Date;
  teamA: {
    shortName?: string;
    longName: string;
    score?: number;
    isBML?: boolean;
    isHost?: boolean;
  };
  teamB: {
    shortName?: string;
    longName: string;
    score?: number;
    isBML?: boolean;
    isHost?: boolean;
  };
  isBMLHosting: boolean;
};
