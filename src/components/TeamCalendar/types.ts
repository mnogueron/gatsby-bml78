export type TeamDetails = {
  shortName?: string;
  longName: string;
  icBadTeamId?: string;
};

// TODO extract team info in its own type
export type TeamMeetingDetails = TeamDetails & {
  score?: number;
  isHost?: boolean;
};

export type ParsedMeeting = {
  date: Date;
  teamA: TeamMeetingDetails;
  teamB: TeamMeetingDetails;
};

export type Meeting = {
  date: string;
  teamA: TeamMeetingDetails;
  teamB: TeamMeetingDetails;
};
